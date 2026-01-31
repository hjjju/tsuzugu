import type { Invitation } from "@/lib/data/invitations";
import { isFirebaseConfigReady } from "@/lib/firebase/config";
import { getFirebaseDb } from "@/lib/firebase/client";
type Firestore = unknown;

export type CreateInvitationInput = Omit<Invitation, "slug"> & {
  slug?: string;
  mainVisualText?: string; 
  mapEmbedUrl?: string;
};

function normalizeSlug(baseSlug: string) {
  return baseSlug.trim() || "invite";
}

function dynamicImport(modulePath: string) {
  const importer = new Function(
    "modulePath",
    "return import(modulePath)"
  ) as (path: string) => Promise<unknown>;
  return importer(modulePath);
}

async function getFirestoreModule() {
  return dynamicImport("firebase/firestore") as Promise<{
    collection: (db: Firestore, path: string) => unknown;
    doc: (db: Firestore, path: string, id?: string) => unknown;
    getDoc: (ref: unknown) => Promise<{ exists: () => boolean; data: () => unknown }>;
    getDocs: (ref: unknown) => Promise<{ docs: { data: () => unknown }[] }>;
    setDoc: (ref: unknown, data: unknown) => Promise<void>;
  }>;
}

async function getDb() {
  return getFirebaseDb();
}

function getDemoInvitation(): Invitation {
  return {
    slug: "demo",
    brideName: "結衣",
    groomName: "大輝",
    mainVisualText: "Our Wedding Day",
    dateTimeISO: "2026-10-18T13:30:00+09:00",
    venueName: "表参道 Maison Garden",
    venueAddress: "東京都渋谷区神宮前 4-2-2",
    heroImageUrl: "/og-default.jpg",
    galleryImageUrls: [
      "/og-default.jpg",
      "/og-default.jpg",
      "/og-default.jpg",
    ],
    messageJP:
      "このたび結婚式を挙げる運びとなりました。ぜひご列席賜りますようお願い申し上げます。",
    scheduleItems: [
      { time: "13:00", label: "受付開始" },
      { time: "13:30", label: "挙式" },
      { time: "14:30", label: "披露宴" },
    ],
    mapEmbedUrl: "",
    paypayReceiveLink: "",
    lineShareText: "結衣と大輝の招待状です。ご確認ください。",
  };
}

async function resolveUniqueSlug(baseSlug: string) {
  const firebaseDb = (await getDb()) as Firestore;
  const normalized = normalizeSlug(baseSlug);
  const { doc, getDoc } = await getFirestoreModule();
  const inviteRef = doc(firebaseDb, "invitations", normalized);
  const snapshot = await getDoc(inviteRef);
  if (!snapshot.exists()) {
    return normalized;
  }
  let counter = 1;
  let candidate = normalized;
  while (candidate) {
    counter += 1;
    candidate = `${normalized}-${counter}`;
    const checkRef = doc(firebaseDb, "invitations", candidate);
    const checkSnapshot = await getDoc(checkRef);
    if (!checkSnapshot.exists()) {
      return candidate;
    }
  }
  return normalized;
}

export async function listInvitations(): Promise<Invitation[]> {
  if (!isFirebaseConfigReady) {
    return [getDemoInvitation()];
  }
  const firebaseDb = (await getDb()) as Firestore;
  const { collection, getDocs } = await getFirestoreModule();
  const snapshot = await getDocs(collection(firebaseDb, "invitations"));
  return snapshot.docs.map((docSnap) => docSnap.data() as Invitation);
}

export async function getInvitationBySlug(
  slug: string
): Promise<Invitation | undefined> {
  if (!isFirebaseConfigReady) {
    return slug === "demo" ? getDemoInvitation() : undefined;
  }
  const firebaseDb = (await getDb()) as Firestore;
  const { doc, getDoc } = await getFirestoreModule();
  const snapshot = await getDoc(doc(firebaseDb, "invitations", slug));
  if (snapshot.exists()) {
    return snapshot.data() as Invitation;
  }
  return slug === "demo" ? getDemoInvitation() : undefined;
}

export async function createInvitation(
  input: CreateInvitationInput
): Promise<Invitation> {
  if (!isFirebaseConfigReady) {
    const slug = normalizeSlug(input.slug ?? "invite");
    return {
      ...getDemoInvitation(), // Return a complete demo invitation
      ...input,
      slug,
    };
  }
  const firebaseDb = (await getDb()) as Firestore;
  const { doc, setDoc } = await getFirestoreModule();
  const slug = await resolveUniqueSlug(input.slug ?? "invite");
  
  const newInvitation: Invitation = {
    ...getDemoInvitation(), // Start with a complete demo invitation
    ...input, // Overwrite with user input
    slug,
  };

  await setDoc(doc(firebaseDb, "invitations", slug), newInvitation);
  return newInvitation;
}
