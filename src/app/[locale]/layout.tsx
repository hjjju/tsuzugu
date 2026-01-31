import type { ReactNode } from "react";
import { getDictionary, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocaleHtmlLang from "@/components/LocaleHtmlLang";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const normalizedLocale = locales.includes(resolvedParams.locale as (typeof locales)[number])
    ? (resolvedParams.locale as (typeof locales)[number])
    : "ja";
  const dict = getDictionary(normalizedLocale);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LocaleHtmlLang locale={normalizedLocale} />
      <Header locale={normalizedLocale} copy={dict.header} />
      <main className="flex-1">{children}</main>
      <Footer copy={dict.footer} />
    </div>
  );
}
