import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const tagline = hasLocale(lang) ? getDict(lang).meta.tagline : "";
  return {
    title: { default: `${site.name} · ${tagline}`, template: `%s · ${site.name}` },
    description: tagline,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang).nav;
  const link = (path: string) => `/${lang}${path}`;

  return (
    <html lang={lang}>
      <body>
        <header className="header">
          <div className="wrap header-inner">
            <Link href={link("")} className="logo">{site.name}</Link>
            <nav className="nav">
              <Link href={link("/buyers")}>{t.buyers}</Link>
              <Link href={link("/sellers")}>{t.sellers}</Link>
              <Link href={link("/catalog")}>{t.catalog}</Link>
              <Link href={link("/build-on")}>{t.buildOn}</Link>
              <Link href={link("/faq")}>{t.faq}</Link>
            </nav>
            <LanguageSwitch current={lang} label={t.language} />
          </div>
        </header>
        <main className="wrap main">{children}</main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>{site.name}</span>
            <Link href={link("/credits")}>{t.credits}</Link>
            <Link href={link("/terms")}>{t.terms}</Link>
            <Link href={link("/privacy")}>{t.privacy}</Link>
            <Link href={link("/contact")}>{t.contact}</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
