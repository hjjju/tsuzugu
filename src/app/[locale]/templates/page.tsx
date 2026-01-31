import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

const templateCards = [
  {
    key: "classic",
    image: "/images/invite/sample/hero.jpg",
  },
  {
    key: "nature",
    image: "/images/invite/sample/gallery-01.jpg",
  },
  {
    key: "modern",
    image: "/images/invite/sample/gallery-02.jpg",
  },
];

export default function TemplatesPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const tags = [
    dict.home.templateClassic,
    dict.home.templateNature,
    dict.home.templateModern,
  ];

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-12">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="font-display text-2xl text-ink">{dict.templates.title}</h1>
          <p className="text-sm text-ink/60">{dict.templates.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {templateCards.map((card, index) => (
            <div key={card.key} className="tsz-card overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="space-y-3 p-4">
                <span className="inline-flex rounded-full bg-black/5 px-3 py-1 text-xs text-ink/70">
                  {tags[index]}
                </span>
                <Link
                  href={`/${params.locale}/create`}
                  className="tsz-button-secondary w-full"
                >
                  {dict.templates.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
