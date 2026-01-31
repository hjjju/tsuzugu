import Link from "next/link";
import { invitations } from "@/data/invitations";

export default function Home() {
  const featured = invitations[0];

  if (!featured) {
    return null;
  }
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 pt-10">
      <section className="fade-in space-y-6 rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Mobile Wedding Invitation
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-ink">
            想いをつづり、縁をつなぐ。
          </h1>
          <p className="text-sm leading-relaxed text-ink/70">
            Tsuzugu は、スマホだけで完結する和の招待状サービス。二人の物語
            と、ゲストへの感謝を上品に届けます。
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/create"
            className="flex h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
          >
            招待状を作る
          </Link>
          <Link
            href="/templates"
            className="flex h-11 items-center justify-center rounded-full border border-ink/20 bg-white/70 px-5 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
          >
            テンプレートを見る
          </Link>
        </div>
      </section>

      <section className="fade-in mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-ink">特長</h2>
        <div className="grid gap-4">
          {[
            {
              title: "スマホで完結",
              text: "作成・共有・出欠管理までワンストップ。",
            },
            {
              title: "和のミニマルデザイン",
              text: "余白と素材感で上質な印象に。",
            },
            {
              title: "支払いにも対応",
              text: "ご祝儀は PayPay でスマートに。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/5 bg-white/60 p-4"
            >
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-ink/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in mt-10 space-y-4 rounded-3xl border border-black/5 bg-white/70 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">今月の招待状</h2>
          <span className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink/60">
            サンプル
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-ink">{featured.couple}</p>
          <p className="text-sm text-ink/70">{featured.date}</p>
          <p className="text-sm text-ink/70">{featured.venue}</p>
        </div>
        <Link
          href={`/invite/${featured.slug}`}
          className="inline-flex h-11 w-full items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
        >
          招待状を開く
        </Link>
      </section>
    </div>
  );
}
