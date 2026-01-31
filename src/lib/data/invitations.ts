export type ScheduleItem = {
  time: string;
  label: string;
  detail?: string;
};

export type Invitation = {
  slug: string;
  brideName: string;
  groomName: string;
  dateTimeISO: string;
  venueName: string;
  venueAddress: string;
  heroImageUrl: string;
  galleryImageUrls: string[];
  messageJP: string;
  scheduleItems: ScheduleItem[];
  mapEmbedUrl?: string;
  paypayReceiveLink?: string;
  lineShareText?: string;
};

export const invitations: Invitation[] = [
  {
    slug: "haru-kai",
    brideName: "春香",
    groomName: "海斗",
    dateTimeISO: "2026-05-17T12:00:00+09:00",
    venueName: "白金レジデンス Chapel",
    venueAddress: "東京都港区白金 1-2-3",
    heroImageUrl: "/images/invite/haru-kai/hero.jpg",
    galleryImageUrls: [
      "/images/invite/haru-kai/gallery-01.jpg",
      "/images/invite/haru-kai/gallery-02.jpg",
      "/images/invite/haru-kai/gallery-03.jpg",
    ],
    messageJP:
      "両家ささやかな挙式と感謝の会を予定しております。お越しを心よりお待ちしております。",
    scheduleItems: [
      { time: "11:00", label: "受付開始" },
      { time: "12:00", label: "挙式" },
      { time: "13:00", label: "披露宴" },
      { time: "15:00", label: "おひらき" },
    ],
    mapEmbedUrl:
      "https://maps.google.com/?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E7%99%BD%E9%87%91",
    paypayReceiveLink: "https://pay.paypay.ne.jp/p2p/haru-kai",
    lineShareText: "春香と海斗の招待状です。ご都合をお知らせください。",
  },
  {
    slug: "mio-ryo",
    brideName: "美緒",
    groomName: "涼",
    dateTimeISO: "2026-04-04T11:30:00+09:00",
    venueName: "鎌倉 Ocean Terrace",
    venueAddress: "神奈川県鎌倉市由比ガ浜 4-8",
    heroImageUrl: "/images/invite/mio-ryo/hero.jpg",
    galleryImageUrls: [
      "/images/invite/mio-ryo/gallery-01.jpg",
      "/images/invite/mio-ryo/gallery-02.jpg",
    ],
    messageJP: "海辺のチャペルで、ささやかに式を挙げます。",
    scheduleItems: [
      { time: "10:30", label: "受付開始" },
      { time: "11:30", label: "挙式" },
      { time: "12:30", label: "会食" },
      { time: "14:00", label: "おひらき" },
    ],
    mapEmbedUrl:
      "https://maps.google.com/?q=%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E9%8E%8C%E5%80%89%E5%B8%82",
    lineShareText: "美緒と涼の招待状です。お会いできるのを楽しみにしています。",
  },
  {
    slug: "sora-yui",
    brideName: "空",
    groomName: "結衣",
    dateTimeISO: "2026-06-28T16:00:00+09:00",
    venueName: "赤坂 Garden Hall",
    venueAddress: "東京都港区赤坂 6-9-2",
    heroImageUrl: "/images/invite/sora-yui/hero.jpg",
    galleryImageUrls: ["/images/invite/sora-yui/gallery-01.jpg"],
    messageJP: "夕暮れのガーデンでお待ちしております。",
    scheduleItems: [
      { time: "15:00", label: "受付開始" },
      { time: "16:00", label: "挙式" },
      { time: "17:00", label: "披露宴" },
      { time: "19:00", label: "おひらき" },
    ],
    mapEmbedUrl:
      "https://maps.google.com/?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E8%B5%A4%E5%9D%82",
    paypayReceiveLink: "https://pay.paypay.ne.jp/p2p/sora-yui",
  },
];
