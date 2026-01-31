import { Invitation, invitations } from "@/lib/data/invitations";

export function listInvitations(): Invitation[] {
  return [...invitations];
}

export function getInvitationBySlug(slug: string): Invitation | undefined {
  return invitations.find((invitation) => invitation.slug === slug);
}
