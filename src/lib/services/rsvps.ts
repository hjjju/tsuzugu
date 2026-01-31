import type { CheckIn, RSVP } from "@/lib/data/rsvps";
import { isFirebaseConfigReady } from "@/lib/firebase/config";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { Timestamp } from "firebase/firestore";

export type CreateRsvpInput = Omit<RSVP, "id" | "createdAtISO" | "qrToken">;

async function generateQrToken(
  invitationSlug: string
): Promise<string> {
  async function randomToken() {
    if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return `qr_${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
    }
    try {
      const nodeCrypto = await import("crypto");
      return `qr_${nodeCrypto.randomBytes(16).toString("hex")}`;
    } catch {
      return `qr_${Math.random().toString(36).slice(2, 12)}`;
    }
  }

  if (!isFirebaseConfigReady) {
    return randomToken();
  }

  let token = await randomToken();
  let attempts = 0;
  while (attempts < 5) {
    const firebaseDb = await getDb();
    const { collection, getDocs, limit, query, where } =
      await getFirestoreModule();
    const tokenQuery = query(
      collection(firebaseDb as any, "rsvps"),
      where("invitationSlug", "==", invitationSlug),
      where("qrToken", "==", token),
      limit(1)
    );
    const snapshot = await getDocs(tokenQuery);
    if (snapshot.empty) {
      return token;
    }
    attempts += 1;
    token = await randomToken();
  }
  return token;
}

async function getFirestoreModule() {
  return import(/* webpackIgnore: true */ "firebase/firestore");
}

async function getDb() {
  return getFirebaseDb();
}

function generateFallbackId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function timestampToIso(value?: Timestamp | null) {
  if (!value) return "";
  return value.toDate().toISOString();
}

function mapRsvpDoc(id: string, data: Record<string, unknown>): RSVP {
  return {
    id,
    invitationSlug: String(data.invitationSlug ?? ""),
    lastName: String(data.lastName ?? ""),
    firstName: String(data.firstName ?? ""),
    furigana: String(data.furigana ?? ""),
    email: String(data.email ?? ""),
    phone: data.phone ? String(data.phone) : undefined,
    attendance: data.attendance === "decline" ? "decline" : "attend",
    guestsCount: Number(data.guestsCount ?? 0),
    allergyText: String(data.allergyText ?? ""),
    messageToCouple: String(data.messageToCouple ?? ""),
    createdAtISO: timestampToIso(data.createdAt as Timestamp),
    qrToken: String(data.qrToken ?? ""),
  };
}

export async function listRSVPs(invitationSlug?: string): Promise<RSVP[]> {
  if (!isFirebaseConfigReady) {
    return [];
  }
  const firebaseDb = await getDb();
  const { collection, getDocs, orderBy, query, where } =
    await getFirestoreModule();
  const baseQuery = invitationSlug
    ? query(
        collection(firebaseDb as any, "rsvps"),
        where("invitationSlug", "==", invitationSlug),
        orderBy("createdAt", "desc")
      )
    : query(
        collection(firebaseDb as any, "rsvps"),
        orderBy("createdAt", "desc")
      );
  const snapshot = await getDocs(baseQuery);
  return snapshot.docs.map((docSnap) => mapRsvpDoc(docSnap.id, docSnap.data()));
}

export async function createRSVP(
  invitationSlugOrInput: string | CreateRsvpInput,
  payload?: CreateRsvpInput
): Promise<RSVP> {
  const input =
    typeof invitationSlugOrInput === "string"
      ? {
          ...(payload ?? ({} as CreateRsvpInput)),
          invitationSlug: invitationSlugOrInput,
        }
      : invitationSlugOrInput;

  if (!input || !input.invitationSlug) {
    throw new Error("invitationSlug is required to create RSVP.");
  }

  if (!isFirebaseConfigReady) {
    const allergyText = input.allergyText ?? "";
    const qrToken = await generateQrToken(input.invitationSlug);
    return {
      id: generateFallbackId("rsvp"),
      invitationSlug: input.invitationSlug,
      lastName: input.lastName,
      firstName: input.firstName,
      furigana: input.furigana,
      email: input.email,
      phone: input.phone,
      attendance: input.attendance,
      guestsCount: input.guestsCount,
      allergyText,
      messageToCouple: input.messageToCouple,
      createdAtISO: new Date().toISOString(),
      qrToken,
    };
  }

  const firebaseDb = await getDb();
  const { addDoc, collection, serverTimestamp } = await getFirestoreModule();
  const qrToken = await generateQrToken(input.invitationSlug);
  const allergyText = input.allergyText ?? "";
  const rsvpDoc = {
    invitationSlug: input.invitationSlug,
    lastName: input.lastName,
    firstName: input.firstName,
    furigana: input.furigana,
    email: input.email,
    phone: input.phone ?? null,
    attendance: input.attendance,
    guestsCount: input.guestsCount,
    allergyText,
    allergyFlag: allergyText.trim().length > 0,
    messageToCouple: input.messageToCouple,
    qrToken,
    createdAt: serverTimestamp(),
    checkedInAt: null,
  };

  const docRef = await addDoc(collection(firebaseDb as any, "rsvps"), rsvpDoc);
  const createdAtISO = new Date().toISOString();

  return {
    id: docRef.id,
    invitationSlug: input.invitationSlug,
    lastName: input.lastName,
    firstName: input.firstName,
    furigana: input.furigana,
    email: input.email,
    phone: input.phone,
    attendance: input.attendance,
    guestsCount: input.guestsCount,
    allergyText,
    messageToCouple: input.messageToCouple,
    createdAtISO,
    qrToken,
  };
}

export async function listCheckIns(
  invitationSlug?: string
): Promise<CheckIn[]> {
  if (!isFirebaseConfigReady) {
    return [];
  }
  const firebaseDb = await getDb();
  const { collection, getDocs, query, where } = await getFirestoreModule();
  const baseQuery = invitationSlug
    ? query(
        collection(firebaseDb as any, "rsvps"),
        where("invitationSlug", "==", invitationSlug)
      )
    : query(collection(firebaseDb as any, "rsvps"));
  const snapshot = await getDocs(baseQuery);
  return snapshot.docs
    .map((docSnap) => {
      const data = docSnap.data();
      const checkedInAt = data.checkedInAt as Timestamp | null;
      if (!checkedInAt) {
        return null;
      }
      return {
        rsvpId: docSnap.id,
        checkedInAtISO: checkedInAt.toDate().toISOString(),
      } as CheckIn;
    })
    .filter(Boolean) as CheckIn[];
}

export async function checkInByQrToken(
  invitationSlugOrQrToken: string,
  qrToken?: string
): Promise<CheckIn | undefined> {
  if (!isFirebaseConfigReady) {
    return undefined;
  }
  const firebaseDb = await getDb();
  const {
    collection,
    getDocs,
    limit,
    query,
    updateDoc,
    where,
    getDoc,
    doc,
    serverTimestamp,
  } = await getFirestoreModule();
  const invitationSlug =
    qrToken !== undefined ? invitationSlugOrQrToken : undefined;
  const token = qrToken ?? invitationSlugOrQrToken;

  const queryParts = [where("qrToken", "==", token)] as ReturnType<
    typeof where
  >[];
  if (invitationSlug) {
    queryParts.unshift(where("invitationSlug", "==", invitationSlug));
  }

  const q = query(
    collection(firebaseDb as any, "rsvps"),
    ...queryParts,
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return undefined;
  }

  const docSnap = snapshot.docs[0];
  await updateDoc(doc(firebaseDb as any, "rsvps", docSnap.id), {
    checkedInAt: serverTimestamp(),
  });
  const refreshed = await getDoc(doc(firebaseDb as any, "rsvps", docSnap.id));
  const data = refreshed.data();
  const checkedInAt = data?.checkedInAt as Timestamp | null;

  return {
    rsvpId: docSnap.id,
    checkedInAtISO: checkedInAt ? checkedInAt.toDate().toISOString() : "",
  };
}
