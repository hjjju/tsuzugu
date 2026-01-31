import type { Invitation } from "@/lib/data/invitations";
import { firebaseDb } from "@/lib/firebase/client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export type CreateInvitationInput = Omit<Invitation, "slug"> & {
  slug?: string;
};

function normalizeSlug(baseSlug: string) {
  return baseSlug.trim() || "invite";
}

async function resolveUniqueSlug(baseSlug: string) {
  const normalized = normalizeSlug(baseSlug);
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
  const snapshot = await getDocs(collection(firebaseDb, "invitations"));
  return snapshot.docs.map((docSnap) => docSnap.data() as Invitation);
}

export async function getInvitationBySlug(
  slug: string
): Promise<Invitation | undefined> {
  const snapshot = await getDoc(doc(firebaseDb, "invitations", slug));
  if (!snapshot.exists()) {
    return undefined;
  }
  return snapshot.data() as Invitation;
}

export async function createInvitation(
  input: CreateInvitationInput
): Promise<Invitation> {
  const slug = await resolveUniqueSlug(input.slug ?? "invite");
  const newInvitation: Invitation = {
    ...input,
    slug,
  };
  await setDoc(doc(firebaseDb, "invitations", slug), newInvitation);
  return newInvitation;
}
