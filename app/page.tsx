import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProjectDetailsSection from "@/components/project-details-section"
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
      <div id="home">
        <HeroSection />
      </div>
      <div id="project-details">
        <ProjectDetailsSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="location">
        <LocationSection />
      </div>
      <div id="residences">
        <ResidencesSection />
      </div>
      <div id="amenities">
        <AmenitiesSection />
      </div>
      <div id="gallery">
        <GallerySection />
      </div>
      <div id="virtual-tour">
        <VirtualTourSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
