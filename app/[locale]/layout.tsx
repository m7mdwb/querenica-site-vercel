import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { locales, type Locale } from "@/lib/i18n/config"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: dict["meta.title"],
    description: dict["meta.description"],
    alternates: {
      canonical: `https://querencia.com/${locale}`,
      languages: {
        en: "https://querencia.com/en",
        tr: "https://querencia.com/tr",
        de: "https://querencia.com/de",
        ru: "https://querencia.com/ru",
        pl: "https://querencia.com/pl",
        "x-default": "https://querencia.com/en",
      },
    },
    openGraph: {
      title: dict["meta.title"],
      description: dict["meta.description"],
      url: `https://querencia.com/${locale}`,
      siteName: "Querencia",
      locale: locale,
      type: "website",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href="https://querencia.com/en" />
        <link rel="alternate" hrefLang="tr" href="https://querencia.com/tr" />
        <link rel="alternate" hrefLang="de" href="https://querencia.com/de" />
        <link rel="alternate" hrefLang="ru" href="https://querencia.com/ru" />
        <link rel="alternate" hrefLang="pl" href="https://querencia.com/pl" />
        <link rel="alternate" hrefLang="x-default" href="https://querencia.com/en" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
