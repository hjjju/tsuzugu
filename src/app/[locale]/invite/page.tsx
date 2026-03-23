import { Suspense } from "react";
import { getDictionary, locales } from "@/lib/i18n";
import InvitePageClient from "./InvitePageClient";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const normalizedLocale = locales.includes(
    resolvedParams.locale as (typeof locales)[number]
  )
    ? (resolvedParams.locale as (typeof locales)[number])
    : "jp";
  const dict = getDictionary(normalizedLocale).invite;
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
