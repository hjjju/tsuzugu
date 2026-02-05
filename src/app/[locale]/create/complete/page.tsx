"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCreateFlow } from "@/components/CreateFlowProvider";

export default function CreateCompletePage() {
  const { ensureInviteId } = useCreateFlow();
  const inviteId = ensureInviteId();
  const invitePath = useMemo(() => `/jp/invite/${inviteId}`, [inviteId]);

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
      <div className="mx-auto w-full max-w-xl rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-10 text-center shadow-sm">
        <h1 className="font-display text-2xl text-ink">招待状が完成しました</h1>
        <p className="mt-3 text-sm text-ink/70">ゲストにURLをシェアしてご利用ください。</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={invitePath}
            target="_blank"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            招待状を表示する
          </Link>
          <Link
            href="/jp"
            className="rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
