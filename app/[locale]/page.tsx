import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import LocationSection from "@/components/location-section"
import ResidencesSection from "@/components/residences-section"
import AmenitiesSection from "@/components/amenities-section"
import GallerySection from "@/components/gallery-section"
import VirtualTourSection from "@/components/virtual-tour-section"
import MobileAppBanner from "@/components/mobile-app-banner"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <main className="min-h-screen">
      <Navbar dict={dict} locale={locale} />
      <HeroSection dict={dict} locale={locale} />
      <AboutSection dict={dict} locale={locale} />
      <LocationSection dict={dict} locale={locale} />
      <ResidencesSection dict={dict} locale={locale} />
      <AmenitiesSection dict={dict} locale={locale} />
      <GallerySection dict={dict} locale={locale} />
      <VirtualTourSection dict={dict} locale={locale} />
      <MobileAppBanner dict={dict} locale={locale} />
      <ContactSection dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </main>
  )
}
