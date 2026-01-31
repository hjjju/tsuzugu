"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createInvitation } from "@/lib/services/invitations";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

const bgmSamples = [
  {
    id: "bgm-01",
    title: "Morning Light",
    artist: "Studio Tsuzugu",
    src: "/audio/bgm-01.mp3",
  },
  {
    id: "bgm-02",
    title: "Garden Walk",
    artist: "Studio Tsuzugu",
    src: "/audio/bgm-02.mp3",
  },
  {
    id: "bgm-03",
    title: "Warm Promise",
    artist: "Studio Tsuzugu",
    src: "/audio/bgm-03.mp3",
  },
];

function generateSlug(brideName: string, groomName: string) {
  const base = `${brideName}-${groomName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  if (base.length >= 3) {
    return base;
  }
  return `invite-${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeGallery(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const AdminTab = ({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 h-12 text-sm font-medium border-b-2 transition-colors ${
      active
        ? "border-accent text-accent"
        : "border-transparent text-ink/50 hover:text-ink/80"
    }`}
  >
    {children}
  </button>
);

const Accordion = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => (
  <details className="rounded-2xl border border-ink/10 bg-white/70" open={defaultOpen}>
    <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-ink">
      {title}
    </summary>
    <div className="space-y-4 px-4 pb-4 text-sm text-ink/70">
      {children}
    </div>
  </details>
);

export default function CreatePage({
  locale,
  copy,
}: {
  locale?: Locale;
  copy?: ReturnType<typeof getDictionary>["create"];
}) {
  const dict = copy ?? getDictionary(locale ?? "ja").create;
  const [activeTab, setActiveTab] = useState("basic");
  const [brideName, setBrideName] = useState("陽菜");
  const [groomName, setGroomName] = useState("健人");
  const [mainVisualText, setMainVisualText] = useState("Our Wedding Day");
  const [dateTimeISO, setDateTimeISO] = useState("2026-07-12T15:00");
  const [venueName, setVenueName] = useState("代官山 Hillside Chapel");
  const [venueAddress, setVenueAddress] = useState("東京都渋谷区猿楽町 23-3");
  const [mapEmbedUrl, setMapEmbedUrl] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.693011382554!2d139.7024349152583!3d35.65991898019909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5b5c9c9e6b%3A0x1b2d3b8b9b8d3b8d!2sHillside%20Terrace!5e0!3m2!1sen!2sjp!4v1628889781005!5m2!1sen!2sjp"
  );
  const [heroImageUrl, setHeroImageUrl] = useState(
    "/images/invite/sample/hero.jpg"
  );
  const [heroPreviewUrl, setHeroPreviewUrl] = useState<string | null>(null);
  const [autoFocus, setAutoFocus] = useState(true);
  const [focusX, setFocusX] = useState(50);
  const [focusY, setFocusY] = useState(30);
  const [letteringY, setLetteringY] = useState(70);
  const [accentColor, setAccentColor] = useState("#C9A77C");
  const [textColor, setTextColor] = useState("#ffffff");
  const [overlayOpacity, setOverlayOpacity] = useState(40);
  const [fontStyle, setFontStyle] = useState("serif");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [selectedBgm, setSelectedBgm] = useState("bgm-01");
  const [playingBgm, setPlayingBgm] = useState<string | null>(null);
  const [animationType, setAnimationType] = useState("fade");
  const [animationSpeed, setAnimationSpeed] = useState(600);
  const [galleryInput] = useState(
    "/images/invite/sample/gallery-01.jpg\n/images/invite/sample/gallery-02.jpg\n/images/invite/sample/gallery-03.jpg"
  );
  const [messageJP, setMessageJP] = useState(dict.defaultMessage);
  const [paypayReceiveLink] = useState("");
  const [paypayEnabled, setPaypayEnabled] = useState(true);
  const [paypayBrideLink, setPaypayBrideLink] = useState("");
  const [paypayGroomLink, setPaypayGroomLink] = useState("");
  const [paypayNotice, setPaypayNotice] = useState(dict.paypayNoticeDefault);
  const [paypayGuideText, setPaypayGuideText] = useState(dict.paypayGuideDefault);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [baseUrl] = useState(() =>
    typeof window !== "undefined" ? window.location.origin : ""
  );
  const [currentLocale] = useState(() => {
    if (locale) return locale;
    if (typeof window === "undefined") return "ja";
    const segment = window.location.pathname.split("/")[1];
    return segment || "ja";
  });
  const [rsvpRequireName, setRsvpRequireName] = useState(true);
  const [rsvpRequireFurigana, setRsvpRequireFurigana] = useState(true);
  const [rsvpAllergyEnabled, setRsvpAllergyEnabled] = useState(true);
  const [rsvpCompanionEnabled, setRsvpCompanionEnabled] = useState(true);
  const [rsvpShuttleEnabled, setRsvpShuttleEnabled] = useState(false);
  const [rsvpSpeechEnabled, setRsvpSpeechEnabled] = useState(false);
  const [rsvpDeadline, setRsvpDeadline] = useState("2026-05-10");
  const [rsvpNotice, setRsvpNotice] = useState(dict.rsvpNoticeDefault);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const templates = useMemo(
    () => [
      {
        key: "classic",
        name: dict.templateClassicName,
        description: dict.templateClassicDesc,
        preview: "/images/invite/sample/hero.jpg",
        accent: "#C9A77C",
        text: "#ffffff",
        overlay: 35,
        font: "serif",
        letterY: 68,
        animation: "fade",
      },
      {
        key: "nature",
        name: dict.templateNatureName,
        description: dict.templateNatureDesc,
        preview: "/images/invite/sample/gallery-01.jpg",
        accent: "#7A9B7E",
        text: "#ffffff",
        overlay: 25,
        font: "serif",
        letterY: 64,
        animation: "fade",
      },
      {
        key: "modern",
        name: dict.templateModernName,
        description: dict.templateModernDesc,
        preview: "/images/invite/sample/gallery-02.jpg",
        accent: "#3A3A3A",
        text: "#f7f4ef",
        overlay: 55,
        font: "sans",
        letterY: 72,
        animation: "envelope",
      },
    ],
    [dict]
  );

  const galleryImageUrls = useMemo(
    () => normalizeGallery(galleryInput),
    [galleryInput]
  );

  const previewDate = useMemo(() => {
    const date = new Date(dateTimeISO);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, [dateTimeISO]);

  const previewImage = heroPreviewUrl || heroImageUrl;
  const objectPosition = `${autoFocus ? 50 : focusX}% ${autoFocus ? 30 : focusY}%`;

  async function handleCreate() {
    setIsSubmitting(true);
    setErrorNotice(null);
    const slugBase = generateSlug(brideName, groomName);
    try {
      const invitation = await createInvitation({
        slug: slugBase,
        brideName,
        groomName,
        mainVisualText,
        dateTimeISO: new Date(dateTimeISO).toISOString(),
        venueName,
        venueAddress,
        mapEmbedUrl,
        heroImageUrl,
        galleryImageUrls,
        messageJP,
        scheduleItems: [
          { time: "15:00", label: "受付開始" },
          { time: "16:00", label: "挙式" },
          { time: "17:00", label: "披露宴" },
        ],
        paypayReceiveLink: paypayEnabled ? effectivePaypayLink || undefined : undefined,
        paypayEnabled,
        paypayBrideLink: paypayBrideLink || undefined,
        paypayGroomLink: paypayGroomLink || undefined,
        paypayNotice,
        paypayGuideText,
        lineShareText: dict.lineShareTemplate
          .replace("{bride}", brideName)
          .replace("{groom}", groomName),
        rsvpRequireName,
        rsvpRequireFurigana,
        rsvpAllergyEnabled,
        rsvpCompanionEnabled,
        rsvpShuttleEnabled,
        rsvpSpeechEnabled,
        rsvpDeadline,
        rsvpNotice,
      });

      setCreatedSlug(invitation.slug);
      setSubmitNotice(dict.createSuccess);
      setIsDirty(false);
    } catch (error) {
      console.error(error);
      setErrorNotice(dict.createFailure);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePreviewBgm(id: string) {
    const audio = audioRefs.current[id];
    if (!audio) return;
    if (playingBgm === id) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingBgm(null);
      return;
    }
    if (playingBgm && audioRefs.current[playingBgm]) {
      audioRefs.current[playingBgm]?.pause();
      if (audioRefs.current[playingBgm]) {
        audioRefs.current[playingBgm]!.currentTime = 0;
      }
    }
    audio.play();
    setPlayingBgm(id);
  }

  const inviteUrl = createdSlug
    ? `${baseUrl}/${currentLocale}/invite/${createdSlug}`
    : undefined;
  const effectivePaypayLink =
    paypayBrideLink || paypayGroomLink || paypayReceiveLink;
  const paypaySteps = paypayGuideText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-8">
      <header className="fade-in space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
          Tsuzugu Admin
        </p>
        <h1 className="text-2xl font-semibold text-ink">{dict.adminTitle}</h1>
        <p className="text-sm text-ink/60">{dict.adminSubtitle}</p>
      </header>

      <main className="fade-in mt-6 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
        <section className="tsz-card">
          <div className="flex rounded-t-3xl border-b border-black/10 bg-white/90">
            <AdminTab
              onClick={() => setActiveTab("basic")}
              active={activeTab === "basic"}
            >
              {dict.tabBasic}
            </AdminTab>
            <AdminTab
              onClick={() => setActiveTab("design")}
              active={activeTab === "design"}
            >
              {dict.tabDesign}
            </AdminTab>
            <AdminTab
              onClick={() => setActiveTab("rsvp")}
              active={activeTab === "rsvp"}
            >
              {dict.tabRsvp}
            </AdminTab>
            <AdminTab
              onClick={() => setActiveTab("payment")}
              active={activeTab === "payment"}
            >
              {dict.tabPayment}
            </AdminTab>
          </div>

          <div className="space-y-6 p-6">
            {activeTab === "basic" && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-ink">{dict.basicTitle}</h2>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                    value={brideName}
                    onChange={(e) => {
                      setBrideName(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder={dict.brideNamePlaceholder}
                  />
                  <input
                    className="h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                    value={groomName}
                    onChange={(e) => {
                      setGroomName(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder={dict.groomNamePlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.dateLabel}</label>
                  <input
                    type="datetime-local"
                    className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                    value={dateTimeISO}
                    onChange={(e) => {
                      setDateTimeISO(e.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.venueLabel}</label>
                  <input
                    className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                    value={venueName}
                    onChange={(e) => {
                      setVenueName(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder={dict.venueLabel}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.addressLabel}</label>
                  <input
                    className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                    value={venueAddress}
                    onChange={(e) => {
                      setVenueAddress(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder={dict.addressLabel}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.mapLabel}</label>
                  <input
                    className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                    value={mapEmbedUrl}
                    onChange={(e) => {
                      setMapEmbedUrl(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder={dict.mapPlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm text-ink">{dict.greetingLabel}</span>
                    <span
                      className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink/20 text-[10px] text-ink/60"
                      title={dict.greetingHelp}
                      aria-label={dict.greetingHelp}
                    >
                      ?
                    </span>
                  </div>
                  <textarea
                    className="w-full min-h-[140px] rounded-xl border border-ink/15 bg-white/80 px-3 py-2 text-sm"
                    value={messageJP}
                    onChange={(e) => {
                      setMessageJP(e.target.value);
                      setIsDirty(true);
                    }}
                    placeholder={dict.greetingPlaceholder}
                  />
                </div>
              </div>
            )}

            {activeTab === "design" && (
              <div className="space-y-5">
                <p className="text-sm text-ink/60">{dict.designNote}</p>

                <Accordion title={dict.templateTitle} defaultOpen>
                  <div className="flex items-center gap-2 text-xs text-ink/50">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-ink/20 text-[10px]">
                      i
                    </span>
                    <p>{dict.templateHelp}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {templates.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(item.key);
                          setAccentColor(item.accent);
                          setTextColor(item.text);
                          setOverlayOpacity(item.overlay);
                          setHeroImageUrl(item.preview);
                          setFontStyle(item.font);
                          setLetteringY(item.letterY);
                          setAnimationType(item.animation);
                          setIsDirty(true);
                        }}
                        className={`rounded-2xl border p-3 text-left transition-shadow ${
                          selectedTemplate === item.key
                            ? "border-accent shadow-sm"
                            : "border-ink/10"
                        }`}
                      >
                        <div
                          className="h-20 w-full rounded-xl bg-ink/5"
                          style={{
                            backgroundImage: `url(${item.preview})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <p className="mt-3 text-sm font-semibold text-ink">
                          {item.name}
                        </p>
                        <p className="text-xs text-ink/60">{item.description}</p>
                      </button>
                    ))}
                  </div>
                </Accordion>

                <Accordion title={dict.visualTitle} defaultOpen>
                  <div className="flex items-center gap-2 text-xs text-ink/50">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-ink/20 text-[10px]">
                      i
                    </span>
                    <p>{dict.visualHelp}</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm text-ink">{dict.uploadLabel}</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="text-sm"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setHeroPreviewUrl(url);
                          setIsDirty(true);
                        }
                      }}
                    />
                    <label className="text-sm text-ink">{dict.imageUrlLabel}</label>
                    <input
                      className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                      value={heroImageUrl}
                      onChange={(e) => {
                        setHeroImageUrl(e.target.value);
                        setHeroPreviewUrl(null);
                        setIsDirty(true);
                      }}
                    />
                    <label className="text-sm text-ink">{dict.letteringLabel}</label>
                    <input
                      className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                      value={mainVisualText}
                      onChange={(e) => {
                        setMainVisualText(e.target.value);
                        setIsDirty(true);
                      }}
                    />
                    <div className="space-y-2">
                      <label className="text-xs text-ink/60">
                        {dict.letteringPositionLabel}
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={letteringY}
                        onChange={(event) => {
                          setLetteringY(Number(event.target.value));
                          setIsDirty(true);
                        }}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-ink/60">{dict.textColorLabel}</label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(event) => {
                          setTextColor(event.target.value);
                          setIsDirty(true);
                        }}
                        className="h-11 w-full rounded-xl border border-ink/15 bg-white/80 p-2"
                      />
                    </div>
                    <div className="space-y-2 rounded-xl border border-ink/10 bg-white/70 p-3">
                      <label className="flex items-center justify-between text-xs text-ink/60">
                        <span>{dict.autoFocusLabel}</span>
                        <input
                          type="checkbox"
                          checked={autoFocus}
                          onChange={(event) => {
                            setAutoFocus(event.target.checked);
                            if (event.target.checked) {
                              setFocusX(50);
                              setFocusY(30);
                            }
                            setIsDirty(true);
                          }}
                        />
                      </label>
                      <div className="space-y-2">
                        <label className="text-[11px] text-ink/50">
                          {dict.focusXLabel}
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={focusX}
                          onChange={(event) => {
                            setFocusX(Number(event.target.value));
                            setIsDirty(true);
                          }}
                          className="w-full"
                          disabled={autoFocus}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] text-ink/50">
                          {dict.focusYLabel}
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={focusY}
                          onChange={(event) => {
                            setFocusY(Number(event.target.value));
                            setIsDirty(true);
                          }}
                          className="w-full"
                          disabled={autoFocus}
                        />
                      </div>
                    </div>
                  </div>
                </Accordion>

                <Accordion title={dict.fontColorTitle}>
                  <div className="flex items-center gap-2 text-xs text-ink/50">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-ink/20 text-[10px]">
                      i
                    </span>
                    <p>{dict.fontLabel}</p>
                  </div>
                  <div className="grid gap-3">
                    <label className="text-sm text-ink">{dict.fontLabel}</label>
                    <select
                      className="h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                      value={fontStyle}
                      onChange={(e) => {
                        setFontStyle(e.target.value);
                        setIsDirty(true);
                      }}
                    >
                      <option value="serif">{dict.fontSerif}</option>
                      <option value="sans">{dict.fontSans}</option>
                    </select>
                    <label className="text-sm text-ink">{dict.accentLabel}</label>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(event) => {
                        setAccentColor(event.target.value);
                        setIsDirty(true);
                      }}
                      className="h-11 w-full rounded-xl border border-ink/15 bg-white/80 p-2"
                    />
                    <label className="text-sm text-ink">{dict.overlayLabel}</label>
                    <input
                      type="range"
                      min={0}
                      max={70}
                      value={overlayOpacity}
                      onChange={(event) => {
                        setOverlayOpacity(Number(event.target.value));
                        setIsDirty(true);
                      }}
                      className="w-full"
                    />
                  </div>
                </Accordion>

                <Accordion title={dict.autoFocusTitle}>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between text-sm text-ink">
                      <span>{dict.autoFocusLabel}</span>
                      <input
                        type="checkbox"
                        checked={autoFocus}
                        onChange={(event) => {
                          setAutoFocus(event.target.checked);
                          if (event.target.checked) {
                            setFocusX(50);
                            setFocusY(30);
                          }
                          setIsDirty(true);
                        }}
                      />
                    </label>
                    <div className="space-y-2">
                      <label className="text-xs text-ink/60">{dict.focusXLabel}</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={focusX}
                        onChange={(event) => {
                          setFocusX(Number(event.target.value));
                          setIsDirty(true);
                        }}
                        className="w-full"
                        disabled={autoFocus}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-ink/60">{dict.focusYLabel}</label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={focusY}
                        onChange={(event) => {
                          setFocusY(Number(event.target.value));
                          setIsDirty(true);
                        }}
                        className="w-full"
                        disabled={autoFocus}
                      />
                    </div>
                  </div>
                </Accordion>

                <Accordion title={dict.bgmTitle}>
                  <div className="flex items-center gap-2 text-xs text-ink/50">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-ink/20 text-[10px]">
                      i
                    </span>
                    <p>{dict.bgmHelp}</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm text-ink">{dict.bgmSampleLabel}</label>
                    <div className="space-y-2">
                      {bgmSamples.map((bgm) => (
                        <div
                          key={bgm.id}
                          className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${
                            selectedBgm === bgm.id
                              ? "border-accent bg-accent/10"
                              : "border-ink/10"
                          }`}
                        >
                          <div>
                            <p className="text-ink">{bgm.title}</p>
                            <p className="text-xs text-ink/50">{bgm.artist}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="rounded-full border border-ink/15 px-3 py-1 text-xs"
                              onClick={() => handlePreviewBgm(bgm.id)}
                            >
                              {playingBgm === bgm.id ? dict.bgmStop : dict.bgmPreview}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedBgm(bgm.id);
                                setIsDirty(true);
                              }}
                              className="rounded-full border border-ink/15 px-3 py-1 text-xs"
                            >
                              {dict.bgmSelect}
                            </button>
                          </div>
                          <audio
                            ref={(element) => {
                              audioRefs.current[bgm.id] = element;
                            }}
                            src={bgm.src}
                            preload="none"
                            onEnded={() => setPlayingBgm(null)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Accordion>

                <Accordion title={dict.animationTitle}>
                  <div className="flex items-center gap-2 text-xs text-ink/50">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-ink/20 text-[10px]">
                      i
                    </span>
                    <p>{dict.animationHelp}</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm text-ink">{dict.animationLabel}</label>
                    <select
                      className="h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                      value={animationType}
                      onChange={(e) => {
                        setAnimationType(e.target.value);
                        setIsDirty(true);
                      }}
                    >
                      <option value="fade">{dict.animationFade}</option>
                      <option value="envelope">{dict.animationEnvelope}</option>
                    </select>
                    <label className="text-sm text-ink">{dict.animationSpeed}</label>
                    <input
                      type="range"
                      min={200}
                      max={1200}
                      value={animationSpeed}
                      onChange={(e) => {
                        setAnimationSpeed(Number(e.target.value));
                        setIsDirty(true);
                      }}
                      className="w-full"
                    />
                  </div>
                </Accordion>
              </div>
            )}

            {activeTab === "rsvp" && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-ink">{dict.rsvpTitle}</h2>
                <p className="text-sm text-ink/70">{dict.rsvpDescription}</p>
                <div className="space-y-3 rounded-2xl bg-white/60 p-4">
                  <label className="flex items-center justify-between text-sm">
                    <span>{dict.rsvpRequireName}</span>
                    <input
                      type="checkbox"
                      checked={rsvpRequireName}
                      onChange={(event) => {
                        setRsvpRequireName(event.target.checked);
                        setIsDirty(true);
                      }}
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>{dict.rsvpRequireFurigana}</span>
                    <input
                      type="checkbox"
                      checked={rsvpRequireFurigana}
                      onChange={(event) => {
                        setRsvpRequireFurigana(event.target.checked);
                        setIsDirty(true);
                      }}
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>{dict.rsvpAllergy}</span>
                    <input
                      type="checkbox"
                      checked={rsvpAllergyEnabled}
                      onChange={(event) => {
                        setRsvpAllergyEnabled(event.target.checked);
                        setIsDirty(true);
                      }}
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>{dict.rsvpCompanion}</span>
                    <input
                      type="checkbox"
                      checked={rsvpCompanionEnabled}
                      onChange={(event) => {
                        setRsvpCompanionEnabled(event.target.checked);
                        setIsDirty(true);
                      }}
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>{dict.rsvpShuttle}</span>
                    <input
                      type="checkbox"
                      checked={rsvpShuttleEnabled}
                      onChange={(event) => {
                        setRsvpShuttleEnabled(event.target.checked);
                        setIsDirty(true);
                      }}
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm">
                    <span>{dict.rsvpSpeech}</span>
                    <input
                      type="checkbox"
                      checked={rsvpSpeechEnabled}
                      onChange={(event) => {
                        setRsvpSpeechEnabled(event.target.checked);
                        setIsDirty(true);
                      }}
                    />
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.rsvpDeadlineLabel}</label>
                  <input
                    type="date"
                    className="h-11 w-full rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                    value={rsvpDeadline}
                    onChange={(event) => {
                      setRsvpDeadline(event.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.rsvpNoticeLabel}</label>
                  <textarea
                    className="min-h-[100px] w-full rounded-xl border border-ink/15 bg-white/80 px-3 py-2 text-sm"
                    value={rsvpNotice}
                    onChange={(event) => {
                      setRsvpNotice(event.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>
                <div className="text-xs text-ink/60">
                  {dict.rsvpNote}
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-ink">{dict.paymentTitle}</h2>
                <p className="text-sm text-ink/70">{dict.paymentDescription}</p>
                <div className="rounded-2xl bg-white/70 p-4 space-y-3">
                  <label className="flex items-center justify-between text-sm">
                    <span>{dict.paymentEnable}</span>
                    <input
                      type="checkbox"
                      checked={paypayEnabled}
                      onChange={(event) => {
                        setPaypayEnabled(event.target.checked);
                        setIsDirty(true);
                      }}
                    />
                  </label>
                  <div className="space-y-2">
                    <label className="text-sm text-ink">{dict.paypayBrideLabel}</label>
                    <input
                      className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                      value={paypayBrideLink}
                      onChange={(e) => {
                        setPaypayBrideLink(e.target.value);
                        setIsDirty(true);
                      }}
                      placeholder="https://pay.paypay.ne.jp/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-ink">{dict.paypayGroomLabel}</label>
                    <input
                      className="w-full h-11 rounded-xl border border-ink/15 bg-white/80 px-3 text-sm"
                      value={paypayGroomLink}
                      onChange={(e) => {
                        setPaypayGroomLink(e.target.value);
                        setIsDirty(true);
                      }}
                      placeholder="https://pay.paypay.ne.jp/..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.paypayNoticeLabel}</label>
                  <textarea
                    className="min-h-[90px] w-full rounded-xl border border-ink/15 bg-white/80 px-3 py-2 text-sm"
                    value={paypayNotice}
                    onChange={(event) => {
                      setPaypayNotice(event.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-ink">{dict.paypayGuideLabel}</label>
                  <textarea
                    className="min-h-[120px] w-full rounded-xl border border-ink/15 bg-white/80 px-3 py-2 text-sm"
                    value={paypayGuideText}
                    onChange={(event) => {
                      setPaypayGuideText(event.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>
                <div className="text-xs text-ink/60">
                  {dict.paymentNote}
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="tsz-card p-5 md:sticky md:top-24">
          <h2 className="text-sm font-semibold text-ink">{dict.previewTitle}</h2>
          <div className="mt-4 flex justify-center">
            <div className="relative w-[260px] rounded-[36px] border border-black/10 bg-black/5 p-3 shadow-sm">
              <div className="overflow-hidden rounded-[28px] bg-white">
                <div className="relative h-64">
                  <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: overlayOpacity / 100 }}
                  />
                  <img
                    src={previewImage}
                    alt={dict.previewHeroAlt}
                    className="h-full w-full object-cover"
                    style={{ objectPosition }}
                  />
                  <div
                    className={`absolute inset-x-6 text-center ${
                      animationType === "fade" ? "fade-in" : "" 
                    }`}
                    style={{
                      top: `${letteringY}%`,
                      transform: "translateY(-50%)",
                      animationDuration: `${animationSpeed}ms`,
                    }}
                  >
                    <p
                      className="text-xs uppercase tracking-[0.3em]"
                      style={{ color: textColor }}
                    >
                      {mainVisualText}
                    </p>
                    <h3
                      className={`mt-2 text-2xl font-semibold ${
                        fontStyle === "serif" ? "font-display" : "font-sans"
                      }`}
                      style={{ color: textColor }}
                    >
                      {brideName} & {groomName}
                    </h3>
                  </div>
                  {animationType === "envelope" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-20 w-28 origin-bottom animate-[fade-in_0.6s_ease_both] rounded-t-2xl border border-white/60 bg-white/80" />
                    </div>
                  ) : null}
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-sm text-ink">{previewDate}</p>
                  <p className="text-sm text-ink/70">{venueName}</p>
                  <div className="h-px bg-black/5" />
                  <p className="text-xs text-ink/60 whitespace-pre-line">
                    {messageJP}
                  </p>
                  <button
                    type="button"
                    className="mt-2 w-full rounded-full py-2 text-xs font-semibold"
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    {dict.previewButton}
                  </button>
                  <div className="space-y-2 pt-3">
                    <p className="text-[11px] text-ink/60">{rsvpNotice}</p>
                    <p className="text-[11px] text-ink/50">
                      {dict.previewDeadlineLabel}: {rsvpDeadline}
                    </p>
                    <div className="grid gap-2">
                      {rsvpRequireName ? (
                        <div className="h-8 rounded-lg border border-ink/10 bg-white/60 text-[10px] text-ink/50 px-2 py-1">
                          {dict.previewNameLabel}
                        </div>
                      ) : null}
                      {rsvpRequireFurigana ? (
                        <div className="h-8 rounded-lg border border-ink/10 bg-white/60 text-[10px] text-ink/50 px-2 py-1">
                          {dict.previewFuriganaLabel}
                        </div>
                      ) : null}
                      {rsvpAllergyEnabled ? (
                        <div className="h-10 rounded-lg border border-ink/10 bg-white/60 text-[10px] text-ink/50 px-2 py-1">
                          {dict.previewAllergyLabel}
                        </div>
                      ) : null}
                      {rsvpCompanionEnabled ? (
                        <div className="h-8 rounded-lg border border-ink/10 bg-white/60 text-[10px] text-ink/50 px-2 py-1">
                          {dict.previewCompanionLabel}
                        </div>
                      ) : null}
                      {rsvpShuttleEnabled ? (
                        <div className="h-8 rounded-lg border border-ink/10 bg-white/60 text-[10px] text-ink/50 px-2 py-1">
                          {dict.previewShuttleLabel}
                        </div>
                      ) : null}
                      {rsvpSpeechEnabled ? (
                        <div className="h-8 rounded-lg border border-ink/10 bg-white/60 text-[10px] text-ink/50 px-2 py-1">
                          {dict.previewSpeechLabel}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {paypayEnabled ? (
                  <div className="border-t border-black/5 bg-white/90 px-4 py-3">
                    <p className="text-[10px] text-ink/60">{paypayNotice}</p>
                    <button
                      type="button"
                      className="mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-full text-[10px] font-semibold text-white"
                      style={{ backgroundColor: "#ff0033" }}
                    >
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-[#ff0033]">
                        Pay
                      </span>
                      {dict.paypayButton}
                    </button>
                    {paypaySteps.length ? (
                      <div className="mt-2 space-y-1 rounded-lg border border-ink/10 bg-white/70 p-2 text-[9px] text-ink/60">
                        <p className="font-semibold text-ink/70">
                          {dict.paypayGuideTitle}
                        </p>
                        {paypaySteps.map((step, index) => (
                          <p key={step}>{index + 1}. {step}</p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-black/30 px-4 py-1 text-[10px] text-white/80">
                {dict.previewTitle}
              </div>
            </div>
          </div>
        </aside>
      </main>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleCreate}
          className="tsz-button-primary w-full h-12 disabled:opacity-40"
          disabled={isSubmitting}
        >
          {isSubmitting ? dict.creating : dict.createButton}
        </button>
      </div>

      {errorNotice && (
        <p className="mt-4 text-center text-sm text-red-500">{errorNotice}</p>
      )}

      {submitNotice && inviteUrl && (
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink">
          <p className="font-semibold text-center">{submitNotice}</p>
          <div className="mt-3 flex items-center justify-between rounded-full bg-white/80 p-2">
            <span className="pl-3 text-xs text-ink/60 truncate">{inviteUrl}</span>
            <Link
              href={inviteUrl}
              target="_blank"
              className="rounded-full bg-white shadow-sm border border-ink/10 px-4 py-2 text-xs font-semibold text-ink"
            >
              {dict.previewLink}
            </Link>
          </div>
        </div>
      )}

      {isDirty ? (
        <div className="fixed bottom-4 left-1/2 z-30 w-[92%] -translate-x-1/2 rounded-full bg-ink px-4 py-3 text-center text-xs font-medium text-white shadow-lg">
          {dict.unsaved}
        </div>
      ) : null}
    </div>
  );
}
