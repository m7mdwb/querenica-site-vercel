import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "../metadata-config"

export const metadata: Metadata = {
  title: "Thank You - Querencia",
  description:
    "Thank you for your interest in Querencia luxury residences. We've received your inquiry and will be in touch shortly.",
  alternates: {
    canonical: `${siteConfig.url}/thank-you`,
  },
  openGraph: {
    title: "Thank You - Querencia",
    description:
      "Thank you for your interest in Querencia luxury residences. We've received your inquiry and will be in touch shortly.",
    url: `${siteConfig.url}/thank-you`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Querencia Thank You",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false, // Don't index thank you pages
    follow: true,
  },
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="thank-you-container">{children}</div>
}
