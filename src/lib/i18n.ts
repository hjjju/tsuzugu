export const locales = ["jp", "ko", "en"] as const;
export type Locale = (typeof locales)[number];

type InviteCopy = {
  greetingTitle: string;
  greetingDefault: string;
  scheduleTitle: string;
  dateLabel: string;
  venueLabel: string;
  addressLabel: string;
  rsvpTitle: string;
  rsvpNoticeFallback: string;
  rsvpDeadlineLabel: string;
  nameLabel: string;
  nameLastPlaceholder: string;
  nameFirstPlaceholder: string;
  furiganaLabel: string;
  furiganaPlaceholder: string;
  emailLabel: string;
  attendanceLabel: string;
  attend: string;
  decline: string;
  allergyLabel: string;
  allergyPlaceholder: string;
  companionLabel: string;
  companionPlaceholder: string;
  shuttleLabel: string;
  shuttleYes: string;
  shuttleNo: string;
  speechLabel: string;
  speechYes: string;
  speechNo: string;
  submit: string;
  submitPending: string;
  rsvpThanksTitle: string;
  rsvpThanksNote: string;
  rsvpError: string;
  qrButton: string;
  lineSelfShare: string;
  paypayTitle: string;
  paypayFallbackNote: string;
  paypayButton: string;
  paypayBrideButton: string;
  paypayGroomButton: string;
  paypayModalTitle: string;
  paypayModalEmpty: string;
  paypayClose: string;
  qrModalTitle: string;
  qrModalNote: string;
  close: string;
  lineShareText: string;
  qrAlt: string;
};

type Dictionary = {
  header: {
    menuLabel: string;
    brandKana: string;
    ctaCreate: string;
  };
  footer: {
    tagline: string;
    market: string;
    domain: string;
  };
  admin: {
    title: string;
    subtitle: string;
    loadingInvites: string;
    loadInvitesError: string;
    loadRsvpsError: string;
    emptyInvites: string;
    selectInvitation: string;
    kpiTotal: string;
    kpiAttend: string;
    kpiDecline: string;
    kpiAllergy: string;
    filtersPlaceholder: string;
    filterAll: string;
    filterAttend: string;
    filterDecline: string;
    filterAllergyOnly: string;
    checkInTitle: string;
    checkInPlaceholder: string;
    checkInButton: string;
    checkInFailed: string;
    checkInSuccess: string;
    csvExport: string;
    listTitle: string;
    listCount: string;
    loadingRsvps: string;
    tableAttend: string;
    tableDecline: string;
    tableCompanion: string;
    tableGuestsUnit: string;
    tableAllergy: string;
    tableMessage: string;
    tableEmail: string;
    tablePhone: string;
    tableCreatedAt: string;
    tableCheckIn: string;
    tableCheckInDone: string;
    tableCheckInPending: string;
    tableNoData: string;
    csvHeaders: string[];
  };
  create: {
    adminTitle: string;
    adminSubtitle: string;
    tabBasic: string;
    tabDesign: string;
    tabRsvp: string;
    tabPayment: string;
    basicTitle: string;
    brideNamePlaceholder: string;
    groomNamePlaceholder: string;
    dateLabel: string;
    venueLabel: string;
    addressLabel: string;
    mapLabel: string;
    mapPlaceholder: string;
    greetingLabel: string;
    greetingHelp: string;
    greetingPlaceholder: string;
    defaultMessage: string;
    designNote: string;
    templateTitle: string;
    templateHelp: string;
    templateClassicName: string;
    templateClassicDesc: string;
    templateNatureName: string;
    templateNatureDesc: string;
    templateModernName: string;
    templateModernDesc: string;
    visualTitle: string;
    visualHelp: string;
    uploadLabel: string;
    imageUrlLabel: string;
    letteringLabel: string;
    letteringPositionLabel: string;
    textColorLabel: string;
    autoFocusTitle: string;
    autoFocusLabel: string;
    focusXLabel: string;
    focusYLabel: string;
    fontColorTitle: string;
    fontLabel: string;
    fontSerif: string;
    fontSans: string;
    accentLabel: string;
    overlayLabel: string;
    bgmTitle: string;
    bgmHelp: string;
    bgmSampleLabel: string;
    bgmPreview: string;
    bgmStop: string;
    bgmSelect: string;
    animationTitle: string;
    animationHelp: string;
    animationLabel: string;
    animationFade: string;
    animationEnvelope: string;
    animationSpeed: string;
    rsvpTitle: string;
    rsvpDescription: string;
    rsvpRequireName: string;
    rsvpRequireFurigana: string;
    rsvpAllergy: string;
    rsvpCompanion: string;
    rsvpShuttle: string;
    rsvpSpeech: string;
    rsvpDeadlineLabel: string;
    rsvpNoticeLabel: string;
    rsvpNoticeDefault: string;
    rsvpNote: string;
    paymentTitle: string;
    paymentDescription: string;
    paymentEnable: string;
    paypayBrideLabel: string;
    paypayGroomLabel: string;
    paypayNoticeLabel: string;
    paypayGuideLabel: string;
    paypayGuideTitle: string;
    paypayButton: string;
    paymentNote: string;
    paypayNoticeDefault: string;
    paypayGuideDefault: string;
    previewTitle: string;
    previewHeroAlt: string;
    previewButton: string;
    previewRsvpNoticeLabel: string;
    previewDeadlineLabel: string;
    previewNameLabel: string;
    previewFuriganaLabel: string;
    previewAllergyLabel: string;
    previewCompanionLabel: string;
    previewShuttleLabel: string;
    previewSpeechLabel: string;
    createButton: string;
    creating: string;
    createSuccess: string;
    createFailure: string;
    previewLink: string;
    unsaved: string;
    lineShareTemplate: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    heroPrimary: string;
    heroSecondary: string;
    heroNote: string;
    featureTitle: string;
    featureSubtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    templatesTitle: string;
    templatesSubtitle: string;
    template1Title: string;
    template1Desc: string;
    template2Title: string;
    template2Desc: string;
    template3Title: string;
    template3Desc: string;
    template4Title: string;
    template4Desc: string;
    templateView: string;
    stepsTitle: string;
    stepsSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    priceTitle: string;
    priceSubtitle: string;
    priceFreeTitle: string;
    priceFreePrice: string;
    priceFreeDesc1: string;
    priceFreeDesc2: string;
    priceFreeDesc3: string;
    pricePaidTitle: string;
    pricePaidPrice: string;
    pricePaidDesc1: string;
    pricePaidDesc2: string;
    pricePaidDesc3: string;
    priceNote: string;
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    faq4Q: string;
    faq4A: string;
    faq5Q: string;
    faq5A: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaPrimary: string;
  };
  templates: {
    title: string;
    subtitle: string;
    cta: string;
  };
  invite: InviteCopy;
};

const jp: Dictionary = {
  header: {
    menuLabel: "メニューを開く",
    brandKana: "つづぐ",
    ctaCreate: "招待状を作る",
  },
  footer: {
    tagline: "© Tsuzugu – 想いをつづぐウェディングサービス",
    market: "日本向けウェディング招待状サービス",
    domain: "tsuzugu.jp",
  },
  admin: {
    title: "招待状の管理",
    subtitle: "ローカル管理モード。Firebase Auth 連携に備えた構成です。",
    loadingInvites: "招待状を読み込み中...",
    loadInvitesError: "招待状の読み込みに失敗しました。",
    loadRsvpsError: "回答一覧の読み込みに失敗しました。",
    emptyInvites: "招待状がまだ作成されていません。",
    selectInvitation: "招待状を選択",
    kpiTotal: "総回答",
    kpiAttend: "出席",
    kpiDecline: "欠席",
    kpiAllergy: "アレルギー",
    filtersPlaceholder: "お名前 / ふりがなで検索",
    filterAll: "すべて",
    filterAttend: "出席",
    filterDecline: "欠席",
    filterAllergyOnly: "アレルギーのみ",
    checkInTitle: "QRチェックイン",
    checkInPlaceholder: "QRトークンを入力",
    checkInButton: "チェックイン",
    checkInFailed: "チェックインに失敗しました",
    checkInSuccess: "チェックイン完了",
    csvExport: "CSVを書き出す",
    listTitle: "回答一覧",
    listCount: "表示中 {count} 件",
    loadingRsvps: "回答を読み込み中...",
    tableAttend: "出席",
    tableDecline: "欠席",
    tableCompanion: "同伴者",
    tableGuestsUnit: "名",
    tableAllergy: "アレルギー",
    tableMessage: "メッセージ",
    tableEmail: "メール",
    tablePhone: "電話",
    tableCreatedAt: "回答日",
    tableCheckIn: "チェックイン",
    tableCheckInDone: "済",
    tableCheckInPending: "未",
    tableNoData: "該当する回答がありません。",
    csvHeaders: [
      "姓",
      "名",
      "ふりがな",
      "出欠",
      "同伴者",
      "アレルギー",
      "メッセージ",
      "メール",
      "電話",
      "回答日時",
    ],
  },
  create: {
    adminTitle: "招待状を作る",
    adminSubtitle: "丁寧な言葉選びと余白を意識しながら、上質な招待状をお仕立てします。",
    tabBasic: "基本情報",
    tabDesign: "デザイン",
    tabRsvp: "RSVP設定",
    tabPayment: "結済・送金",
    basicTitle: "基本情報",
    brideNamePlaceholder: "新婦のお名前",
    groomNamePlaceholder: "新郎のお名前",
    dateLabel: "日時",
    venueLabel: "会場名",
    addressLabel: "会場住所",
    mapLabel: "地図URL",
    mapPlaceholder: "Googleマップ埋め込みURL",
    greetingLabel: "ご挨拶文",
    greetingHelp: "忌み言葉を避け、感謝とこれからのご縁を丁寧にお伝えください。",
    greetingPlaceholder: "招待文",
    defaultMessage:
      "このたび私たちは結婚式を挙げる運びとなりました。\n日頃お世話になっている皆様に感謝の気持ちを込めて、ささやかな席を設けております。\nご都合がよろしければぜひご出席ください。",
    designNote: "日本結婚式では柔らかなベージュとホワイトが信頼感を伝えます。",
    templateTitle: "テンプレート選択",
    templateHelp: "雰囲気に近いテンプレートを選ぶと、配色と演出が自動で整います。",
    templateClassicName: "Classic White",
    templateClassicDesc: "白とアイボリーの上質感",
    templateNatureName: "Nature Green",
    templateNatureDesc: "淡いグリーンと木漏れ日",
    templateModernName: "Modern Dark",
    templateModernDesc: "深みのある陰影とモダン",
    visualTitle: "メインビジュアル",
    visualHelp: "レタリングは写真の明るい部分を避けると読みやすくなります。",
    uploadLabel: "画像アップロード",
    imageUrlLabel: "画像URL",
    letteringLabel: "レタリング文言",
    letteringPositionLabel: "レタリング位置",
    textColorLabel: "テキストカラー",
    autoFocusTitle: "自動フォーカス",
    autoFocusLabel: "自動フォーカス",
    focusXLabel: "フォーカス位置（左右）",
    focusYLabel: "フォーカス位置（上下）",
    fontColorTitle: "フォント・カラー",
    fontLabel: "フォント設定",
    fontSerif: "明朝体（上品）",
    fontSans: "ゴシック体（読みやすい）",
    accentLabel: "アクセントカラー",
    overlayLabel: "オーバーレイ濃度",
    bgmTitle: "BGM",
    bgmHelp: "受け取った方の環境に配慮し、控えめな音量を推奨します。",
    bgmSampleLabel: "サンプルBGM",
    bgmPreview: "試聴",
    bgmStop: "停止",
    bgmSelect: "選択",
    animationTitle: "アニメーション",
    animationHelp: "余白のある演出ほど上品に見える傾向があります。",
    animationLabel: "演出",
    animationFade: "テキストフェード",
    animationEnvelope: "封筒が開く演出",
    animationSpeed: "フェード速度",
    rsvpTitle: "RSVP設定",
    rsvpDescription: "招待状に表示される出欠フォームの項目を設定します。",
    rsvpRequireName: "お名前（姓・名）を必須にする",
    rsvpRequireFurigana: "フリガナ（セイ・メイ）を必須にする",
    rsvpAllergy: "食物アレルギーの確認を表示",
    rsvpCompanion: "同伴者氏名の記入欄を表示",
    rsvpShuttle: "送迎バスご利用の確認",
    rsvpSpeech: "祝辞ご担当の確認",
    rsvpDeadlineLabel: "回答期限",
    rsvpNoticeLabel: "ご案内文",
    rsvpNoticeDefault: "恐れ入りますが、期日までにご回答をお願い申し上げます。",
    rsvpNote: "日本の式では柔らかなベージュとホワイトが信頼感を与えます。",
    paymentTitle: "結済・送金設定",
    paymentDescription: "PayPayの受け取りリンクを設定すると、招待状に送金ボタンが表示されます。",
    paymentEnable: "事前ご祝儀のご案内を表示",
    paypayBrideLabel: "新婦様 PayPay受け取りリンク",
    paypayGroomLabel: "新郎様 PayPay受け取りリンク",
    paypayNoticeLabel: "手数料0円のご案内文",
    paypayGuideLabel: "PayPay送金方法ガイド（改行区切り）",
    paypayGuideTitle: "PayPay送金方法ガイド",
    paypayButton: "PayPayで送る",
    paymentNote: "ご祝儀は任意である旨を添え、当日のお持ち込みも可能であることを丁寧に記載します。",
    paypayNoticeDefault: "手数料0円で、感謝の気持ちをPayPayで直接お届けいただけます。",
    paypayGuideDefault:
      "1. ボタンを押してPayPayの受け取りリンクを開きます。\n2. 金額を入力し、内容をご確認ください。\n3. 送付後、必要に応じて完了画面を保存してください。",
    previewTitle: "モバイルプレビュー",
    previewHeroAlt: "招待状メインビジュアル",
    previewButton: "ご出欠の回答へ",
    previewRsvpNoticeLabel: "ご案内",
    previewDeadlineLabel: "ご回答期限",
    previewNameLabel: "お名前（姓・名）",
    previewFuriganaLabel: "フリガナ（セイ・メイ）",
    previewAllergyLabel: "食物アレルギーの有無・内容",
    previewCompanionLabel: "同伴者氏名（任意）",
    previewShuttleLabel: "送迎バスのご利用有無",
    previewSpeechLabel: "祝辞ご担当の確認",
    createButton: "招待状を作成する",
    creating: "作成中...",
    createSuccess: "招待状を作成しました。リンクを共有してください。",
    createFailure: "招待状の作成に失敗しました。",
    previewLink: "プレビュー",
    unsaved: "保存されていない変更があります",
    lineShareTemplate: "{bride}と{groom}の招待状です。ご確認ください。",
  },
  home: {
    heroKicker: "モバイル招待状サービス",
    heroTitle: "写真とストーリーで伝える、ふたりだけのWEB招待状",
    heroSubtitle:
      "紙の招待状よりも手軽に、アルバムよりも特別に。スマホひとつで、ゲストにやさしい体験を届けます。",
    heroPrimary: "招待状を作る",
    heroSecondary: "テンプレートを見る",
    heroNote: "最短10分で完成・LINEで共有",
    featureTitle: "特徴",
    featureSubtitle: "ふたりらしさと使いやすさを両立。",
    feature1Title: "写真が主役のWEB招待状",
    feature1Desc:
      "大きな写真と余白で、ふたりのストーリーを美しく見せます。",
    feature2Title: "ゲストに優しいスマホ設計",
    feature2Desc:
      "縦スクロール中心のシンプル設計。文字もボタンも読みやすく。",
    feature3Title: "LINEでURLを送るだけ",
    feature3Desc:
      "リンクをコピーしてLINEで送信。アプリ不要でアクセスできます。",
    feature4Title: "多言語対応もOK",
    feature4Desc: "日本語／英語／韓国語に対応。海外ゲストにも安心です。",
    templatesTitle: "テンプレートギャラリー",
    templatesSubtitle: "雰囲気に合わせて選べる4スタイル。",
    template1Title: "Romantic",
    template1Desc: "淡い花と余白でやさしく",
    template2Title: "Minimal",
    template2Desc: "シンプルで上品に",
    template3Title: "Modern",
    template3Desc: "洗練された都会的デザイン",
    template4Title: "和モダン",
    template4Desc: "和の要素をさりげなく",
    templateView: "プレビューを見る",
    stepsTitle: "作り方",
    stepsSubtitle: "3ステップで完成。",
    step1Title: "テンプレートを選ぶ",
    step1Desc: "好みの雰囲気からスタート。",
    step2Title: "写真と情報を入力",
    step2Desc: "日程・会場・地図・RSVPを登録。",
    step3Title: "URLをLINEで送る",
    step3Desc: "ゲストにそのまま共有できます。",
    priceTitle: "料金",
    priceSubtitle: "まずは無料で試して、気に入ったら本番に。",
    priceFreeTitle: "フリープラン",
    priceFreePrice: "¥0",
    priceFreeDesc1: "全テンプレート閲覧",
    priceFreeDesc2: "サンプル作成・共有",
    priceFreeDesc3: "透かしありプレビュー",
    pricePaidTitle: "ワンタイムプラン",
    pricePaidPrice: "¥3,980（税込）",
    pricePaidDesc1: "透かしなし公開URL",
    pricePaidDesc2: "写真・文章の更新無制限",
    pricePaidDesc3: "RSVP・地図・LINE共有",
    priceNote: "※ 料金はリリース時に変更される場合があります。",
    faqTitle: "よくある質問",
    faq1Q: "招待状はどのくらいの期間公開されますか？",
    faq1A:
      "公開から12ヶ月間はそのまま閲覧できます。延長も予定しています。",
    faq2Q: "ゲストはアプリを入れる必要がありますか？",
    faq2A: "不要です。URLを開くだけで閲覧できます。",
    faq3Q: "あとから内容を変更できますか？",
    faq3A: "はい。写真や文章、日程など何度でも更新できます。",
    faq4Q: "支払い方法は何がありますか？",
    faq4A: "現在はクレジットカード決済を準備中です。",
    faq5Q: "海外ゲスト向けに英語表示できますか？",
    faq5A: "はい。日本語／英語／韓国語に切り替え可能です。",
    ctaTitle: "まずは無料で作ってみませんか？",
    ctaSubtitle: "登録は1分。テンプレート選びから始めましょう。",
    ctaPrimary: "無料で作ってみる",
  },
  templates: {
    title: "テンプレート一覧",
    subtitle: "お二人らしさに合わせたデザインをご用意しています。",
    cta: "このテンプレートで作成",
  },
  invite: {
    greetingTitle: "ご案内",
    greetingDefault:
      "拝啓　春暖の候、皆様にはますますご清祥のこととお慶び申し上げます。\nこのたび結婚式を挙げる運びとなりました。\n日頃お世話になっている皆様に感謝の気持ちを込めて、ささやかな席を設けております。\nご都合がよろしければぜひご列席賜りますようお願い申し上げます。\n敬具",
    scheduleTitle: "ご案内",
    dateLabel: "日時",
    venueLabel: "会場",
    addressLabel: "住所",
    rsvpTitle: "ご出欠のご回答",
    rsvpNoticeFallback:
      "恐れ入りますが、以下の項目にご記入をお願いいたします。",
    rsvpDeadlineLabel: "ご回答期限",
    nameLabel: "お名前（姓・名）",
    nameLastPlaceholder: "姓",
    nameFirstPlaceholder: "名",
    furiganaLabel: "フリガナ（セイ・メイ）",
    furiganaPlaceholder: "フリガナ",
    emailLabel: "メールアドレス",
    attendanceLabel: "ご出席 / ご欠席",
    attend: "ご出席",
    decline: "ご欠席",
    allergyLabel: "食物アレルギーの有無・内容",
    allergyPlaceholder: "差し支えない範囲でご記入ください",
    companionLabel: "同伴者氏名（任意）",
    companionPlaceholder: "同伴者様のお名前",
    shuttleLabel: "送迎バスのご利用有無",
    shuttleYes: "利用する",
    shuttleNo: "利用しない",
    speechLabel: "祝辞ご担当の確認",
    speechYes: "担当する",
    speechNo: "担当しない",
    submit: "送信",
    submitPending: "送信中...",
    rsvpThanksTitle: "ご回答ありがとうございます。",
    rsvpThanksNote: "個別のQRコードをご提示いただくと、受付がスムーズです。",
    rsvpError: "エラーが発生しました。もう一度お試しください。",
    qrButton: "QRコードを表示する",
    lineSelfShare: "LINEで自分に送る",
    paypayTitle: "ご祝儀",
    paypayFallbackNote:
      "手数料なく心をお届けできます。PayPayでの送金をご希望の際にご利用ください。",
    paypayButton: "PayPayで送る",
    paypayBrideButton: "新婦様へPayPayで送る",
    paypayGroomButton: "新郎様へPayPayで送る",
    paypayModalTitle: "PayPay送金方法ガイド",
    paypayModalEmpty: "ご案内文が設定されていません。",
    paypayClose: "閉じる",
    qrModalTitle: "入場用QRコード",
    qrModalNote: "当日は受付でこちらのQRコードをご提示ください。",
    close: "閉じる",
    lineShareText: "出欠の回答を控えました。QRコード: {qrToken}",
    qrAlt: "入場用QRコード",
  },
};

const ko: Dictionary = {
  header: {
    menuLabel: "메뉴 열기",
    brandKana: "つづぐ",
    ctaCreate: "초대장 만들기",
  },
  footer: {
    tagline: "© Tsuzugu – 마음을 전하는 웨딩 초대 서비스",
    market: "일본 웨딩 초대장 서비스",
    domain: "tsuzugu.jp",
  },
  admin: {
    title: "초대장 관리",
    subtitle: "로컬 관리 모드입니다. Firebase Auth 연동을 고려해 구성했습니다.",
    loadingInvites: "초대장을 불러오는 중...",
    loadInvitesError: "초대장 불러오기에 실패했습니다.",
    loadRsvpsError: "응답 목록을 불러오지 못했습니다.",
    emptyInvites: "아직 생성된 초대장이 없습니다.",
    selectInvitation: "초대장 선택",
    kpiTotal: "총 응답",
    kpiAttend: "참석",
    kpiDecline: "불참",
    kpiAllergy: "알레르기",
    filtersPlaceholder: "이름 / 후리가나 검색",
    filterAll: "전체",
    filterAttend: "참석",
    filterDecline: "불참",
    filterAllergyOnly: "알레르기만",
    checkInTitle: "QR 체크인",
    checkInPlaceholder: "QR 토큰 입력",
    checkInButton: "체크인",
    checkInFailed: "체크인에 실패했습니다",
    checkInSuccess: "체크인 완료",
    csvExport: "CSV 내보내기",
    listTitle: "응답 목록",
    listCount: "표시 중 {count}건",
    loadingRsvps: "응답을 불러오는 중...",
    tableAttend: "참석",
    tableDecline: "불참",
    tableCompanion: "동반자",
    tableGuestsUnit: "명",
    tableAllergy: "알레르기",
    tableMessage: "메시지",
    tableEmail: "이메일",
    tablePhone: "전화",
    tableCreatedAt: "응답일",
    tableCheckIn: "체크인",
    tableCheckInDone: "완료",
    tableCheckInPending: "미완료",
    tableNoData: "해당하는 응답이 없습니다.",
    csvHeaders: [
      "성",
      "이름",
      "후리가나",
      "출결",
      "동반자",
      "알레르기",
      "메시지",
      "이메일",
      "전화",
      "응답일시",
    ],
  },
  create: {
    adminTitle: "초대장 만들기",
    adminSubtitle: "정중한 표현과 여백을 살려 품격 있는 초대장을 제작합니다.",
    tabBasic: "기본정보",
    tabDesign: "디자인",
    tabRsvp: "RSVP 설정",
    tabPayment: "결제 및 송금",
    basicTitle: "기본정보",
    brideNamePlaceholder: "신부 이름",
    groomNamePlaceholder: "신랑 이름",
    dateLabel: "일시",
    venueLabel: "예식장명",
    addressLabel: "예식장 주소",
    mapLabel: "지도 URL",
    mapPlaceholder: "Google 지도 임베드 URL",
    greetingLabel: "인사말",
    greetingHelp: "금기어를 피하고 감사 인사를 정중하게 전해 주세요.",
    greetingPlaceholder: "초대 문구",
    defaultMessage:
      "저희 두 사람은 결혼식을 올리게 되었습니다.\n평소 베풀어주신 은혜에 감사드리며, 작은 자리를 마련하였습니다.\n시간 되실 때 참석해 주시면 감사하겠습니다.",
    designNote: "일본 예식은 부드러운 베이지와 화이트 톤이 신뢰감을 줍니다.",
    templateTitle: "템플릿 선택",
    templateHelp: "가까운 분위기를 선택하면 색상과 연출이 자동 반영됩니다.",
    templateClassicName: "Classic White",
    templateClassicDesc: "화이트/아이보리의 품격",
    templateNatureName: "Nature Green",
    templateNatureDesc: "부드러운 그린과 햇살",
    templateModernName: "Modern Dark",
    templateModernDesc: "깊이감 있는 모던 톤",
    visualTitle: "메인 비주얼",
    visualHelp: "레터링은 밝은 영역을 피하면 가독성이 좋아집니다.",
    uploadLabel: "이미지 업로드",
    imageUrlLabel: "이미지 URL",
    letteringLabel: "레터링 문구",
    letteringPositionLabel: "레터링 위치",
    textColorLabel: "텍스트 색상",
    autoFocusTitle: "자동 포커스",
    autoFocusLabel: "자동 포커스",
    focusXLabel: "포커스 위치(좌우)",
    focusYLabel: "포커스 위치(상하)",
    fontColorTitle: "폰트/컬러",
    fontLabel: "폰트 선택",
    fontSerif: "명조체(품격)",
    fontSans: "고딕체(가독성)",
    accentLabel: "포인트 컬러",
    overlayLabel: "오버레이 강도",
    bgmTitle: "BGM",
    bgmHelp: "받는 분의 환경을 고려해 음량은 낮게 설정하는 것을 추천합니다.",
    bgmSampleLabel: "샘플 BGM",
    bgmPreview: "미리듣기",
    bgmStop: "정지",
    bgmSelect: "선택",
    animationTitle: "애니메이션",
    animationHelp: "여백이 있는 연출이 더 고급스럽게 보입니다.",
    animationLabel: "연출",
    animationFade: "텍스트 페이드",
    animationEnvelope: "봉투 오픈 연출",
    animationSpeed: "페이드 속도",
    rsvpTitle: "RSVP 설정",
    rsvpDescription: "초대장에 표시될 출결 폼 항목을 설정합니다.",
    rsvpRequireName: "이름(성/이름) 필수",
    rsvpRequireFurigana: "후리가나 필수",
    rsvpAllergy: "식품 알레르기 표시",
    rsvpCompanion: "동반자 이름 항목 표시",
    rsvpShuttle: "셔틀버스 이용 확인",
    rsvpSpeech: "축사 담당 확인",
    rsvpDeadlineLabel: "응답 마감",
    rsvpNoticeLabel: "안내 문구",
    rsvpNoticeDefault: "번거로우시겠지만 기한 내에 응답 부탁드립니다.",
    rsvpNote: "부드러운 베이지/화이트 톤이 신뢰감을 줍니다.",
    paymentTitle: "결제 및 송금 설정",
    paymentDescription: "PayPay 링크를 설정하면 초대장에 송금 버튼이 표시됩니다.",
    paymentEnable: "사전 축의금 안내 표시",
    paypayBrideLabel: "신부 PayPay 링크",
    paypayGroomLabel: "신랑 PayPay 링크",
    paypayNoticeLabel: "수수료 0원 안내 문구",
    paypayGuideLabel: "PayPay 송금 방법 안내(줄바꿈)",
    paypayGuideTitle: "PayPay 송금 방법 안내",
    paypayButton: "PayPay로 보내기",
    paymentNote: "축의금은 선택 사항이며, 당일 지참도 가능함을 안내합니다.",
    paypayNoticeDefault: "수수료 0원으로 마음을 PayPay로 직접 전할 수 있습니다.",
    paypayGuideDefault:
      "1. 버튼을 눌러 PayPay 받기 링크를 엽니다.\n2. 금액을 입력하고 내용을 확인합니다.\n3. 송금 후 필요 시 완료 화면을 저장합니다.",
    previewTitle: "모바일 프리뷰",
    previewHeroAlt: "초대장 메인 비주얼",
    previewButton: "출석 응답하기",
    previewRsvpNoticeLabel: "안내",
    previewDeadlineLabel: "응답 마감",
    previewNameLabel: "이름(성/이름)",
    previewFuriganaLabel: "후리가나",
    previewAllergyLabel: "식품 알레르기",
    previewCompanionLabel: "동반자 이름(선택)",
    previewShuttleLabel: "셔틀버스 이용 여부",
    previewSpeechLabel: "축사 담당 확인",
    createButton: "초대장 만들기",
    creating: "생성 중...",
    createSuccess: "초대장이 생성되었습니다. 링크를 공유해 주세요.",
    createFailure: "초대장 생성에 실패했습니다.",
    previewLink: "미리보기",
    unsaved: "저장되지 않은 변경이 있습니다",
    lineShareTemplate: "{bride}과 {groom}의 초대장입니다. 확인해 주세요.",
  },
  home: {
    heroKicker: "모바일 초대장 서비스",
    heroTitle: "사진과 스토리로 전하는 두 사람만의 WEB 초대장",
    heroSubtitle:
      "종이 초대장보다 간편하게, 앨범보다 특별하게. 스마트폰 하나로 게스트에게 따뜻한 경험을 전합니다.",
    heroPrimary: "무료로 시작하기",
    heroSecondary: "템플릿 보기",
    heroNote: "10분이면 완성 · LINE 공유",
    featureTitle: "특징",
    featureSubtitle: "둘만의 감성과 사용성을 함께.",
    feature1Title: "사진이 주인공인 WEB 초대장",
    feature1Desc: "큰 사진과 여백으로 스토리를 아름답게 보여줍니다.",
    feature2Title: "게스트 친화적인 모바일 설계",
    feature2Desc:
      "세로 스크롤 중심, 큰 글씨와 버튼으로 읽기 쉽습니다.",
    feature3Title: "LINE으로 URL만 보내면 끝",
    feature3Desc: "링크 복사 후 LINE으로 전송. 앱 설치 필요 없음.",
    feature4Title: "다국어 지원",
    feature4Desc: "일본어/영어/한국어 지원. 해외 게스트도 OK.",
    templatesTitle: "템플릿 갤러리",
    templatesSubtitle: "분위기에 맞춘 4가지 스타일.",
    template1Title: "Romantic",
    template1Desc: "부드러운 꽃과 여백",
    template2Title: "Minimal",
    template2Desc: "심플하고 고급스럽게",
    template3Title: "Modern",
    template3Desc: "세련된 도시 감성",
    template4Title: "와모던",
    template4Desc: "은은한 일본식 포인트",
    templateView: "미리보기",
    stepsTitle: "만드는 방법",
    stepsSubtitle: "3단계로 완성.",
    step1Title: "템플릿 선택",
    step1Desc: "원하는 무드에서 시작.",
    step2Title: "사진과 정보 입력",
    step2Desc: "일정·장소·지도·RSVP를 등록.",
    step3Title: "URL을 LINE으로 공유",
    step3Desc: "게스트에게 바로 전송.",
    priceTitle: "가격",
    priceSubtitle: "먼저 무료로 체험하고, 마음에 들면 본격적으로.",
    priceFreeTitle: "무료 플랜",
    priceFreePrice: "¥0",
    priceFreeDesc1: "모든 템플릿 열람",
    priceFreeDesc2: "샘플 생성·공유",
    priceFreeDesc3: "워터마크 프리뷰",
    pricePaidTitle: "원타임 플랜",
    pricePaidPrice: "¥3,980（税込）",
    pricePaidDesc1: "워터마크 없는 공개 URL",
    pricePaidDesc2: "사진·문구 무제한 수정",
    pricePaidDesc3: "RSVP·지도·LINE 공유",
    priceNote: "※ 출시 시 가격이 변경될 수 있습니다.",
    faqTitle: "자주 묻는 질문",
    faq1Q: "초대장 공개 기간은 얼마나 되나요?",
    faq1A: "공개 후 12개월 동안 열람 가능합니다. 연장도 준비 중입니다.",
    faq2Q: "게스트가 앱을 설치해야 하나요?",
    faq2A: "필요 없습니다. URL만 열면 됩니다.",
    faq3Q: "나중에 내용을 변경할 수 있나요?",
    faq3A: "네. 사진과 문구, 일정 등을 언제든 수정할 수 있습니다.",
    faq4Q: "결제 방법은 어떻게 되나요?",
    faq4A: "현재는 카드 결제를 준비 중입니다.",
    faq5Q: "해외 게스트를 위해 영어로 표시되나요?",
    faq5A: "네. 일본어/영어/한국어 전환이 가능합니다.",
    ctaTitle: "무료로 만들어 볼까요?",
    ctaSubtitle: "1분이면 시작됩니다. 템플릿부터 골라보세요.",
    ctaPrimary: "무료로 시작하기",
  },
  templates: {
    title: "템플릿 목록",
    subtitle: "두 분의 분위기에 맞춘 디자인을 준비했습니다.",
    cta: "이 템플릿으로 만들기",
  },
  invite: {
    greetingTitle: "초대의 말씀",
    greetingDefault:
      "삼가 인사드립니다. 따뜻한 봄날, 여러분의 평안과 행복을 기원합니다.\n이제 저희 두 사람은 결혼식을 올리게 되었습니다.\n평소 베풀어주신 은혜에 감사드리며, 작은 자리를 마련하였습니다.\n시간 되실 때 꼭 참석하시어 자리를 빛내주시길 부탁드립니다.\n감사합니다.",
    scheduleTitle: "안내",
    dateLabel: "일시",
    venueLabel: "예식장",
    addressLabel: "주소",
    rsvpTitle: "참석 여부",
    rsvpNoticeFallback:
      "번거로우시겠지만 아래 항목을 작성해 주시길 부탁드립니다.",
    rsvpDeadlineLabel: "응답 마감",
    nameLabel: "성함(성/이름)",
    nameLastPlaceholder: "성",
    nameFirstPlaceholder: "이름",
    furiganaLabel: "후리가나",
    furiganaPlaceholder: "후리가나",
    emailLabel: "이메일",
    attendanceLabel: "참석 / 불참",
    attend: "참석",
    decline: "불참",
    allergyLabel: "식품 알레르기 여부/내용",
    allergyPlaceholder: "가능한 범위에서 작성해 주세요",
    companionLabel: "동반자 성함(선택)",
    companionPlaceholder: "동반자 성함",
    shuttleLabel: "셔틀버스 이용 여부",
    shuttleYes: "이용",
    shuttleNo: "미이용",
    speechLabel: "축사 담당 여부",
    speechYes: "담당",
    speechNo: "미담당",
    submit: "제출",
    submitPending: "제출 중...",
    rsvpThanksTitle: "응답해 주셔서 감사합니다.",
    rsvpThanksNote: "개별 QR 코드를 제시하시면 안내가 원활합니다.",
    rsvpError: "오류가 발생했습니다. 다시 시도해 주세요.",
    qrButton: "QR 코드 표시",
    lineSelfShare: "LINE으로 보내기",
    paypayTitle: "축의금",
    paypayFallbackNote:
      "수수료 없이 마음을 전할 수 있습니다. PayPay 송금을 원하시는 경우 이용해 주세요.",
    paypayButton: "PayPay로 보내기",
    paypayBrideButton: "신부에게 PayPay 보내기",
    paypayGroomButton: "신랑에게 PayPay 보내기",
    paypayModalTitle: "PayPay 송금 방법 안내",
    paypayModalEmpty: "안내 문구가 설정되지 않았습니다.",
    paypayClose: "닫기",
    qrModalTitle: "입장용 QR 코드",
    qrModalNote: "당일 접수처에서 QR 코드를 제시해 주세요.",
    close: "닫기",
    lineShareText: "참석 응답을 저장했습니다. QR 코드: {qrToken}",
    qrAlt: "입장용 QR 코드",
  },
};

const en: Dictionary = {
  header: {
    menuLabel: "Open menu",
    brandKana: "つづぐ",
    ctaCreate: "Create Invitation",
  },
  footer: {
    tagline: "© Tsuzugu – A wedding invitation service with care",
    market: "Japanese wedding invitation service",
    domain: "tsuzugu.jp",
  },
  admin: {
    title: "Invitation Admin",
    subtitle: "Local admin mode. Ready for Firebase Auth integration.",
    loadingInvites: "Loading invitations...",
    loadInvitesError: "Failed to load invitations.",
    loadRsvpsError: "Failed to load RSVP list.",
    emptyInvites: "No invitations have been created yet.",
    selectInvitation: "Select invitation",
    kpiTotal: "Total",
    kpiAttend: "Attend",
    kpiDecline: "Decline",
    kpiAllergy: "Allergy",
    filtersPlaceholder: "Search by name / furigana",
    filterAll: "All",
    filterAttend: "Attend",
    filterDecline: "Decline",
    filterAllergyOnly: "Allergy only",
    checkInTitle: "QR Check-in",
    checkInPlaceholder: "Enter QR token",
    checkInButton: "Check in",
    checkInFailed: "Check-in failed",
    checkInSuccess: "Check-in completed",
    csvExport: "Export CSV",
    listTitle: "RSVP List",
    listCount: "Showing {count}",
    loadingRsvps: "Loading RSVPs...",
    tableAttend: "Attend",
    tableDecline: "Decline",
    tableCompanion: "Guests",
    tableGuestsUnit: "",
    tableAllergy: "Allergy",
    tableMessage: "Message",
    tableEmail: "Email",
    tablePhone: "Phone",
    tableCreatedAt: "Submitted",
    tableCheckIn: "Check-in",
    tableCheckInDone: "Done",
    tableCheckInPending: "Pending",
    tableNoData: "No RSVPs found.",
    csvHeaders: [
      "Last name",
      "First name",
      "Furigana",
      "Attendance",
      "Guests",
      "Allergy",
      "Message",
      "Email",
      "Phone",
      "Submitted at",
    ],
  },
  create: {
    adminTitle: "Create Invitation",
    adminSubtitle: "Craft a refined invitation with thoughtful wording and spacing.",
    tabBasic: "Basics",
    tabDesign: "Design",
    tabRsvp: "RSVP",
    tabPayment: "Payments",
    basicTitle: "Basics",
    brideNamePlaceholder: "Bride name",
    groomNamePlaceholder: "Groom name",
    dateLabel: "Date & time",
    venueLabel: "Venue name",
    addressLabel: "Venue address",
    mapLabel: "Map URL",
    mapPlaceholder: "Google Maps embed URL",
    greetingLabel: "Greeting",
    greetingHelp: "Avoid sensitive words and express gratitude politely.",
    greetingPlaceholder: "Invitation message",
    defaultMessage:
      "We are pleased to announce our wedding ceremony.\nWith gratitude to everyone who has supported us, we have prepared a small gathering.\nWe would be honored by your presence.",
    designNote: "Soft beige and white tones build trust for Japanese ceremonies.",
    templateTitle: "Template",
    templateHelp: "Pick a style to auto-adjust colors and motion.",
    templateClassicName: "Classic White",
    templateClassicDesc: "Refined white and ivory",
    templateNatureName: "Nature Green",
    templateNatureDesc: "Soft green with dappled light",
    templateModernName: "Modern Dark",
    templateModernDesc: "Deep shadows and modern mood",
    visualTitle: "Hero Visual",
    visualHelp: "Avoid bright areas for better lettering readability.",
    uploadLabel: "Upload image",
    imageUrlLabel: "Image URL",
    letteringLabel: "Lettering",
    letteringPositionLabel: "Lettering position",
    textColorLabel: "Text color",
    autoFocusTitle: "Auto focus",
    autoFocusLabel: "Auto focus",
    focusXLabel: "Focus position (X)",
    focusYLabel: "Focus position (Y)",
    fontColorTitle: "Font & Color",
    fontLabel: "Font",
    fontSerif: "Serif (elegant)",
    fontSans: "Sans (readable)",
    accentLabel: "Accent color",
    overlayLabel: "Overlay density",
    bgmTitle: "BGM",
    bgmHelp: "We recommend a gentle volume for guests.",
    bgmSampleLabel: "Sample BGM",
    bgmPreview: "Preview",
    bgmStop: "Stop",
    bgmSelect: "Select",
    animationTitle: "Animation",
    animationHelp: "Subtle motion feels more refined.",
    animationLabel: "Style",
    animationFade: "Text fade",
    animationEnvelope: "Envelope opening",
    animationSpeed: "Fade speed",
    rsvpTitle: "RSVP",
    rsvpDescription: "Control which RSVP fields are shown.",
    rsvpRequireName: "Require name",
    rsvpRequireFurigana: "Require furigana",
    rsvpAllergy: "Show allergies",
    rsvpCompanion: "Show companion name",
    rsvpShuttle: "Shuttle bus confirmation",
    rsvpSpeech: "Speech role confirmation",
    rsvpDeadlineLabel: "RSVP deadline",
    rsvpNoticeLabel: "Notice",
    rsvpNoticeDefault: "We kindly ask you to respond by the deadline.",
    rsvpNote: "Soft beige and white tones feel trustworthy.",
    paymentTitle: "Payment & Transfer",
    paymentDescription: "Set PayPay links to show transfer buttons.",
    paymentEnable: "Show pre-gift section",
    paypayBrideLabel: "Bride PayPay link",
    paypayGroomLabel: "Groom PayPay link",
    paypayNoticeLabel: "Zero-fee notice",
    paypayGuideLabel: "PayPay guide (line breaks)",
    paypayGuideTitle: "PayPay Transfer Guide",
    paypayButton: "Send with PayPay",
    paymentNote: "Mention that gifts are optional and on-the-day is also acceptable.",
    paypayNoticeDefault: "Send your gift directly via PayPay with zero fees.",
    paypayGuideDefault:
      "1. Tap the button to open the PayPay receive link.\n2. Enter the amount and confirm.\n3. Save the completion screen if needed.",
    previewTitle: "Mobile Preview",
    previewHeroAlt: "Invitation hero visual",
    previewButton: "Go to RSVP",
    previewRsvpNoticeLabel: "Notice",
    previewDeadlineLabel: "RSVP deadline",
    previewNameLabel: "Name",
    previewFuriganaLabel: "Furigana",
    previewAllergyLabel: "Allergies",
    previewCompanionLabel: "Companion name (optional)",
    previewShuttleLabel: "Shuttle bus",
    previewSpeechLabel: "Speech role",
    createButton: "Create invitation",
    creating: "Creating...",
    createSuccess: "Invitation created. Share the link.",
    createFailure: "Failed to create invitation.",
    previewLink: "Preview",
    unsaved: "You have unsaved changes",
    lineShareTemplate: "Invitation from {bride} & {groom}. Please review.",
  },
  home: {
    heroKicker: "Mobile invitation service",
    heroTitle: "A web invitation that tells your story with photos",
    heroSubtitle:
      "Easier than paper, more special than an album. Create a beautiful guest experience right from your phone.",
    heroPrimary: "Try for free",
    heroSecondary: "View templates",
    heroNote: "Ready in ~10 minutes · Share via LINE",
    featureTitle: "Features",
    featureSubtitle: "Designed for couples and guests.",
    feature1Title: "Photo-first layouts",
    feature1Desc: "Large imagery and generous spacing highlight your story.",
    feature2Title: "Mobile-friendly experience",
    feature2Desc: "Simple vertical flow with readable text and buttons.",
    feature3Title: "Share by LINE URL",
    feature3Desc: "Copy the link and send. No app required.",
    feature4Title: "Multilingual support",
    feature4Desc: "Japanese / English / Korean available.",
    templatesTitle: "Template gallery",
    templatesSubtitle: "Four styles to match your mood.",
    template1Title: "Romantic",
    template1Desc: "Soft florals and airy spacing",
    template2Title: "Minimal",
    template2Desc: "Clean and refined",
    template3Title: "Modern",
    template3Desc: "Sleek urban feel",
    template4Title: "Japanese Modern",
    template4Desc: "Subtle traditional accents",
    templateView: "Preview",
    stepsTitle: "How it works",
    stepsSubtitle: "Done in three steps.",
    step1Title: "Choose a template",
    step1Desc: "Start with the style you love.",
    step2Title: "Add photos and details",
    step2Desc: "Date, venue, map, RSVP and more.",
    step3Title: "Share by LINE",
    step3Desc: "Send the URL to your guests.",
    priceTitle: "Pricing",
    priceSubtitle: "Try free, then upgrade when you're ready.",
    priceFreeTitle: "Free plan",
    priceFreePrice: "¥0",
    priceFreeDesc1: "Browse all templates",
    priceFreeDesc2: "Create and share a sample",
    priceFreeDesc3: "Watermarked preview",
    pricePaidTitle: "One-time plan",
    pricePaidPrice: "¥3,980 (tax incl.)",
    pricePaidDesc1: "Public URL without watermark",
    pricePaidDesc2: "Unlimited photo/text edits",
    pricePaidDesc3: "RSVP, map, LINE share",
    priceNote: "Prices may change at launch.",
    faqTitle: "FAQ",
    faq1Q: "How long will the page stay available?",
    faq1A:
      "The page is available for 12 months after publishing. Extensions are planned.",
    faq2Q: "Do guests need to install an app?",
    faq2A: "No. They can view it directly in a browser.",
    faq3Q: "Can I update the content later?",
    faq3A: "Yes. You can edit photos, text, and details anytime.",
    faq4Q: "What payment methods are supported?",
    faq4A: "Credit card payments are being prepared.",
    faq5Q: "Can I show it in English for overseas guests?",
    faq5A: "Yes. Japanese/English/Korean can be switched.",
    ctaTitle: "Ready to start for free?",
    ctaSubtitle: "It takes one minute to begin. Pick a template first.",
    ctaPrimary: "Try for free",
  },
  templates: {
    title: "Templates",
    subtitle: "Choose a design that fits your story.",
    cta: "Use this template",
  },
  invite: {
    greetingTitle: "Invitation",
    greetingDefault:
      "Dear guests, with the warmth of spring, we wish you continued health and happiness.\nWe are pleased to announce our wedding ceremony.\nWith gratitude for your kindness, we have prepared a small gathering.\nWe would be honored by your presence.\nSincerely.",
    scheduleTitle: "Details",
    dateLabel: "Date & Time",
    venueLabel: "Venue",
    addressLabel: "Address",
    rsvpTitle: "RSVP",
    rsvpNoticeFallback:
      "We kindly ask you to complete the form below.",
    rsvpDeadlineLabel: "RSVP Deadline",
    nameLabel: "Name (Last / First)",
    nameLastPlaceholder: "Last name",
    nameFirstPlaceholder: "First name",
    furiganaLabel: "Furigana",
    furiganaPlaceholder: "Furigana",
    emailLabel: "Email",
    attendanceLabel: "Attend / Decline",
    attend: "Attend",
    decline: "Decline",
    allergyLabel: "Food allergies / dietary restrictions",
    allergyPlaceholder: "Please share if applicable",
    companionLabel: "Companion name (optional)",
    companionPlaceholder: "Companion name",
    shuttleLabel: "Shuttle bus",
    shuttleYes: "Use",
    shuttleNo: "No",
    speechLabel: "Speech role",
    speechYes: "Yes",
    speechNo: "No",
    submit: "Submit",
    submitPending: "Submitting...",
    rsvpThanksTitle: "Thank you for your response.",
    rsvpThanksNote: "Present your QR code at reception for a smooth check-in.",
    rsvpError: "An error occurred. Please try again.",
    qrButton: "Show QR code",
    lineSelfShare: "Send to LINE",
    paypayTitle: "Gift",
    paypayFallbackNote:
      "Send your gift with zero fees via PayPay if you wish.",
    paypayButton: "Send with PayPay",
    paypayBrideButton: "Send to Bride via PayPay",
    paypayGroomButton: "Send to Groom via PayPay",
    paypayModalTitle: "PayPay Transfer Guide",
    paypayModalEmpty: "No guide text has been set.",
    paypayClose: "Close",
    qrModalTitle: "Entry QR Code",
    qrModalNote: "Please present this QR code at reception.",
    close: "Close",
    lineShareText: "RSVP saved. QR Code: {qrToken}",
    qrAlt: "Entry QR code",
  },
};

const dictionaries: Record<Locale, Dictionary> = {
  jp,
  ko,
  en,
};

export function getDictionary(locale: string): Dictionary {
  if (locale in dictionaries) {
    return dictionaries[locale as Locale];
  }
  return dictionaries.jp;
}
