import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import Navbar from "@/components/navbar"
import ResidencesSection from "@/components/residences-section"
import Footer from "@/components/footer"

export default async function ResidencesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <main className="min-h-screen">
      <Navbar dict={dict} locale={locale} />
      <div className="pt-20">
        <ResidencesSection dict={dict} locale={locale} />
      </div>
      <Footer dict={dict} locale={locale} />
    </main>
  )
}
