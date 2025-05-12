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
import { preloadImages, cacheImagesInIndexedDB } from "@/lib/image-cache"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n/context"

// Critical images that should be preloaded
const CRITICAL_IMAGES = [
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Hero%20Section/querencia-hero-section-PSfKHchhEjIfGpDkXDJBFkE6boXMqE.webp",
  "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/white_logo-BD39Nu2KjDrSHmKNE3zbil8kbxGFeq",
  "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png",
]

// Secondary images that can be cached for offline use but aren't critical for initial load
const SECONDARY_IMAGES = [
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/About%20Section/Querencia%20Outside-night%20%281%29-gHK4SqDKTsiKN2MUoLDfG7ZDocS9CG.webp",
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-1-2KGar18rZ8kKbe4VwFivhnCUSGkbMU.webp",
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-2-AfHnMYCOrV23nqcfRW1ncq3c0B8ey1.webp",
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-3-wEuk0Z9SqDRJNEfRPjUrLqN61y3Lue.webp",
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    // Always show loading screen on every page load/refresh
    setIsLoading(true)

    // Preload critical images
    preloadImages(CRITICAL_IMAGES)

    // Cache secondary images for offline use (non-blocking)
    setTimeout(() => {
      cacheImagesInIndexedDB([...CRITICAL_IMAGES, ...SECONDARY_IMAGES]).catch((error) =>
        console.error("Failed to cache images:", error),
      )
    }, 2000) // Delay to prioritize critical resources first
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a]">
      {/* Structured data for Real Estate Development */}
      <Script
        id="real-estate-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: "Querencia Hotel & Residence",
            description:
              "Luxury hotel and residence in North Cyprus offering panoramic sea views, premium amenities, and exclusive living spaces.",
            url: "https://querencia.com",
            image: [
              "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Hero%20Section/querencia-hero-section-PSfKHchhEjIfGpDkXDJBFkE6boXMqE.webp",
              "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-1-2KGar18rZ8kKbe4VwFivhnCUSGkbMU.webp",
              "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-2-AfHnMYCOrV23nqcfRW1ncq3c0B8ey1.webp",
            ],
            numberOfAccommodationUnits: 705,
            petsAllowed: true,
            tourBookingPage: "https://querencia.com/#virtual-tour",
            address: {
              "@type": "PostalAddress",
              addressCountry: "TRNC",
              addressLocality: "Trikomo",
              addressRegion: "Famagusta",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 35.265891430330605,
              longitude: 33.909266898704175,
            },
            amenityFeature: [
              {
                "@type": "LocationFeatureSpecification",
                name: "Swimming Pools & Aquapark",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "24-Hour Security & Cameras",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Wellness & Spa",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Restaurants & Bars",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Sports Courts",
                value: true,
              },
            ],
            containsPlace: [
              {
                "@type": "SportsActivityLocation",
                name: "Sports Courts",
              },
              {
                "@type": "Restaurant",
                name: "On-Site Restaurant",
              },
              {
                "@type": "HealthAndBeautyBusiness",
                name: "Wellness & Spa",
              },
            ],
          }),
        }}
      />

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
