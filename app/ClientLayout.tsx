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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  // Preload critical resources
  useEffect(() => {
    // Preload the hero image
    const heroImage = new Image()
    heroImage.src =
      "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Querencia-hero-section-6WTGyZrkUr6n5wiZLlFncacMdO1e8H"

    // Preload logo images
    const whiteLogo = new Image()
    whiteLogo.src = "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/white_logo-BD39Nu2KjDrSHmKNE3zbil8kbxGFeq"

    const darkLogo = new Image()
    darkLogo.src =
      "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png"
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
      <body className={inter.className}>
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>{children}</div>
      </body>
    </html>
  )
}
