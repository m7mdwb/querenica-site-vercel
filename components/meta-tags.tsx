"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/app/metadata-config"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  lang?: "en" | "tr" | "de" | "ru"
}

export default function MetaTags({ title, description, keywords, image, lang = "en" }: MetaTagsProps) {
  const pathname = usePathname()
  const currentUrl = `${siteConfig.url}${pathname}`

  // Default values
  const metaTitle = title || siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaKeywords = keywords?.join(", ") || siteConfig.keywords.join(", ")
  const metaImage = image || siteConfig.ogImage

  return (
    <Head>
      {/* Additional meta tags that Next.js metadata doesn't cover */}
      <meta name="geo.region" content="CY" />
      <meta name="geo.placename" content="Trikomo, North Cyprus" />
      <meta
        name="geo.position"
        content={`${siteConfig.property.location.latitude};${siteConfig.property.location.longitude}`}
      />
      <meta
        name="ICBM"
        content={`${siteConfig.property.location.latitude}, ${siteConfig.property.location.longitude}`}
      />

      {/* Social media verification */}
      <meta name="facebook-domain-verification" content="your-facebook-verification-code" />
      <meta name="google-site-verification" content="your-google-verification-code" />

      {/* Mobile app tags */}
      <meta name="apple-itunes-app" content="app-id=yourAppId" />
      <meta name="google-play-app" content="app-id=yourAppId" />

      {/* Social sharing tags not covered by Next.js */}
      <meta property="og:price:amount" content="145000" />
      <meta property="og:price:currency" content="GBP" />
      <meta property="product:price:amount" content="145000" />
      <meta property="product:price:currency" content="GBP" />
      <meta property="product:availability" content="in stock" />

      {/* Article tags for blog content */}
      <meta property="article:publisher" content="https://www.facebook.com/DovecConstruction" />
    </Head>
  )
}
