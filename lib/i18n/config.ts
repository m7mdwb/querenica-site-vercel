export const locales = ["en", "tr", "de", "ru", "pl"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  ru: "Русский",
  pl: "Polski",
}

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  tr: "🇹🇷",
  de: "🇩🇪",
  ru: "🇷🇺",
  pl: "🇵🇱",
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
