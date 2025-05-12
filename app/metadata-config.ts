import type { Metadata } from "next"

// Base URL for the website (change this to your production URL)
export const siteConfig = {
  name: "Querencia Hotel & Residence",
  url: "https://querenciacyprus.com", // Replace with your actual domain
  ogImage:
    "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Hero%20Section/querencia-hero-section-PSfKHchhEjIfGpDkXDJBFkE6boXMqE.webp",
  description:
    "Luxury hotel and residence in North Cyprus offering panoramic sea views, premium amenities, and exclusive living spaces.",
  keywords: [
    "luxury residence",
    "North Cyprus property",
    "sea view apartments",
    "Querencia",
    "luxury hotel",
    "Trikomo",
  ],
  authors: [{ name: "Dovec Group" }],
}

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: "Dovec Group",
  publisher: "Dovec Group",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Dovec_Group",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: `${siteConfig.url}/en`,
      tr: `${siteConfig.url}/tr`,
      de: `${siteConfig.url}/de`,
      ru: `${siteConfig.url}/ru`,
    },
  },
}

// Generate metadata for each section
export function generateSectionMetadata(
  section: string,
  title: string,
  description: string,
  imageUrl?: string,
): Metadata {
  const url = `${siteConfig.url}/#${section}`
  const image = imageUrl || siteConfig.ogImage

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title: title,
      description: description,
      images: [image],
    },
  }
}
