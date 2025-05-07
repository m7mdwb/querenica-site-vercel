"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import LoadingScreen from "@/components/loading-screen"
import "./globals.css"

// Load Inter font with Latin subset only
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Critical resources to preload
const CRITICAL_RESOURCES = [
  "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Querencia-hero-section-6WTGyZrkUr6n5wiZLlFncacMdO1e8H",
  "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/white_logo-BD39Nu2KjDrSHmKNE3zbil8kbxGFeq",
  "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png",
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  // Preload critical resources
  useEffect(() => {
    // Preload images
    CRITICAL_RESOURCES.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    // Add meta theme color for mobile browsers
    const meta = document.createElement("meta")
    meta.name = "theme-color"
    meta.content = "#2c4051"
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* Preload critical resources */}
        {CRITICAL_RESOURCES.map((src, index) => (
          <link key={index} rel="preload" href={src} as="image" />
        ))}
      </head>
      <body className={inter.className}>
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        <div
          className="transition-opacity duration-1000"
          style={{
            opacity: isLoading ? 0 : 1,
            visibility: isLoading ? "hidden" : "visible",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
