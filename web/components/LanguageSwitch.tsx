"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, type Locale } from "@/lib/i18n";

// Links to the same page in each other language.
export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");

  return (
    <div className="lang-switch" aria-label={label}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest}`}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </div>
  );
}
