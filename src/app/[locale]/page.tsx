import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

export const runtime = "edge";

export default function LocaleHomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="bg-[#f9f8f6]">
      <section className="fade-in relative overflow-hidden px-4 pb-16 pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fff7ea,transparent_60%)]" />
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <p className="font-display text-3xl text-ink">{dict.home.heroTitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            {dict.home.heroSubtitle}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
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
        </div>
      </section>

      <section className="tsz-section px-4 pb-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl text-ink">
              {dict.home.featureTitle}
            </h2>
            <p className="text-sm text-ink/60">{dict.home.featureSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="tsz-card p-6">
              <h3 className="font-display text-lg text-ink">
                {dict.home.feature1Title}
              </h3>
              <p className="mt-3 text-sm text-ink/70">
                {dict.home.feature1Desc}
              </p>
            </div>
            <div className="tsz-card p-6">
              <h3 className="font-display text-lg text-ink">
                {dict.home.feature2Title}
              </h3>
              <p className="mt-3 text-sm text-ink/70">
                {dict.home.feature2Desc}
              </p>
            </div>
            <div className="tsz-card p-6">
              <h3 className="font-display text-lg text-ink">
                {dict.home.feature3Title}
              </h3>
              <p className="mt-3 text-sm text-ink/70">
                {dict.home.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tsz-section px-4 pb-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl text-ink">
              {dict.home.templatesTitle}
            </h2>
            <p className="text-sm text-ink/60">
              {dict.home.templatesSubtitle}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { tag: dict.home.templateClassic, image: "/images/invite/sample/hero.jpg" },
              { tag: dict.home.templateNature, image: "/images/invite/sample/gallery-01.jpg" },
              { tag: dict.home.templateModern, image: "/images/invite/sample/gallery-02.jpg" },
            ].map((item) => (
              <div
                key={item.tag}
                className="group overflow-hidden rounded-3xl border border-black/5 bg-white"
              >
                <div
                  className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex items-center justify-between px-4 py-4 text-sm">
                  <span className="rounded-full bg-black/5 px-3 py-1">
                    {item.tag}
                  </span>
                  <span className="text-ink/60">{dict.home.templateView}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
