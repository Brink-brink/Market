import en, { type Dict } from "./dict/en";
import sv from "./dict/sv";

export const locales = ["en", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "English", sv: "Svenska" };

const dictionaries: Record<Locale, Dict> = { en, sv };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDict = (locale: Locale): Dict => dictionaries[locale];

// Fills {name} placeholders in a dictionary string.
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

export type { Dict };
