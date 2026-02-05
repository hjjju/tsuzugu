"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import InviteGuestView from "@/components/InviteGuestView";
import { useCreateFlow } from "@/components/CreateFlowProvider";

export default function CreatePreviewPage() {
  const router = useRouter();
  const { draft, ensureInviteId, inviteId, saveDraftToStorage } = useCreateFlow();
  const [copied, setCopied] = useState(false);

  const id = ensureInviteId();
  const invitePath = useMemo(() => `/jp/invite/${id}`, [id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${invitePath}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handlePublish = () => {
    // Save to in-memory/session storage for MVP. Replace with DB later.
    saveDraftToStorage();
    router.push("../complete");
  };

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="font-display text-2xl text-ink">プレビュー &amp; URL生成</h1>
          <p className="mt-2 text-sm text-ink/60">ゲストに届く画面のイメージです。</p>
        </div>

        <InviteGuestView data={draft} />

        <div className="rounded-[2.5rem] border border-black/5 bg-white/80 p-6">
          <label className="text-sm font-semibold text-ink">招待状のリンク</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              readOnly
              value={`${typeof window !== "undefined" ? window.location.origin : ""}${invitePath}`}
              className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full bg-ink px-6 py-3 text-xs font-semibold text-white"
            >
              {copied ? "コピーしました" : "招待状のリンクをコピー"}
            </button>
          </div>
          <p className="mt-2 text-xs text-ink/60">URLはそのままLINEで送ってOKです。</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handlePublish}
            className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            この内容で公開する
          </button>
          <button
            type="button"
            onClick={() => router.push("../form")}
            className="flex-1 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            編集に戻る
          </button>
        </div>

        {inviteId && (
          <p className="text-center text-xs text-ink/50">作成ID: {inviteId}</p>
        )}
      </div>
    </div>
  );
}
