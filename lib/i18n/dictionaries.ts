import type { Locale } from "./config"
import en from "./translations/en"
import tr from "./translations/tr"
import de from "./translations/de"
import ru from "./translations/ru"
import pl from "./translations/pl"

const dictionaries = {
  en,
  tr,
  de,
  ru,
  pl,
}

export type Dictionary = typeof en

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]
}
