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
        {/* Google Tag Manager - Script placed as high as possible in head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T63BLP4L');`,
          }}
        />
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
        {/* Google Tag Manager (noscript) - Placed at the beginning of body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T63BLP4L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <LanguageProvider>{children}</LanguageProvider>

        {/* Add Speed Insights using Script tag instead of component */}
        <Script src="https://vercel.com/speed-insights/script.js" strategy="afterInteractive" data-sd-client="next" />
      </body>
    </html>
  )
}
