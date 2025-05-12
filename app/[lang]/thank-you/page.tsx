import ThankYouClientPage from "./client-page"
import type { Metadata } from "next"
import { siteConfig } from "../../metadata-config"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang

  const titles = {
    en: "Thank You - Querencia",
    tr: "Teşekkürler - Querencia",
    de: "Vielen Dank - Querencia",
    ru: "Спасибо - Querencia",
  }

  const descriptions = {
    en: "Thank you for your interest in Querencia luxury residences. We've received your inquiry and will be in touch shortly.",
    tr: "Querencia lüks rezidanslarına gösterdiğiniz ilgi için teşekkür ederiz. Talebinizi aldık ve en kısa sürede sizinle iletişime geçeceğiz.",
    de: "Vielen Dank für Ihr Interesse an den Luxusresidenzen von Querencia. Wir haben Ihre Anfrage erhalten und werden uns in Kürze mit Ihnen in Verbindung setzen.",
    ru: "Благодарим вас за интерес к роскошным резиденциям Querencia. Мы получили ваш запрос и свяжемся с вами в ближайшее время.",
  }

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `${siteConfig.url}/${lang}/thank-you`,
      languages: {
        en: `${siteConfig.url}/en/thank-you`,
        tr: `${siteConfig.url}/tr/thank-you`,
        de: `${siteConfig.url}/de/thank-you`,
        ru: `${siteConfig.url}/ru/thank-you`,
      },
    },
    robots: {
      index: false, // Don't index thank you pages
      follow: true,
    },
  }
}

export default function LangThankYouPage() {
  // Render the same ThankYouPage component
  return <ThankYouClientPage />
}
