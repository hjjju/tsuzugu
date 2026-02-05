"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateFlow } from "@/components/CreateFlowProvider";

const requiredFields: Array<keyof ReturnType<typeof useCreateFlow>["draft"]> = [
  "groomName",
  "brideName",
  "title",
  "date",
  "time",
  "venueName",
  "venueAddress",
  "message",
];

type FieldErrors = Partial<Record<keyof ReturnType<typeof useCreateFlow>["draft"], string>>;

export default function CreateFormPage() {
  const router = useRouter();
  const { draft, updateField } = useCreateFlow();
  const [errors, setErrors] = useState<FieldErrors>({});

  const stepsNote = useMemo(
    () => "この招待状では、後から出欠やアレルギーなどの回答を受け取れます。",
    []
  );

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

  const handleSubmit = () => {
    if (!validate()) return;
    router.push("../preview");
  };

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
      <div className="mx-auto w-full max-w-xl space-y-6">
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
              onChange={(event) => updateField("groomName", event.target.value)}
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
              onChange={(event) => updateField("brideName", event.target.value)}
              placeholder="佐藤 花子"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />
            {errors.brideName && (
              <p className="text-xs text-red-500">{errors.brideName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">タイトル</label>
            <input
              value={draft.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="結婚パーティー / 二次会"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink">日付</label>
              <input
                type="date"
                value={draft.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
              />
              {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink">開始時間</label>
              <input
                type="time"
                value={draft.time}
                onChange={(event) => updateField("time", event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
              />
              {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">会場名</label>
            <input
              value={draft.venueName}
              onChange={(event) => updateField("venueName", event.target.value)}
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
              onChange={(event) => updateField("venueAddress", event.target.value)}
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
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="ゲストへのご案内文を入力してください。"
              rows={4}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">ドレスコード（任意）</label>
            <input
              value={draft.dressCode}
              onChange={(event) => updateField("dressCode", event.target.value)}
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
              onChange={(event) => updateField("cashGiftNote", event.target.value)}
              placeholder="当日現金でも、事前にPayPayでの送金でも大丈夫です。ご都合の良い方法でお気持ちを頂けたら嬉しいです。"
              rows={3}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />
            <p className="text-xs text-ink/50">
              当日現金でもOK、PayPay/銀行振込は任意で選べます。
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">備考・お知らせ（任意）</label>
            <textarea
              value={draft.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="途中参加・途中退出OKなど"
              rows={3}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="rounded-2xl border border-ink/10 bg-ink/5 px-4 py-3 text-xs text-ink/70">
            {stepsNote}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            プレビューを見る
          </button>
          <button
            type="button"
            onClick={() => router.push("/jp/create")}
            className="flex-1 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}
