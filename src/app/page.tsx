import Link from "next/link";
import { invitations } from "@/data/invitations";

const features = [
  {
    title: "感性デザイン",
    description:
      "韓国の洗練されたデザインをもとに、お二人だけの特別なウェブ招待状を作成できます。",
  },
  {
    title: "スマートRSVP",
    description:
      "出欠確認はもちろん、アレルギー情報や同伴者管理まで。回答結果は一覧で確認できます。",
  },
  {
    title: "手数料0円の事前決済",
    description:
      "PayPay連携により、安心・安全に事前のご祝儀受付が可能です。",
  },
];

const templates = [
  {
    title: "Classic",
    tag: "クラシック",
    image: "/images/invite/sample/hero.jpg",
  },
  {
    title: "Nature",
    tag: "ナチュラル",
    image: "/images/invite/sample/gallery-01.jpg",
  },
  {
    title: "Modern",
    tag: "モダン",
    image: "/images/invite/sample/gallery-02.jpg",
  },
];

export default function Home() {
  const featured = invitations[0];

  if (!featured) {
    return null;
  }

  return (
    <div className="tsz-page pb-12 pt-10">
      <section className="fade-in relative overflow-hidden rounded-[36px] border border-black/5 bg-[radial-gradient(circle_at_top,_#f6efe6,_#f9f8f6_55%)] p-7 shadow-sm">
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-ink/50">
            Tsuzugu
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-ink">
            「想いをつづり、縁をつなぐ。」
          </h1>
          <p className="text-sm leading-relaxed text-ink/70">
            日本の礼儀と、韓国の感性をかけ合わせたウェディング招待状サービス
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/create" className="tsz-button-primary">
              無料で招待状を作成
            </Link>
            <Link
              href="/invite/demo"
              className="tsz-button-secondary"
            >
              サンプルを見る
            </Link>
          </div>
        </div>
      </section>

      <section className="fade-in tsz-section space-y-5">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-ink">特長</h2>
          <p className="mt-2 text-sm text-ink/60">
            丁寧でわかりやすいUX設計と、上質なデザインをご用意しました。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((item) => (
            <div key={item.title} className="tsz-card p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-xs text-ink/60">
                ✦
              </div>
              <p className="mt-4 text-sm font-semibold text-ink">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in tsz-section">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-ink/50">
              Templates
            </p>
            <h2 className="mt-2 text-lg font-semibold text-ink">
              招待状テンプレート
            </h2>
          </div>
          <Link href="/templates" className="text-xs font-medium text-ink/70">
            すべて見る
          </Link>
        </div>
        <div className="grid gap-4">
          {templates.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-white/70 shadow-sm"
            >
              <div
                className="h-44 bg-ink/10"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {item.title}
                  </p>
                  <span className="mt-2 inline-flex tsz-chip">
                    {item.tag}
                  </span>
                </div>
                <Link
                  href="/invite/demo"
                  className="rounded-full border border-ink/20 px-4 py-2 text-xs text-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  詳しく見る
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in tsz-section rounded-[28px] border border-black/5 bg-white/70 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">今月の招待状</h2>
          <span className="tsz-chip">
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
