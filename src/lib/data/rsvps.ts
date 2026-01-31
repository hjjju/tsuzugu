export type RSVP = {
  id: string;
  invitationSlug: string;
  lastName: string;
  firstName: string;
  furigana: string;
  email: string;
  phone?: string;
  attendance: "attend" | "decline";
  guestsCount: number;
  allergyText: string;
  messageToCouple: string;
  createdAtISO: string;
  qrToken: string;
};

export type CheckIn = {
  rsvpId: string;
  checkedInAtISO: string;
};

export const rsvps: RSVP[] = [
  {
    id: "rsvp_001",
    invitationSlug: "haru-kai",
    lastName: "田中",
    firstName: "杏奈",
    furigana: "たなか あんな",
    email: "anna.tanaka@example.com",
    phone: "090-1234-5678",
    attendance: "attend",
    guestsCount: 2,
    allergyText: "甲殻類",
    messageToCouple: "ご結婚おめでとうございます！",
    createdAtISO: "2026-01-10T09:12:00+09:00",
    qrToken: "qr_haru_kai_001",
  },
  {
    id: "rsvp_002",
    invitationSlug: "mio-ryo",
    lastName: "佐藤",
    firstName: "健",
    furigana: "さとう けん",
    email: "ken.sato@example.com",
    attendance: "decline",
    guestsCount: 1,
    allergyText: "",
    messageToCouple: "今回は出席できず残念です。お幸せに！",
    createdAtISO: "2026-01-12T14:30:00+09:00",
    qrToken: "qr_mio_ryo_002",
  },
];

export const checkIns: CheckIn[] = [
  {
    rsvpId: "rsvp_001",
    checkedInAtISO: "2026-05-17T10:55:00+09:00",
  },
];
