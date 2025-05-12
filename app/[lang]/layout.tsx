import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n/context"
import { defaultMetadata, siteConfig } from "../metadata-config"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }, { lang: "de" }, { lang: "ru" }]
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang

  return {
    ...defaultMetadata,
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

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <LanguageProvider initialLang={params.lang as any}>{children}</LanguageProvider>

        {/* Structured data for Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Dovec Group",
              url: "https://querencia.com",
              logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark_logo_querencia-RKneFVNYlNklaf0DSks551nwWQaotI.png",
              sameAs: [
                "https://www.facebook.com/DovecConstruction",
                "https://www.instagram.com/dovec_group",
                "https://x.com/Dovec_Group",
                "https://www.youtube.com/channel/UC8fZUDwu15NR7JTrWu-ihoA",
                "https://www.linkedin.com/company/18814152",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+905488370015",
                contactType: "customer service",
                email: "info@dovecgroup.com",
                areaServed: "North Cyprus",
                availableLanguage: ["English", "Turkish", "German", "Russian"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Uluçam Road, No.2",
                addressLocality: "Famagusta",
                addressRegion: "Sakarya",
                addressCountry: "TRNC",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
