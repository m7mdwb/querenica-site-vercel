import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/context"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Querencia | Luxury Residences in Boğaz, Iskele, North Cyprus",
  description:
    "Experience the pinnacle of luxury living at Querencia in Boğaz, Iskele, North Cyprus. Discover premium apartments and duplexes with resort-style amenities, stunning views, and exceptional design. Download our brochure for floor plans and specifications.",
  keywords:
    "Querencia, luxury residences, Boğaz, Iskele, North Cyprus, luxury apartments, duplexes, premium living, real estate, property for sale, resort-style living, Döveç Construction",
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
  openGraph: {
    title: "Querencia | Luxury Residences in Boğaz, Iskele, North Cyprus",
    description:
      "Experience the pinnacle of luxury living at Querencia in Boğaz, Iskele, North Cyprus. Discover premium apartments and duplexes with resort-style amenities, stunning views, and exceptional design.",
    url: "https://www.querencia.com",
    siteName: "Querencia",
    images: [
      {
        url: "https://emjxtcn2pcqsrsav.public.blob.vercel-storage.com/gallery/Day/Day-6-iKbnL1SvIfUowdcqrsVUNQ1F9EgZ4P.webp",
        width: 1200,
        height: 630,
        alt: "Querencia Luxury Residences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Querencia | Luxury Residences in Boğaz, Iskele, North Cyprus",
    description:
      "Experience the pinnacle of luxury living at Querencia in Boğaz, Iskele, North Cyprus. Discover premium apartments and duplexes with resort-style amenities, stunning views, and exceptional design.",
    images: [
      "https://emjxtcn2pcqsrsav.public.blob.vercel-storage.com/gallery/Day/Day-6-iKbnL1SvIfUowdcqrsVUNQ1F9EgZ4P.webp",
    ],
    creator: "@Dovec_Group",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.querencia.com",
    languages: {
      "en-US": "https://www.querencia.com",
      "tr-TR": "https://www.querencia.com",
      "ru-RU": "https://www.querencia.com",
      "de-DE": "https://www.querencia.com",
      "x-default": "https://www.querencia.com",
    },
  },
  verification: {
    google: "YnIxWy7GdzBw3gOo8o7budhCcFo1T6yxG19kKIqQ2YA",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#C9A96E" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
              <Analytics />
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
