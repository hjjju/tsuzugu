import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

export const runtime = "edge";

export default function LocaleHomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const features = [
    {
      title: dict.home.feature1Title,
      description: dict.home.feature1Desc,
    },
    {
      title: dict.home.feature2Title,
      description: dict.home.feature2Desc,
    },
    {
      title: dict.home.feature3Title,
      description: dict.home.feature3Desc,
    },
    {
      title: dict.home.feature4Title,
      description: dict.home.feature4Desc,
    },
  ];
  const templates = [
    {
      title: dict.home.template1Title,
      description: dict.home.template1Desc,
    },
    {
      title: dict.home.template2Title,
      description: dict.home.template2Desc,
    },
    {
      title: dict.home.template3Title,
      description: dict.home.template3Desc,
    },
    {
      title: dict.home.template4Title,
      description: dict.home.template4Desc,
    },
  ];
  const templateGradients = [
    "linear-gradient(135deg, #f9e9e3, #f3f6f8)",
    "linear-gradient(135deg, #f5f1e8, #f0f4f7)",
    "linear-gradient(135deg, #edf2f6, #f7efe9)",
    "linear-gradient(135deg, #f6ece9, #f2f5ee)",
  ];
  const steps = [
    { title: dict.home.step1Title, description: dict.home.step1Desc },
    { title: dict.home.step2Title, description: dict.home.step2Desc },
    { title: dict.home.step3Title, description: dict.home.step3Desc },
  ];
  const faqs = [
    { q: dict.home.faq1Q, a: dict.home.faq1A },
    { q: dict.home.faq2Q, a: dict.home.faq2A },
    { q: dict.home.faq3Q, a: dict.home.faq3A },
    { q: dict.home.faq4Q, a: dict.home.faq4A },
    { q: dict.home.faq5Q, a: dict.home.faq5A },
  ];

  return (
    <div className="bg-[#f9f8f6]">
      <header className="fade-in relative overflow-hidden px-4 pb-16 pt-10 sm:pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fff6ef,transparent_60%)]" />
        <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-[#f3e6df] blur-3xl motion-safe:animate-[drift_16s_ease-in-out_infinite]" />
        <div className="absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-[#e9f1f4] blur-3xl motion-safe:animate-[drift_18s_ease-in-out_infinite]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-96px)] w-full max-w-6xl flex-col items-center gap-10 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="w-full max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              {dict.home.heroKicker}
            </p>
            <h1 className="mt-4 font-display text-3xl leading-snug text-ink sm:text-4xl lg:text-5xl">
              {dict.home.heroTitle}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
              {dict.home.heroSubtitle}
            </p>
            <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/${params.locale}/create`}
                className="tsz-button-primary w-full sm:w-auto"
              >
                {dict.home.heroPrimary}
              </Link>
              <Link
                href={`/${params.locale}/templates`}
                className="tsz-button-secondary w-full sm:w-auto"
              >
                {dict.home.heroSecondary}
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink/60">{dict.home.heroNote}</p>
          </div>
          <div className="w-full max-w-sm sm:max-w-md">
            <div className="relative mx-auto w-[280px] sm:w-[320px]">
              <div className="absolute -inset-6 rounded-[3rem] bg-white/70 blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <div className="relative aspect-[9/19] overflow-hidden">
                  {/* TODO: Replace with real hero image or mock invitation screenshot */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg,#f7ede9,transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/80 p-4 text-left backdrop-blur">
                    <p className="text-xs text-ink/60">Shun & Haruka</p>
                    <p className="mt-1 font-display text-base text-ink">
                      ご招待状
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink/70">
                      2026.10.12 Sat · 17:00
                      <br />
                      Tokyo Bay Hall
                    </p>
                  </div>
                </div>
                <div className="space-y-3 px-5 py-6 text-left">
                  <div className="rounded-full bg-ink/5 px-3 py-1 text-[11px] text-ink/60">
                    出欠 / 地図 / メッセージ
                  </div>
                  <p className="text-xs text-ink/70">
                    スクロールで写真とストーリーを美しく表示。ゲストも迷わず読めます。
                  </p>
                  <button
                    type="button"
                    className="h-10 w-full rounded-full bg-ink text-xs font-semibold text-white"
                  >
                    出欠の回答
                  </button>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-6 top-10 h-10 w-10 rounded-full bg-white/70 shadow-sm motion-safe:animate-[float_7s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </header>

      <section className="tsz-section px-4 pb-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {dict.home.featureTitle}
            </h2>
            <p className="text-sm text-ink/60 sm:text-base">
              {dict.home.featureSubtitle}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="tsz-card p-6 text-left">
                <div className="mb-4 h-10 w-10 rounded-2xl bg-ink/5" aria-hidden />
                <h3 className="font-display text-lg text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tsz-section px-4 pb-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {dict.home.templatesTitle}
            </h2>
            <p className="text-sm text-ink/60 sm:text-base">
              {dict.home.templatesSubtitle}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template, index) => (
              <Link
                key={template.title}
                href={`/${params.locale}/templates`}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white"
              >
                <div className="relative h-44 overflow-hidden">
                  {/* TODO: Replace with real template thumbnail */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: templateGradients[index],
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_40%,rgba(0,0,0,0.15))]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-ink">
                      {dict.home.templateView}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 px-4 py-4 text-left">
                  <p className="text-sm font-semibold text-ink">{template.title}</p>
                  <p className="text-xs text-ink/60">{template.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tsz-section px-4 pb-16">
        <div className="mx-auto w-full max-w-5xl rounded-[2.5rem] border border-black/5 bg-white/70 px-6 py-10 text-center backdrop-blur sm:px-10">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            {dict.home.stepsTitle}
          </h2>
          <p className="mt-2 text-sm text-ink/60 sm:text-base">
            {dict.home.stepsSubtitle}
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white px-5 py-6 text-left shadow-sm">
                <span className="text-xs font-semibold text-ink/50">
                  STEP {index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tsz-section px-4 pb-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {dict.home.priceTitle}
            </h2>
            <p className="text-sm text-ink/60 sm:text-base">
              {dict.home.priceSubtitle}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="tsz-card p-7 text-left">
              <p className="text-sm font-semibold text-ink/70">
                {dict.home.priceFreeTitle}
              </p>
              <p className="mt-3 text-3xl font-semibold text-ink">
                {dict.home.priceFreePrice}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink/70">
                <li>• {dict.home.priceFreeDesc1}</li>
                <li>• {dict.home.priceFreeDesc2}</li>
                <li>• {dict.home.priceFreeDesc3}</li>
              </ul>
            </div>
            <div className="tsz-card p-7 text-left">
              <p className="text-sm font-semibold text-ink/70">
                {dict.home.pricePaidTitle}
              </p>
              <p className="mt-3 text-3xl font-semibold text-ink">
                {dict.home.pricePaidPrice}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink/70">
                <li>• {dict.home.pricePaidDesc1}</li>
                <li>• {dict.home.pricePaidDesc2}</li>
                <li>• {dict.home.pricePaidDesc3}</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink/50">
            {dict.home.priceNote}
          </p>
        </div>
      </section>

      <section className="tsz-section px-4 pb-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {dict.home.faqTitle}
            </h2>
          </div>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-3xl border border-black/5 bg-white/80 px-6 py-5"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto w-full max-w-5xl rounded-[2.5rem] bg-ink px-6 py-12 text-center text-white sm:px-10">
          <h2 className="font-display text-2xl sm:text-3xl">
            {dict.home.ctaTitle}
          </h2>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            {dict.home.ctaSubtitle}
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href={`/${params.locale}/create`}
              className="flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-ink"
            >
              {dict.home.ctaPrimary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
