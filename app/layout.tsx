import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ServiceWorkerRegistration from "@/components/service-worker-registration"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Querencia - Luxury Residences in North Cyprus",
  description:
    "Discover luxury living at Querencia, featuring premium residences with panoramic sea views in North Cyprus.",
  themeColor: "#2c4051",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://querencia.vercel.app/",
    title: "Querencia - Luxury Residences in North Cyprus",
    description:
      "Discover luxury living at Querencia, featuring premium residences with panoramic sea views in North Cyprus.",
    siteName: "Querencia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Querencia - Luxury Residences in North Cyprus",
    description:
      "Discover luxury living at Querencia, featuring premium residences with panoramic sea views in North Cyprus.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Cache-Control" content="public, max-age=3600, stale-while-revalidate=86400" />
      </head>
      <body className={inter.className}>
        {children}
        {/* ServiceWorkerRegistration component will handle its own conditional rendering */}
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
