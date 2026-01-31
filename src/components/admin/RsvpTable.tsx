import type { RSVP } from "@/lib/data/rsvps";

function formatDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

type RsvpTableProps = {
  rsvps: RSVP[];
  checkedInIds: Set<string>;
};

export default function RsvpTable({ rsvps, checkedInIds }: RsvpTableProps) {
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
              {rsvp.attendance === "attend" ? "出席" : "欠席"}
            </span>
          </div>
          <div className="mt-3 grid gap-2 text-xs text-ink/70">
            <div className="flex justify-between">
              <span>同伴者</span>
              <span>{rsvp.guestsCount}名</span>
            </div>
            <div className="flex justify-between">
              <span>アレルギー</span>
              <span>{rsvp.allergyText || "なし"}</span>
            </div>
            <div className="flex justify-between">
              <span>メッセージ</span>
              <span className="text-right">{rsvp.messageToCouple || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span>回答日</span>
              <span>{formatDate(rsvp.createdAtISO)}</span>
            </div>
            <div className="flex justify-between">
              <span>チェックイン</span>
              <span>
                {checkedInIds.has(rsvp.id) ? "済" : "未"}
              </span>
            </div>
          </div>
        </div>
      ))}
      {rsvps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white/60 p-6 text-center text-sm text-ink/60">
          該当する回答がありません。
        </div>
      ) : null}
    </div>
  );
}
