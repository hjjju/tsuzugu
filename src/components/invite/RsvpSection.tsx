"use client";

import { useState } from "react";
import { copyJa } from "@/lib/copy/ja";

export type RsvpFormState = {
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

type RsvpSectionProps = {
  formState: RsvpFormState;
  maxGuests: number;
  submitMessage: string | null;
  qrToken: string | null;
  onChange: <K extends keyof RsvpFormState>(
    key: K,
    value: RsvpFormState[K]
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function RsvpSection({
  formState,
  maxGuests,
  submitMessage,
  qrToken,
  onChange,
  onSubmit,
}: RsvpSectionProps) {
  const [companionName, setCompanionName] = useState("");
  const [busUsage, setBusUsage] = useState<"yes" | "no" | "">("");

  return (
    <section className="fade-in mt-6 rounded-3xl border border-black/5 bg-white/70 p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-ink">
          ご出欠（RSVP）
        </h2>
        <p className="text-sm text-ink/70">
          お手数ではございますが、◯月◯日までにご回答をお願いいたします。
        </p>
      </div>
      <form className="mt-5 space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm text-ink">氏名（姓・名）</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
              placeholder={copyJa.rsvp.labels.lastName}
              value={formState.lastName}
              onChange={(event) => onChange("lastName", event.target.value)}
              required
            />
            <input
              className="h-11 rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
              placeholder={copyJa.rsvp.labels.firstName}
              value={formState.firstName}
              onChange={(event) => onChange("firstName", event.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-ink">フリガナ</label>
          <input
            className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder={copyJa.rsvp.labels.furigana}
            value={formState.furigana}
            onChange={(event) => onChange("furigana", event.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-ink">メールアドレス</label>
          <input
            className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder={copyJa.rsvp.labels.email}
            value={formState.email}
            onChange={(event) => onChange("email", event.target.value)}
            required
            type="email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-ink">ご出席 / ご欠席</label>
          <div className="flex gap-2">
            {[
              { label: copyJa.rsvp.labels.attendanceAttend, value: "attend" },
              { label: copyJa.rsvp.labels.attendanceDecline, value: "decline" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  onChange(
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
        </div>

        <div className="space-y-2">
          <label className="text-sm text-ink">同伴者人数</label>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: maxGuests + 1 }).map((_, count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChange("guestsCount", count)}
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

        <div className="space-y-2">
          <label className="text-sm text-ink">食物アレルギーの有無・内容</label>
          <textarea
            className="min-h-[96px] w-full rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 text-sm"
            value={formState.allergyText}
            onChange={(event) => onChange("allergyText", event.target.value)}
          />
          <p className="text-xs text-ink/50">
            アレルギーや食事制限がある方は、差し支えない範囲でご記入ください。
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-ink">同伴者氏名（任意）</label>
          <input
            className="h-11 w-full rounded-2xl border border-ink/15 bg-white/70 px-3 text-sm"
            placeholder="ご同伴者様のお名前"
            value={companionName}
            onChange={(event) => setCompanionName(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-ink">送迎バスのご利用有無</label>
          <div className="flex gap-2">
            {[
              { label: "利用する", value: "yes" },
              { label: "利用しない", value: "no" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setBusUsage(option.value as "yes" | "no")}
                className={`flex h-11 flex-1 items-center justify-center rounded-full border text-sm font-medium transition-opacity duration-300 hover:opacity-80 ${
                  busUsage === option.value
                    ? "border-accent bg-accent/20 text-ink"
                    : "border-ink/20 text-ink/70"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-ink">新郎新婦へのメッセージ（任意）</label>
          <textarea
            className="min-h-[96px] w-full rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 text-sm"
            value={formState.messageToCouple}
            onChange={(event) =>
              onChange("messageToCouple", event.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
        >
          送信する
        </button>
      </form>

      <p className="mt-4 text-xs text-ink/50">
        ご回答内容は出欠確認および当日のご案内のためにのみ利用いたします。
      </p>

      {submitMessage ? (
        <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink">
          <p className="font-semibold">
            ご回答ありがとうございました。受付用QRコードをメールにてお送りしました。
          </p>
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
  );
}
