import Link from "next/link";

const steps = [
  {
    title: "基本情報",
    text: "お名前・挙式日・会場を入力します。",
  },
  {
    title: "デザイン",
    text: "テンプレートとアクセントを選択。",
  },
  {
    title: "共有",
    text: "ゲストにLINEやURLで送付。",
  },
];

export default function CreatePage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 pt-8">
      <section className="fade-in space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
          Create
        </p>
        <h1 className="text-2xl font-semibold text-ink">招待状を作る</h1>
        <p className="text-sm text-ink/70">
          3分で完成。必要な情報だけを丁寧に。
        </p>
      </section>

      <section className="fade-in mt-6 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-3xl border border-black/5 bg-white/70 p-5"
          >
            <p className="text-xs text-ink/50">STEP {index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">
              {step.title}
            </h2>
            <p className="mt-2 text-sm text-ink/70">{step.text}</p>
          </div>
        ))}
      </section>

      <section className="fade-in mt-8 rounded-3xl border border-black/5 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-ink">入力プレビュー</h2>
        <div className="mt-4 space-y-3 text-sm text-ink/70">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
              Couple
            </p>
            <p className="text-base font-semibold text-ink">陽菜 & 健人</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
              Date
            </p>
            <p>2026年7月12日 (日) 15:00</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
              Venue
            </p>
            <p>代官山 Hillside Chapel</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-80"
          >
            続きを入力する
          </button>
          <Link
            href="/templates"
            className="flex h-11 w-full items-center justify-center rounded-full border border-ink/15 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-80"
          >
            テンプレートを選ぶ
          </Link>
        </div>
      </section>
    </div>
  );
}
