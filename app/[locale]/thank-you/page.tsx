import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import ThankYouContent from "./thank-you-content"

export default async function ThankYouPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return <ThankYouContent dict={dict} locale={locale} />
}
