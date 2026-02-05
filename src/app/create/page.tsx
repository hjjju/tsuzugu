"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import InviteGuestView, { type InvitationDraft } from "@/components/InviteGuestView";

const initialDraft: InvitationDraft = {
  groomName: "",
  brideName: "",
  title: "結婚パーティー / 二次会",
  date: "",
  time: "",
  venueName: "",
  venueAddress: "",
  message:
    "日頃お世話になっている皆さまと、気楽に集まれる会にしました。\nご都合がよければぜひお越しください！",
  dressCode: "",
  cashGiftNote:
    "当日の現金のほか、PayPayでの事前送金もご利用いただけます。\nご無理のない範囲で、お気持ちだけ頂けたら嬉しいです。",
  notes: "",
};

const requiredFields: Array<keyof InvitationDraft> = [
  "groomName",
  "brideName",
  "title",
  "date",
  "time",
  "venueName",
  "venueAddress",
  "message",
];

function encodeInvitationData(data: InvitationDraft) {
  const json = JSON.stringify(data);
  return btoa(unescape(encodeURIComponent(json)));
}

function buildInviteId() {
  return `tsuzugu-${Math.random().toString(36).slice(2, 8)}`;
}

type Step = "start" | "form" | "preview" | "complete";

type FieldErrors = Partial<Record<keyof InvitationDraft, string>>;

export default function CreatePage({ locale }: { locale?: Locale }) {
  const [step, setStep] = useState<Step>("start");
  const [draft, setDraft] = useState<InvitationDraft>(initialDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const currentLocale = useMemo(() => {
    if (locale) return locale;
    if (typeof window === "undefined") return "jp";
    const segment = window.location.pathname.split("/")[1];
    return segment || "jp";
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const invitePath = useMemo(() => {
    if (!inviteId) return "";
    const encoded = encodeInvitationData(draft);
    return `/${currentLocale}/invite/${inviteId}?data=${encoded}`;
  }, [draft, inviteId, currentLocale]);

  const inviteUrl = origin ? `${origin}${invitePath}` : invitePath;

  const handleChange = (field: keyof InvitationDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors: FieldErrors = {};
    requiredFields.forEach((field) => {
      if (!draft[field]?.toString().trim()) {
        nextErrors[field] = "必須項目です";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePreview = () => {
    if (!validate()) return;
    if (!inviteId) {
      setInviteId(buildInviteId());
    }
    setStep("preview");
  };

  const handleCopy = async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
      <div className="mx-auto w-full max-w-xl space-y-8">
        {step === "start" && (
          <section className="rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-10 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
              招待状の制作フロー
            </p>
            <h1 className="mt-4 font-display text-2xl text-ink">
              3ステップで、すぐに完成
            </h1>
            <ul className="mt-6 space-y-3 text-sm text-ink/70">
              <li>1. 基本情報を入力</li>
              <li>2. プレビューを確認</li>
              <li>3. URLをゲストにシェア</li>
            </ul>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="mt-8 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
            >
              制作をはじめる
            </button>
          </section>
        )}

        {step === "form" && (
          <section className="space-y-6">
            <div className="text-center">
              <h1 className="font-display text-2xl text-ink">招待状の情報入力</h1>
              <p className="mt-2 text-sm text-ink/60">
                友人中心のカジュアルな雰囲気で入力できます。
              </p>
            </div>

            <div className="space-y-5 rounded-[2.5rem] border border-black/5 bg-white/80 p-6 shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">新郎のお名前</label>
                <input
                  value={draft.groomName}
                  onChange={(event) => handleChange("groomName", event.target.value)}
                  placeholder="山田 太郎"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
                {errors.groomName && (
                  <p className="text-xs text-red-500">{errors.groomName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">新婦のお名前</label>
                <input
                  value={draft.brideName}
                  onChange={(event) => handleChange("brideName", event.target.value)}
                  placeholder="佐藤 花子"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
                {errors.brideName && (
                  <p className="text-xs text-red-500">{errors.brideName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">
                  結婚式またはパーティーのタイトル
                </label>
                <input
                  value={draft.title}
                  onChange={(event) => handleChange("title", event.target.value)}
                  placeholder="結婚パーティー / 二次会"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink">日付</label>
                  <input
                    type="date"
                    value={draft.date}
                    onChange={(event) => handleChange("date", event.target.value)}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500">{errors.date}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink">開始時間</label>
                  <input
                    type="time"
                    value={draft.time}
                    onChange={(event) => handleChange("time", event.target.value)}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                  />
                  {errors.time && (
                    <p className="text-xs text-red-500">{errors.time}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">会場名</label>
                <input
                  value={draft.venueName}
                  onChange={(event) => handleChange("venueName", event.target.value)}
                  placeholder="表参道 ◯◯◯"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
                {errors.venueName && (
                  <p className="text-xs text-red-500">{errors.venueName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">会場住所</label>
                <input
                  value={draft.venueAddress}
                  onChange={(event) => handleChange("venueAddress", event.target.value)}
                  placeholder="東京都渋谷区〇〇〇"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
                {errors.venueAddress && (
                  <p className="text-xs text-red-500">{errors.venueAddress}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">メインメッセージ</label>
                <textarea
                  value={draft.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  placeholder="ゲストへのご案内文を入力してください。"
                  rows={4}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">
                  ドレスコード（任意）
                </label>
                <input
                  value={draft.dressCode}
                  onChange={(event) => handleChange("dressCode", event.target.value)}
                  placeholder="スマートカジュアル"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">
                  ご祝儀・会費についての説明（任意）
                </label>
                <textarea
                  value={draft.cashGiftNote}
                  onChange={(event) => handleChange("cashGiftNote", event.target.value)}
                  placeholder="当日現金／PayPayでの事前送金どちらでも大丈夫です。ご都合の良い方法でお気持ちを頂けたら嬉しいです。"
                  rows={3}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">
                  備考・お知らせ（任意）
                </label>
                <textarea
                  value={draft.notes}
                  onChange={(event) => handleChange("notes", event.target.value)}
                  placeholder="途中参加・途中退出OKなど"
                  rows={3}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handlePreview}
                className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
              >
                プレビューを見る
              </button>
              <button
                type="button"
                onClick={() => setStep("start")}
                className="flex-1 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink"
              >
                戻る
              </button>
            </div>
          </section>
        )}

        {step === "preview" && (
          <section className="space-y-6">
            <div className="text-center">
              <h1 className="font-display text-2xl text-ink">
                プレビュー &amp; URL生成
              </h1>
              <p className="mt-2 text-sm text-ink/60">
                ゲストに届く画面のイメージです。
              </p>
            </div>

            <InviteGuestView data={draft} />

            <div className="rounded-[2.5rem] border border-black/5 bg-white/80 p-6">
              <label className="text-sm font-semibold text-ink">
                招待状のリンク
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  readOnly
                  value={inviteUrl}
                  className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full bg-ink px-6 py-3 text-xs font-semibold text-white"
                >
                  {isCopied ? "コピーしました" : "URLをコピー"}
                </button>
              </div>
              <p className="mt-2 text-xs text-ink/60">
                URLはそのままLINEで送ってOKです。
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep("complete")}
                className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
              >
                この内容で公開する
              </button>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="flex-1 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink"
              >
                編集に戻る
              </button>
            </div>
          </section>
        )}

        {step === "complete" && (
          <section className="rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-10 text-center shadow-sm">
            <h1 className="font-display text-2xl text-ink">招待状が完成しました</h1>
            <p className="mt-3 text-sm text-ink/70">
              ゲストにURLをシェアしてご利用ください。
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
              >
                招待状を表示する
              </a>
              <Link
                href={`/${currentLocale}`}
                className="rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink"
              >
                トップに戻る
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
