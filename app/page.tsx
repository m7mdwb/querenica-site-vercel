"use client"

import { useState, useRef } from "react"
import Navbar from "@/components/navbar"
import LoadingScreen from "@/components/loading-screen"
import HeroSection from "@/components/hero-section"
import LocationSection from "@/components/location-section"
import ResidencesSection from "@/components/residences-section"
import AmenitiesSection from "@/components/amenities-section"
import GallerySection from "@/components/gallery-section"
import VirtualTourSection from "@/components/virtual-tour-section"
import MobileAppBanner from "@/components/mobile-app-banner"
import ContactSection from "@/components/contact-section"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const aboutRef = useRef<HTMLDivElement>(null)
  const residencesRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const virtualTourRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  if (loading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <main className="min-h-screen bg-white text-primary">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section - Now first after hero */}
      <div ref={aboutRef} id="about">
        <AboutSection />
      </div>

      {/* Location Section - Now after about */}
      <div id="location">
        <LocationSection />
      </div>

      {/* Residences Section */}
      <div ref={residencesRef} id="residences">
        <ResidencesSection />
      </div>

      {/* Amenities Section */}
      <div ref={amenitiesRef} id="amenities">
        <AmenitiesSection />
      </div>

      {/* Gallery Section - New position before virtual tour */}
      <div ref={galleryRef} id="gallery">
        <GallerySection />
      </div>

      {/* Mobile App Banner - New section before virtual tour */}
      <div id="mobile-app">
        <MobileAppBanner />
      </div>

      {/* Virtual Tour Section */}
      <div ref={virtualTourRef} id="virtual-tour">
        <VirtualTourSection />
      </div>

      {/* Contact Section */}
      <div ref={contactRef} id="contact">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
