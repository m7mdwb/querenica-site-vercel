import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n/context"
import { generateHomeMetadata } from "../metadata-config"
import Script from "next/script"
import {
  generateFAQStructuredData,
  generateRealEstateStructuredData,
  generateResidenceStructuredData,
  generateLocalBusinessStructuredData,
  generateProductStructuredData,
} from "@/lib/structured-data-i18n"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }, { lang: "de" }, { lang: "ru" }]
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  // Validate language parameter
  const lang = ["en", "tr", "de", "ru"].includes(params.lang) ? params.lang : "en"

  // Use the enhanced metadata generation function
  return generateHomeMetadata(lang)
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Validate language parameter
  const lang = ["en", "tr", "de", "ru"].includes(params.lang) ? (params.lang as "en" | "tr" | "de" | "ru") : "en"

  // Generate structured data for the language
  const faqStructuredData = generateFAQStructuredData(lang)
  const realEstateStructuredData = generateRealEstateStructuredData(lang)
  const residenceStructuredData = generateResidenceStructuredData(lang)
  const localBusinessStructuredData = generateLocalBusinessStructuredData(lang)
  const productStructuredData = generateProductStructuredData(lang)

  return (
    <html lang={params.lang}>
      <head>
        {/* Organization structured data */}
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

        {/* FAQ structured data */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />

        {/* Real Estate Agent structured data */}
        <Script
          id="real-estate-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(realEstateStructuredData),
          }}
        />

        {/* Residence structured data */}
        <Script
          id="residence-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(residenceStructuredData),
          }}
        />

        {/* Local Business structured data */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData),
          }}
        />

        {/* Product structured data */}
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider initialLang={params.lang as any}>{children}</LanguageProvider>

        {/* Add Speed Insights using Script tag instead of component */}
        <Script src="https://vercel.com/speed-insights/script.js" strategy="afterInteractive" data-sd-client="next" />
      </body>
    </html>
  )
}
