import React from "react";

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

export default function InviteGuestView({ data }: { data: InvitationDraft }) {
  const dateLabel = formatDateLabel(data.date);
  const timeLabel = data.time ? ` ${data.time}` : "";

  return (
    <div className="mx-auto w-full max-w-md space-y-10">
      <section className="rounded-[2.5rem] border border-black/5 bg-white/80 px-6 py-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          {data.title || "Wedding Party"}
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
        <h2 className="font-display text-lg text-ink">イベント詳細</h2>
        <dl className="mt-4 space-y-3 text-sm text-ink/70">
          <div>
            <dt className="text-xs font-semibold text-ink/50">日時</dt>
            <dd className="mt-1">
              {dateLabel}
              {timeLabel}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-ink/50">会場</dt>
            <dd className="mt-1">{data.venueName}</dd>
            <dd className="text-xs text-ink/60">{data.venueAddress}</dd>
          </div>
          {data.dressCode ? (
            <div>
              <dt className="text-xs font-semibold text-ink/50">ドレスコード</dt>
              <dd className="mt-1">{data.dressCode}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="rounded-[2rem] border border-black/5 bg-white/80 px-6 py-6">
        <h2 className="font-display text-lg text-ink">メッセージ</h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/70">
          {data.message}
        </p>
      </section>

      {data.cashGiftNote ? (
        <section className="rounded-[2rem] border border-black/5 bg-white/80 px-6 py-6">
          <h2 className="font-display text-lg text-ink">ご祝儀・会費について</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/70">
            {data.cashGiftNote}
          </p>
        </section>
      ) : null}

      {data.notes ? (
        <section className="rounded-[2rem] border border-black/5 bg-white/80 px-6 py-6">
          <h2 className="font-display text-lg text-ink">備考</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/70">
            {data.notes}
          </p>
        </section>
      ) : null}

      <footer className="pb-8 text-center text-xs text-ink/50">
        この招待状は Tsuzugu のWeb招待状サービスで作成されています。
      </footer>
    </div>
  );
}
