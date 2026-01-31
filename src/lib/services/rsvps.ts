import { CheckIn, RSVP, checkIns, rsvps } from "@/lib/data/rsvps";

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function generateQrToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `qr_${crypto.randomUUID()}`;
  }
  return generateId("qr");
}

export type CreateRsvpInput = Omit<RSVP, "id" | "createdAtISO" | "qrToken">;

export function listRSVPs(invitationSlug?: string): RSVP[] {
  const items = invitationSlug
    ? rsvps.filter((item) => item.invitationSlug === invitationSlug)
    : rsvps;
  return [...items];
}

export function createRSVP(input: CreateRsvpInput): RSVP {
  const newRsvp: RSVP = {
    ...input,
    id: generateId("rsvp"),
    createdAtISO: new Date().toISOString(),
    qrToken: generateQrToken(),
  };
  rsvps.push(newRsvp);
  return newRsvp;
}

export function checkInByQrToken(qrToken: string): CheckIn | undefined {
  const rsvp = rsvps.find((item) => item.qrToken === qrToken);
  if (!rsvp) {
    return undefined;
  }
  const existing = checkIns.find((checkIn) => checkIn.rsvpId === rsvp.id);
  if (existing) {
    return existing;
  }
  const newCheckIn: CheckIn = {
    rsvpId: rsvp.id,
    checkedInAtISO: new Date().toISOString(),
  };
  checkIns.push(newCheckIn);
  return newCheckIn;
}
