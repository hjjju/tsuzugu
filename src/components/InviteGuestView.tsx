import React from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export type InvitationDraft = {
  groomName: string;
  brideName: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  message: string;
  dressCode?: string;
  cashGiftNote?: string;
  notes?: string;
};

function formatDateLabel(date: string) {
  if (!date) return "";
  return date.replaceAll("-", ".");
}

export default function InviteGuestView({
  data,
  locale,
  copy,
}: {
  data: InvitationDraft;
  locale?: Locale;
  copy?: ReturnType<typeof getDictionary>["invite"];
}) {
  const dict = copy ?? getDictionary(locale ?? "jp").invite;
  const dateLabel = formatDateLabel(data.date);
  const timeLabel = data.time ? ` ${data.time}` : "";

  return (
    <div className="mx-auto w-full max-w-md space-y-10">
      <section className="rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          {data.title || dict.titleFallback}
        </p>
        <h1 className="mt-4 font-display text-3xl text-ink">
          {data.groomName} &amp; {data.brideName}
        </h1>
        <p className="mt-3 text-sm text-ink/70">
          {dateLabel}
          {timeLabel}
        </p>
      </section>

      <section className="rounded-[2rem] border border-black/5 bg-white/80 px-6 py-6">
        <h2 className="font-display text-lg text-ink">{dict.scheduleTitle}</h2>
        <dl className="mt-4 space-y-3 text-sm text-ink/70">
          <div>
            <dt className="text-xs font-semibold text-ink/50">{dict.dateLabel}</dt>
            <dd className="mt-1">
              {dateLabel}
              {timeLabel}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-ink/50">{dict.venueLabel}</dt>
            <dd className="mt-1">{data.venueName}</dd>
            <dd className="text-xs text-ink/60">{data.venueAddress}</dd>
          </div>
          {data.dressCode ? (
            <div>
              <dt className="text-xs font-semibold text-ink/50">
                {dict.dressCodeLabel}
              </dt>
              <dd className="mt-1">{data.dressCode}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="rounded-[2rem] border border-black/5 bg-white/80 px-6 py-6">
        <h2 className="font-display text-lg text-ink">{dict.messageTitle}</h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/70">
          {data.message}
        </p>
      </section>

      {data.cashGiftNote ? (
        <section className="rounded-[2rem] border border-black/5 bg-white/80 px-6 py-6">
          <h2 className="font-display text-lg text-ink">{dict.cashGiftTitle}</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/70">
            {data.cashGiftNote}
          </p>
        </section>
      ) : null}

      {data.notes ? (
        <section className="rounded-[2rem] border border-black/5 bg-white/80 px-6 py-6">
          <h2 className="font-display text-lg text-ink">{dict.notesTitle}</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/70">
            {data.notes}
          </p>
        </section>
      ) : null}

      <footer className="pb-8 text-center text-xs text-ink/50">
        {dict.footerNote}
      </footer>
    </div>
  );
}
