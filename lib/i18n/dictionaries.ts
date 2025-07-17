import "server-only"

/**
 * Lazy-load the translation object for the requested locale.
 * If a locale is not found, we fall back to English.
 */
const loaders = {
  en: () => import("./translations/en").then((m) => m.default),
  tr: () => import("./translations/tr").then((m) => m.default),
  de: () => import("./translations/de").then((m) => m.default),
  ru: () => import("./translations/ru").then((m) => m.default),
} as const

export type SupportedLocale = keyof typeof loaders

/**
 * getDictionary loads and returns the flattened dictionary for a locale.
 * Usage: const dict = await getDictionary('tr')
 */
export async function getDictionary(locale: SupportedLocale | string): Promise<Record<string, string>> {
  const loader = loaders[locale as SupportedLocale] ?? loaders.en // fallback to English
  return loader()
}
