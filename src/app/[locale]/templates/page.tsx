import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

const templateCards = [
  {
    key: "romantic",
    gradient: "linear-gradient(135deg, #f9e9e3, #f3f6f8)",
  },
  {
    key: "minimal",
    gradient: "linear-gradient(135deg, #f5f1e8, #f0f4f7)",
  },
  {
    key: "modern",
    gradient: "linear-gradient(135deg, #edf2f6, #f7efe9)",
  },
  {
    key: "japanese-modern",
    gradient: "linear-gradient(135deg, #f6ece9, #f2f5ee)",
  },
];

export default function TemplatesPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const tags = [
    dict.home.template1Title,
    dict.home.template2Title,
    dict.home.template3Title,
    dict.home.template4Title,
  ];

  return (
    <div className="bg-[#f9f8f6] px-4 pb-16 pt-12">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="font-display text-2xl text-ink">{dict.templates.title}</h1>
          <p className="text-sm text-ink/60">{dict.templates.subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {templateCards.map((card, index) => (
            <div key={card.key} className="tsz-card overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: card.gradient }}
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
