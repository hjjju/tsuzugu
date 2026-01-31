"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createInvitation } from "@/lib/services/invitations";

const defaultMessage =
  "このたび私たちは結婚式を挙げる運びとなりました。\n日頃お世話になっている皆様に感謝の気持ちを込めて、ささやかな席を設けております。\nご都合がよろしければぜひご出席ください。";

const templates = [
  {
    key: "minimal",
    label: "Minimal",
    classes: {
      card: "bg-white/80 border-black/5",
      heading: "text-ink",
      button: "bg-accent text-white",
      spacing: "space-y-3",
    },
  },
  {
    key: "classic",
    label: "Classic",
    classes: {
      card: "bg-white border-accent/30",
      heading: "text-ink font-semibold",
      button: "bg-ink text-white",
      spacing: "space-y-4",
    },
  },
  {
    key: "modern",
    label: "Modern",
    classes: {
      card: "bg-ink text-white border-ink/20",
      heading: "text-white",
      button: "bg-white text-ink",
      spacing: "space-y-5",
    },
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

export default function CreatePage() {
  const [templateKey, setTemplateKey] = useState("minimal");
  const [brideName, setBrideName] = useState("陽菜");
  const [groomName, setGroomName] = useState("健人");
  const [dateTimeISO, setDateTimeISO] = useState("2026-07-12T15:00");
  const [venueName, setVenueName] = useState("代官山 Hillside Chapel");
  const [venueAddress, setVenueAddress] = useState("東京都渋谷区猿楽町 23-3");
  const [heroImageUrl, setHeroImageUrl] = useState(
    "/images/invite/sample/hero.jpg"
  );
  const [galleryInput, setGalleryInput] = useState(
    "/images/invite/sample/gallery-01.jpg\n/images/invite/sample/gallery-02.jpg\n/images/invite/sample/gallery-03.jpg"
  );
  const [messageJP, setMessageJP] = useState(defaultMessage);
  const [paypayReceiveLink, setPaypayReceiveLink] = useState("");
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);
  const [baseUrl] = useState(() =>
    typeof window !== "undefined" ? window.location.origin : ""
  );

  const selectedTemplate =
    templates.find((template) => template.key === templateKey) || templates[0];

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

  function handleCreate() {
    const slugBase = generateSlug(brideName, groomName);
    const invitation = createInvitation({
      slug: slugBase,
      brideName,
      groomName,
      dateTimeISO: new Date(dateTimeISO).toISOString(),
      venueName,
      venueAddress,
      heroImageUrl,
      galleryImageUrls,
      messageJP,
      scheduleItems: [
        { time: "15:00", label: "受付開始" },
        { time: "16:00", label: "挙式" },
        { time: "17:00", label: "披露宴" },
      ],
      mapEmbedUrl: "",
      paypayReceiveLink: paypayReceiveLink || undefined,
      lineShareText: `${brideName}と${groomName}の招待状です。ご確認ください。`,
    });

    setCreatedSlug(invitation.slug);
    setSubmitNotice("招待状を作成しました。リンクを共有してください。");
  }

  const inviteUrl = createdSlug
    ? `${baseUrl}/invite/${createdSlug}`
    : undefined;

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
      <section className="fade-in space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Create</p>
        <h1 className="text-2xl font-semibold text-ink">招待状を作る</h1>
        <p className="text-sm text-ink/70">
          入力内容はそのままプレビューへ反映されます。
        </p>
      </section>

      <section className="fade-in mt-6 space-y-4 rounded-3xl border border-black/5 bg-white/70 p-5">
        <div className="flex gap-2">
          {templates.map((template) => (
            <button
              key={template.key}
              type="button"
              onClick={() => setTemplateKey(template.key)}
              className={`h-9 flex-1 rounded-full border text-xs ${
                templateKey === template.key
                  ? "border-accent bg-accent/20"
                  : "border-ink/20 text-ink/60"
              }`}
            >
              {template.label}
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              className="h-11 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
              value={brideName}
              onChange={(event) => setBrideName(event.target.value)}
              placeholder="新婦のお名前"
            />
            <input
              className="h-11 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
              value={groomName}
              onChange={(event) => setGroomName(event.target.value)}
              placeholder="新郎のお名前"
            />
          </div>
          <input
            type="datetime-local"
            className="h-11 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
            value={dateTimeISO}
            onChange={(event) => setDateTimeISO(event.target.value)}
          />
          <input
            className="h-11 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
            value={venueName}
            onChange={(event) => setVenueName(event.target.value)}
            placeholder="会場名"
          />
          <input
            className="h-11 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
            value={venueAddress}
            onChange={(event) => setVenueAddress(event.target.value)}
            placeholder="会場住所"
          />
          <input
            className="h-11 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
            value={heroImageUrl}
            onChange={(event) => setHeroImageUrl(event.target.value)}
            placeholder="メイン画像URL"
          />
          <textarea
            className="min-h-[88px] rounded-2xl border border-ink/15 bg-white/80 px-3 py-2 text-sm"
            value={galleryInput}
            onChange={(event) => setGalleryInput(event.target.value)}
            placeholder="ギャラリー画像URL (改行区切り)"
          />
          <textarea
            className="min-h-[120px] rounded-2xl border border-ink/15 bg-white/80 px-3 py-2 text-sm"
            value={messageJP}
            onChange={(event) => setMessageJP(event.target.value)}
            placeholder="招待文"
          />
          <input
            className="h-11 rounded-2xl border border-ink/15 bg-white/80 px-3 text-sm"
            value={paypayReceiveLink}
            onChange={(event) => setPaypayReceiveLink(event.target.value)}
            placeholder="PayPay受け取りリンク (任意)"
          />
        </div>
        <button
          type="button"
          onClick={handleCreate}
          className="flex h-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
        >
          招待状を作成
        </button>
        {submitNotice ? (
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink">
            <p className="font-semibold">{submitNotice}</p>
            {inviteUrl ? (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-ink/60">{inviteUrl}</span>
                <Link
                  href={`/invite/${createdSlug}`}
                  className="rounded-full border border-ink/20 px-3 py-1 text-xs text-ink"
                >
                  開く
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="fade-in mt-6">
        <h2 className="text-lg font-semibold text-ink">プレビュー</h2>
        <div
          className={`mt-3 rounded-3xl border p-5 ${selectedTemplate.classes.card}`}
        >
          <div className={selectedTemplate.classes.spacing}>
            <div
              className="h-40 rounded-2xl bg-ink/10"
              style={{
                backgroundImage: `url(${heroImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] opacity-70">
                Wedding Invitation
              </p>
              <h3
                className={`text-xl font-semibold ${selectedTemplate.classes.heading}`}
              >
                {brideName} & {groomName}
              </h3>
              <p className="text-sm opacity-70">{previewDate}</p>
              <p className="text-sm opacity-70">{venueName}</p>
            </div>
            <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
              {messageJP}
            </p>
            <button
              type="button"
              className={`h-11 w-full rounded-full text-sm font-semibold ${
                selectedTemplate.classes.button
              }`}
            >
              出欠を回答
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
