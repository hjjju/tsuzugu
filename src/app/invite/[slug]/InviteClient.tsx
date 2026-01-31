"use client";

import { useEffect, useMemo, useState } from "react";
import type { Invitation, ScheduleItem } from "@/lib/data/invitations";
import { createRSVP } from "@/lib/services/rsvps";

const MAX_GUESTS = 5;

type InviteClientProps = {
  invitation: Invitation;
};

type RsvpFormState = {
  lastName: string;
  firstName: string;
  furigana: string;
  attendance: "attend" | "decline";
  guestsCount: number;
  allergyText: string;
  messageToCouple: string;
  email: string;
  phone?: string;
};

const emptyForm: RsvpFormState = {
  lastName: "",
  firstName: "",
  furigana: "",
  attendance: "attend",
  guestsCount: 1,
  allergyText: "",
  messageToCouple: "",
  email: "",
  phone: "",
};

export default function InviteClient({ invitation }: InviteClientProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [showPaypayModal, setShowPaypayModal] = useState(false);
  const [formState, setFormState] = useState<RsvpFormState>(emptyForm);
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const galleryImages = useMemo(() => {
    const base = [invitation.heroImageUrl, ...invitation.galleryImageUrls];
    const filled = [...base];
    while (filled.length < 6) {
      filled.push(invitation.heroImageUrl);
    }
    return filled.slice(0, 10);
  }, [invitation.galleryImageUrls, invitation.heroImageUrl]);

  const eventDate = useMemo(() => {
    const date = new Date(invitation.dateTimeISO);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    }).format(date);
  }, [invitation.dateTimeISO]);

  const eventTime = useMemo(() => {
    const date = new Date(invitation.dateTimeISO);
    return new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, [invitation.dateTimeISO]);

  const heroSlogan = "想いをつづり、縁をつなぐ。";

  function handleFormChange<K extends keyof RsvpFormState>(
    key: K,
    value: RsvpFormState[K]
  ) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rsvp = createRSVP({
      invitationSlug: invitation.slug,
      lastName: formState.lastName,
      firstName: formState.firstName,
      furigana: formState.furigana,
      email: formState.email,
      phone: formState.phone || undefined,
      attendance: formState.attendance,
      guestsCount: formState.attendance === "decline" ? 0 : formState.guestsCount,
      allergyText: formState.allergyText,
      messageToCouple: formState.messageToCouple,
    });
    setQrToken(rsvp.qrToken);
    setSubmitMessage("受付が完了しました。QRコードを保存してください。");
  }

  async function handleCopy(text: string, message: string) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyNotice(message);
      window.setTimeout(() => setCopyNotice(null), 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleShare() {
    if (!currentUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `つづぐ | ${invitation.brideName} & ${invitation.groomName} ご招待`,
          text:
            invitation.lineShareText ||
            "ご招待の詳細をご確認ください。",
          url: currentUrl,
        });
      } catch (error) {
        console.error(error);
      }
      return;
    }
    handleCopy(currentUrl, "リンクをコピーしました");
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-16 pt-8">
      <section className="fade-in space-y-5 rounded-3xl border border-black/5 bg-white/70 p-6">
        <div
          className="relative h-56 overflow-hidden rounded-2xl bg-ink/5"
          style={{
            backgroundImage: `linear-gradient(140deg, rgba(255,255,255,0.2), rgba(0,0,0,0.35)), url(${invitation.heroImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Wedding Invitation
            </p>
            <h1 className="text-2xl font-semibold">
              {invitation.brideName} & {invitation.groomName}
            </h1>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-ink/70">{eventDate}</p>
          <p className="text-lg font-semibold text-ink">{invitation.venueName}</p>
          <p className="text-sm text-ink/60">{heroSlogan}</p>
        </div>
      </section>

      <section className="fade-in mt-6 grid gap-3">
        {[
          { label: "日付", value: eventDate },
          { label: "時間", value: eventTime },
          { label: "会場", value: invitation.venueName },
          { label: "住所", value: invitation.venueAddress },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-sm"
          >
            <span className="text-ink/60">{item.label}</span>
            <span className="text-ink">{item.value}</span>
          </div>
        ))}
      </section>

      <section className="fade-in mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">ギャラリー</h2>
          <span className="text-xs text-ink/50">{galleryImages.length}枚</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setGalleryIndex(index)}
              className="h-32 w-32 flex-none overflow-hidden rounded-2xl border border-black/5 bg-ink/5"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
        {galleryIndex !== null ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white">
              <div
                className="h-72 bg-ink/10"
                style={{
                  backgroundImage: `url(${galleryImages[galleryIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex items-center justify-between p-4 text-sm">
                <span className="text-ink/60">
                  {galleryIndex + 1} / {galleryImages.length}
                </span>
                <button
                  type="button"
                  className="rounded-full border border-ink/20 px-4 py-2 text-sm text-ink"
                  onClick={() => setGalleryIndex(null)}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-ink">当日の流れ</h2>
        <div className="mt-4 space-y-3">
          {invitation.scheduleItems.map((item: ScheduleItem, index) => (
            <div key={`${item.time}-${index}`} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-accent" />
                {index < invitation.scheduleItems.length - 1 ? (
                  <div className="h-full w-px bg-ink/10" />
                ) : null}
              </div>
              <div className="flex-1 rounded-2xl bg-white/70 px-4 py-3 text-sm">
                <p className="font-semibold text-ink">{item.time}</p>
                <p className="text-ink/70">{item.label}</p>
                {item.detail ? (
                  <p className="text-xs text-ink/50">{item.detail}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">アクセス</h2>
          <button
            type="button"
            className="rounded-full border border-ink/20 px-3 py-1 text-xs text-ink"
            onClick={() =>
              handleCopy(invitation.venueAddress, "住所をコピーしました")
            }
          >
            住所をコピー
          </button>
        </div>
        <div className="mt-4 h-40 rounded-2xl bg-ink/5 p-4 text-sm text-ink/60">
          {invitation.mapEmbedUrl ? (
            <a
              href={invitation.mapEmbedUrl}
              className="flex h-full items-center justify-center rounded-2xl border border-dashed border-ink/30"
            >
              Google Map を開く
            </a>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-ink/30">
              Map Placeholder
            </div>
          )}
        </div>
        {copyNotice ? (
          <p className="mt-3 text-xs text-ink/50">{copyNotice}</p>
        ) : null}
      </section>

      <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-ink">ご出欠の回答</h2>
        <p className="mt-2 text-sm text-ink/70">
          ご出席の有無とアレルギー情報をお知らせください。
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
              placeholder="姓"
              value={formState.lastName}
              onChange={(event) => handleFormChange("lastName", event.target.value)}
              required
            />
            <input
              className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
              placeholder="名"
              value={formState.firstName}
              onChange={(event) =>
                handleFormChange("firstName", event.target.value)
              }
              required
            />
          </div>
          <input
            className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder="ふりがな"
            value={formState.furigana}
            onChange={(event) => handleFormChange("furigana", event.target.value)}
            required
          />
          <input
            className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder="メールアドレス"
            value={formState.email}
            onChange={(event) => handleFormChange("email", event.target.value)}
            required
            type="email"
          />
          <input
            className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder="電話番号 (任意)"
            value={formState.phone}
            onChange={(event) => handleFormChange("phone", event.target.value)}
          />
          <div className="flex gap-2">
            {[
              { label: "出席", value: "attend" },
              { label: "欠席", value: "decline" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  handleFormChange(
                    "attendance",
                    option.value as RsvpFormState["attendance"]
                  )
                }
                className={`flex h-11 flex-1 items-center justify-center rounded-full border text-sm font-medium transition-opacity duration-300 hover:opacity-80 ${
                  formState.attendance === option.value
                    ? "border-accent bg-accent/20 text-ink"
                    : "border-ink/20 text-ink/70"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-ink/50">
              同伴者人数
            </label>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {Array.from({ length: MAX_GUESTS + 1 }).map((_, count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleFormChange("guestsCount", count)}
                  className={`h-11 rounded-2xl border text-sm ${
                    formState.guestsCount === count
                      ? "border-accent bg-accent/20"
                      : "border-ink/15"
                  } ${formState.attendance === "decline" ? "opacity-40" : ""}`}
                  disabled={formState.attendance === "decline"}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="min-h-[88px] w-full rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 text-sm"
            placeholder="アレルギーやお食事のご希望がございましたらご記入ください。"
            value={formState.allergyText}
            onChange={(event) =>
              handleFormChange("allergyText", event.target.value)
            }
          />
          <textarea
            className="min-h-[88px] w-full rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 text-sm"
            placeholder="お二人へのメッセージ"
            value={formState.messageToCouple}
            onChange={(event) =>
              handleFormChange("messageToCouple", event.target.value)
            }
          />
          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
          >
            送信してQRを受け取る
          </button>
        </form>
        {submitMessage ? (
          <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink">
            <p className="font-semibold">{submitMessage}</p>
            {qrToken ? (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-ink/20 bg-white text-[10px] text-ink">
                  {qrToken.slice(0, 8)}
                </div>
                <div>
                  <p className="text-xs text-ink/60">QRトークン</p>
                  <p className="text-sm font-semibold text-ink">{qrToken}</p>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-ink">ご祝儀</h2>
        <p className="mt-2 text-sm text-ink/70">
          Tsuzuguはサービス手数料0円。PayPayで安心してお送りいただけます。
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <a
            href={invitation.paypayReceiveLink || "#"}
            className={`flex h-11 items-center justify-center rounded-full text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80 ${
              invitation.paypayReceiveLink ? "bg-paypay" : "bg-ink/30"
            }`}
            aria-disabled={!invitation.paypayReceiveLink}
          >
            ご祝儀を送る
          </a>
          <button
            type="button"
            className="flex h-11 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
            onClick={() => setShowPaypayModal(true)}
          >
            PayPay の使い方を見る
          </button>
        </div>
      </section>

      {showPaypayModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6">
            <h3 className="text-lg font-semibold text-ink">PayPay 送金ガイド</h3>
            <ol className="mt-4 space-y-3 text-sm text-ink/70">
              <li>1. 「ご祝儀を送る」をタップしてPayPayを開きます。</li>
              <li>2. 金額を入力し、メッセージを添えて送金します。</li>
              <li>3. 送金後に画面を保存して完了です。</li>
              <li>4. 式当日はQRをご提示ください。</li>
            </ol>
            <button
              type="button"
              className="mt-6 flex h-11 w-full items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink"
              onClick={() => setShowPaypayModal(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      ) : null}

      <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-ink">共有</h2>
        <p className="mt-2 text-sm text-ink/70">
          LINEを優先にご案内できます。
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
              currentUrl || ""
            )}`}
            className="flex h-11 items-center justify-center rounded-full border border-ink/20 bg-white text-sm font-semibold text-ink transition-opacity duration-300 hover:opacity-80"
          >
            LINEで共有
          </a>
          <button
            type="button"
            onClick={handleShare}
            className="flex h-11 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
          >
            共有リンクを送る
          </button>
          <button
            type="button"
            onClick={() => handleCopy(currentUrl, "リンクをコピーしました")}
            className="flex h-11 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
          >
            リンクをコピー
          </button>
        </div>
        {copyNotice ? (
          <p className="mt-3 text-xs text-ink/50">{copyNotice}</p>
        ) : null}
      </section>
    </div>
  );
}
