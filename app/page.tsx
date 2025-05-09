"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import LocationSection from "@/components/location-section"
import ResidencesSection from "@/components/residences-section"
import AmenitiesSection from "@/components/amenities-section"
import GallerySection from "@/components/gallery-section"
import VirtualTourSection from "@/components/virtual-tour-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Always show loading screen on every page load/refresh
    setIsLoading(true)

    // Preload critical images
    const preloadImages = [
      "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Hero%20Section/querencia-hero-section-PSfKHchhEjIfGpDkXDJBFkE6boXMqE.webp",
      "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/white_logo-BD39Nu2KjDrSHmKNE3zbil8kbxGFeq",
      "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png",
    ]

    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a]">
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <LocationSection />
          <ResidencesSection />
          <AmenitiesSection />
          <GallerySection />
          <VirtualTourSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </main>
  )
}
