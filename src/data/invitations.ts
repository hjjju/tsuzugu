export type Invitation = {
  slug: string;
  couple: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  note: string;
  schedule: { time: string; label: string }[];
  rsvp: { attending: number; awaiting: number };
  template: string;
};

export const invitations: Invitation[] = [
  {
    slug: "haru-kai",
    couple: "春香 &  海斗",
    date: "2026年5月17日 (日)",
    time: "11:00 受付 / 12:00 挙式",
    venue: "白金レジデンス Chapel",
    address: "東京都港区白金 1-2-3",
    note: "両家ささやかな披露と感謝の会を予定しております。",
    schedule: [
      { time: "11:00", label: "受付開始" },
      { time: "12:00", label: "挙式" },
      { time: "13:00", label: "披露宴" },
      { time: "15:00", label: "おひらき" },
    ],
    rsvp: { attending: 38, awaiting: 12 },
    template: "Sakura Linen",
  },
  {
    slug: "mio-ryo",
    couple: "美緒 &  涼",
    date: "2026年4月4日 (土)",
    time: "10:30 受付 / 11:30 挙式",
    venue: "鎌倉 Ocean Terrace",
    address: "神奈川県鎌倉市由比ガ浜 4-8",
    note: "海辺のチャペルでささやかに。",
    schedule: [
      { time: "10:30", label: "受付開始" },
      { time: "11:30", label: "挙式" },
      { time: "12:30", label: "会食" },
      { time: "14:00", label: "おひらき" },
    ],
    rsvp: { attending: 24, awaiting: 6 },
    template: "Pearl Coast",
  },
  {
    slug: "sora-yui",
    couple: "空 &  結衣",
    date: "2026年6月28日 (日)",
    time: "15:00 受付 / 16:00 挙式",
    venue: "赤坂 Garden Hall",
    address: "東京都港区赤坂 6-9-2",
    note: "夕暮れのガーデンでお待ちしています。",
    schedule: [
      { time: "15:00", label: "受付開始" },
      { time: "16:00", label: "挙式" },
      { time: "17:00", label: "披露宴" },
      { time: "19:00", label: "おひらき" },
    ],
    rsvp: { attending: 52, awaiting: 18 },
    template: "Garden Mist",
  },
];

export const templates = [
  {
    name: "Sakura Linen",
    tone: "和紙の柔らかさと桜の余韻",
    accent: "#C9A77C",
  },
  {
    name: "Pearl Coast",
    tone: "海辺の光と白磁の透明感",
    accent: "#C9A77C",
  },
  {
    name: "Garden Mist",
    tone: "夕霧とグリーンの余白",
    accent: "#C9A77C",
  },
];
