"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Primary image path with fallback
const HERO_IMAGE =
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Hero%20Section/querencia-hero-section-PSfKHchhEjIfGpDkXDJBFkE6boXMqE.webp"
const FALLBACK_IMAGE = "/placeholder.svg?key=kncmj"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(HERO_IMAGE)

  // Handle animations and image loading
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleImageError = () => {
    console.error("Hero image failed to load, using fallback")
    setImageSrc(FALLBACK_IMAGE)
  }

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      // Get the navbar height to use as offset
      const navbar = document.querySelector("nav")
      const navbarHeight = navbar ? navbar.offsetHeight : 0

      // Calculate the element's position relative to the document
      const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY

      // Scroll to the element with offset for the navbar
      window.scrollTo({
        top: elementPosition - navbarHeight - 16, // Additional 16px buffer for spacing
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt="Querencia hero background"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-1000",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-[#2c4051]/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1
          className={cn(
            "mb-4 font-serif text-5xl font-light tracking-wider transition-all duration-1000 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
            isVisible ? "translate-y-0 opacity-100 text-white" : "translate-y-10 opacity-0 text-[#2c4051]",
          )}
        >
          Querencia
        </h1>
        <p
          className={cn(
            "max-w-2xl text-lg font-light tracking-wide transition-all delay-300 duration-1000 sm:text-xl md:text-2xl lg:text-2xl",
            isVisible ? "translate-y-0 opacity-100 text-white/90" : "translate-y-10 opacity-0 text-[#2c4051]",
          )}
        >
          In Harmony With Luxury in North Cyprus
        </p>

        {/* Scroll indicator - Adjusted positioning for mobile */}
        <button
          onClick={scrollToNextSection}
          className={cn(
            "absolute flex animate-bounce flex-col items-center justify-center transition-all delay-700 duration-1000",
            // Adjusted positioning for better mobile visibility
            "bottom-20 sm:bottom-12",
            isVisible ? "opacity-100" : "opacity-0",
          )}
          aria-label="Scroll down"
        >
          <span className="mb-2 text-sm font-light">Discover</span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </section>
  )
}
