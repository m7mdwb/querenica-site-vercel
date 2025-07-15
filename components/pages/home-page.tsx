import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import GallerySection from "@/components/gallery-section"
import VirtualTourSection from "@/components/virtual-tour-section"
import ContactSection from "@/components/contact-section"
import AmenitiesSection from "@/components/amenities-section"
import MobileAppBanner from "@/components/mobile-app-banner"

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AmenitiesSection />
      <GallerySection />
      <VirtualTourSection />
      <MobileAppBanner />
      <ContactSection />
    </>
  )
}

export default HomePage
