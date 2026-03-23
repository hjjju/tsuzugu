"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import InviteGuestView, { type InvitationDraft } from "@/components/InviteGuestView";
import { getDictionary, locales } from "@/lib/i18n";

function decodeInvitationData(encoded: string): InvitationDraft | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json) as InvitationDraft;
  } catch {
    return null;
  }
}

export default function GuestInviteClient({
  inviteId,
  encodedData,
}: {
  inviteId?: string;
  encodedData?: string;
}) {
  const [inviteData, setInviteData] = useState<InvitationDraft | null>(null);
  const pathname = usePathname() || "/";
  const locale = useMemo(() => {
    const segment = pathname.split("/")[1];
    return locales.includes(segment as (typeof locales)[number])
      ? (segment as (typeof locales)[number])
      : "jp";
  }, [pathname]);
  const dict = getDictionary(locale).invite;

  useEffect(() => {
    if (encodedData) {
      setInviteData(decodeInvitationData(encodedData));
      return;
    }

    if (typeof window !== "undefined" && inviteId) {
      const stored = window.sessionStorage.getItem(`tsz-invite-${inviteId}`);
      if (stored) {
        try {
          setInviteData(JSON.parse(stored) as InvitationDraft);
          return;
        } catch {
          setInviteData(null);
        }
      }
    }
  }, [encodedData, inviteId]);

  if (!inviteData) {
    return (
      <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
        <div className="mx-auto w-full max-w-md rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-10 text-center shadow-sm">
          <h1 className="font-display text-2xl text-ink">
            {dict.inviteLoadErrorTitle}
          </h1>
          <p className="mt-3 text-sm text-ink/70">{dict.inviteLoadErrorBody}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
      <InviteGuestView data={inviteData} locale={locale} copy={dict} />
    </div>
  );
}
