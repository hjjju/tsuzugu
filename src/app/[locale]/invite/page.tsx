import { Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import InvitePageClient from "./InvitePageClient";

export default function InvitePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale).invite;
  return (
    <Suspense
      fallback={
        <div className="bg-[#f9f8f6] px-4 pb-16 pt-10">
          <div className="mx-auto w-full max-w-md rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-10 text-center shadow-sm">
            <p className="text-sm text-ink/70">{dict.inviteLoading}</p>
          </div>
        </div>
      }
    >
      <InvitePageClient />
    </Suspense>
  );
}
