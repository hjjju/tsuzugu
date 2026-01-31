"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";

type LocaleSwitcherProps = {
  current: string;
};

export default function LocaleSwitcher({ current }: LocaleSwitcherProps) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");
  const active = locales.includes(current as (typeof locales)[number])
    ? current
    : "jp";

  return (
    <div className="flex items-center gap-2 text-xs text-ink/60">
      {locales.map((locale) => {
        const nextSegments = [...segments];
        nextSegments[1] = locale;
        const href = nextSegments.join("/") || `/${locale}`;
        return (
          <Link
            key={locale}
            href={href}
            className={`rounded-full border px-2 py-1 ${
              active === locale
                ? "border-accent bg-accent/20 text-ink"
                : "border-ink/20"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
