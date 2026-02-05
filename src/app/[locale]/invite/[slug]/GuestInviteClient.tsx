"use client";

import { useEffect, useState } from "react";
import InviteGuestView, { type InvitationDraft } from "@/components/InviteGuestView";

export default function GuestInviteClient({
  slug,
  encodedData,
}: {
  slug: string;
  encodedData?: string;
}) {
  const [inviteData, setInviteData] = useState<InvitationDraft | null>(null);

  useEffect(() => {
    if (encodedData) {
      try {
        const json = decodeURIComponent(escape(atob(encodedData)));
        setInviteData(JSON.parse(json) as InvitationDraft);
        return;
      } catch {
        setInviteData(null);
        return;
      }
    }

    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem(`tsz-invite-${slug}`);
      if (stored) {
        try {
          setInviteData(JSON.parse(stored) as InvitationDraft);
          return;
        } catch {
          setInviteData(null);
        }
      }
    }
  }, [encodedData, slug]);

  if (!inviteData) {
    return (
      <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
        <div className="mx-auto w-full max-w-md rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-10 text-center shadow-sm">
          <h1 className="font-display text-2xl text-ink">招待状の読み込みに失敗しました</h1>
          <p className="mt-3 text-sm text-ink/70">
            URLが正しいか、作成した端末で開いているかをご確認ください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
      <InviteGuestView data={inviteData} />
    </div>
  );
}
