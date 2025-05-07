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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a]">
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
    </main>
  )
}
