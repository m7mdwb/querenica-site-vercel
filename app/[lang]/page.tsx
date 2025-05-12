import { redirect } from "next/navigation"
import Home from "../page"
import type { Metadata } from "next"
import { siteConfig } from "../metadata-config"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang

  return {
    title: lang === "en" ? siteConfig.name : `${siteConfig.name} - ${languageNames[lang as any] || ""}`,
    alternates: {
      canonical: `${siteConfig.url}/${lang}`,
      languages: {
        en: `${siteConfig.url}/en`,
        tr: `${siteConfig.url}/tr`,
        de: `${siteConfig.url}/de`,
        ru: `${siteConfig.url}/ru`,
      },
    },
  }
}

// Language names for display in metadata
const languageNames: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  ru: "Русский",
}

// This is a Server Component that renders the Home component
export default function LangPage({ params }: { params: { lang: string } }) {
  // Validate language parameter
  const validLangs = ["en", "tr", "de", "ru"]
  if (!validLangs.includes(params.lang)) {
    redirect("/")
  }

  // Render the same Home component
  return <Home />
}
