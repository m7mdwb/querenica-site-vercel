"use client"

import { useEffect, useState } from "react"
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
import ServiceWorkerRegistration from "@/components/service-worker-registration"
import { useLanguage } from "@/lib/i18n/context"
import LoadingScreen from "@/components/loading-screen"

export default function ClientPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { isLoaded } = useLanguage()

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <ServiceWorkerRegistration />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <LocationSection />
        <ResidencesSection />
        <AmenitiesSection />
        <GallerySection />
        <VirtualTourSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
