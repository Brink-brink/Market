import { notFound } from "next/navigation";
import { getDict, hasLocale } from "./i18n";

// Resolves the locale and dictionary for a page under app/[lang].
export async function pageContext(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, t: getDict(lang), link: (path: string) => `/${lang}${path}` };
}
