import type { RSVP } from "@/lib/data/rsvps";
import type { Locale } from "@/lib/i18n";

function formatDate(iso: string, locale: Locale) {
  const date = new Date(iso);
  const intlLocale = locale === "ko" ? "ko-KR" : locale === "en" ? "en-US" : "ja-JP";
  return new Intl.DateTimeFormat(intlLocale, {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

type RsvpTableProps = {
  rsvps: RSVP[];
  checkedInIds: Set<string>;
  locale: Locale;
  labels: {
    attend: string;
    decline: string;
    companion: string;
    guestsUnit: string;
    allergy: string;
    message: string;
    email: string;
    phone: string;
    createdAt: string;
    checkIn: string;
    checkInDone: string;
    checkInPending: string;
    noData: string;
  };
};

export default function RsvpTable({
  rsvps,
  checkedInIds,
  locale,
  labels,
}: RsvpTableProps) {
  return (
    <div className="space-y-3">
      {rsvps.map((rsvp) => (
        <div
          key={rsvp.id}
          className="rounded-2xl border border-black/5 bg-white/70 p-4 text-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-ink">
                {rsvp.lastName} {rsvp.firstName}
              </p>
              <p className="text-xs text-ink/60">{rsvp.furigana}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                rsvp.attendance === "attend"
                  ? "bg-accent/20 text-ink"
                  : "bg-ink/10 text-ink/60"
              }`}
            >
              {rsvp.attendance === "attend" ? labels.attend : labels.decline}
            </span>
          </div>
          <div className="mt-3 grid gap-2 text-xs text-ink/70">
            <div className="flex justify-between">
              <span>{labels.companion}</span>
              <span>
                {rsvp.guestsCount}
                {labels.guestsUnit}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{labels.allergy}</span>
              <span>{rsvp.allergyText || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span>{labels.message}</span>
              <span className="text-right">{rsvp.messageToCouple || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span>{labels.createdAt}</span>
              <span>{formatDate(rsvp.createdAtISO, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span>{labels.checkIn}</span>
              <span>
                {checkedInIds.has(rsvp.id)
                  ? labels.checkInDone
                  : labels.checkInPending}
              </span>
            </div>
          </div>
        </div>
      ))}
      {rsvps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white/60 p-6 text-center text-sm text-ink/60">
          {labels.noData}
        </div>
      ) : null}
    </div>
  );
}
