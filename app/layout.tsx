import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n/context"
import { defaultMetadata } from "./metadata-config"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>

        {/* Add Speed Insights using Script tag instead of component */}
        <Script src="https://vercel.com/speed-insights/script.js" strategy="afterInteractive" data-sd-client="next" />
      </body>
    </html>
  )
}
