export const copyJa = {
  headerMain: {
    title: "ご結婚のご報告とご招待",
    sub: "このたび結婚式を挙げる運びとなりました。ぜひご列席賜りますようお願い申し上げます。",
    casual: "よろしければ、ぜひお越しください。お会いできるのを楽しみにしています。",
  },
  infoLabels: {
    dateTime: "日時",
    venue: "会場",
    address: "住所",
    access: "アクセス",
  },
  addressCopy: {
    button: "住所をコピー",
    toastSuccess: "住所をコピーしました。",
    toastFail: "コピーに失敗しました。もう一度お試しください。",
  },
  rsvp: {
    sectionTitle: "ご出欠（RSVP）",
    deadline: "お手数ではございますが、◯月◯日までにご回答をお願いいたします。",
    labels: {
      lastName: "姓",
      firstName: "名",
      furigana: "フリガナ",
      email: "メールアドレス",
      phone: "電話番号（任意）",
      attendanceAttend: "ご出席",
      attendanceDecline: "ご欠席",
      guests: "同伴者人数",
      allergy: "アレルギー・食事制限",
      message: "新郎新婦へのメッセージ（任意）",
    },
    allergyNote:
      "アレルギーや食事制限がある方は、差し支えない範囲でご記入ください。",
    submit: "送信する",
    thanksTitle: "ご回答ありがとうございます。",
    qrGuide:
      "受付の際にこちらのQRコードをご提示ください。スクリーンショットの保存をおすすめします。",
  },
  qrHint: {
    line1: "当日は受付でQRコードをご提示ください。",
    line2: "通信状況により表示に時間がかかる場合があります。事前に保存しておくと安心です。",
  },
  paypay: {
    title: "ご祝儀について",
    button: "ご祝儀を送る",
    mainNote:
      "本サービスでは手数料はいただいておりません。ご祝儀はPayPayを通じて新郎新婦へ直接お届けいただけます。",
    secondaryNote:
      "当日の受付混雑を避けるため、事前送付をご案内しております。もちろん当日のお持ち込みでも構いません。",
    modalSteps: [
      "ボタンを押してPayPayの受け取りリンクを開きます。",
      "金額を入力し、内容をご確認ください。",
      "送付後、必要に応じて完了画面を保存してください。",
    ],
  },
  share: {
    sectionTitle: "共有",
    lineButton: "LINEで送る",
    copyLink: "リンクをコピー",
    toast: "リンクをコピーしました。",
  },
  privacy: {
    shortNotice:
      "ご回答内容は出欠確認および当日のご案内のためにのみ利用いたします。",
  },
} as const;

export type CopyJa = typeof copyJa;
