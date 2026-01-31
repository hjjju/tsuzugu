import Link from "next/link";
import { invitations } from "@/data/invitations";

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
      <section className="fade-in space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Admin</p>
        <h1 className="text-2xl font-semibold text-ink">招待状の管理</h1>
        <p className="text-sm text-ink/70">
          出欠状況や共有リンクを確認できます。
        </p>
      </section>

      <section className="fade-in mt-6 grid gap-4">
        {invitations.map((invite) => (
          <div
            key={invite.slug}
            className="rounded-3xl border border-black/5 bg-white/70 p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">
                {invite.couple}
              </h2>
              <span className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink/60">
                {invite.template}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink/70">{invite.date}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-ink/60">参加 {invite.rsvp.attending}</span>
              <span className="text-ink/60">未回答 {invite.rsvp.awaiting}</span>
            </div>
            <div className="mt-4 flex gap-3">
              <Link
                href={`/invite/${invite.slug}`}
                className="flex h-11 flex-1 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
              >
                招待状を見る
              </Link>
              <button
                type="button"
                className="flex h-11 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
              >
                共有
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
