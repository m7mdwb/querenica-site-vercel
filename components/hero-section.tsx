"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface HeroSectionProps {
  dict: Record<string, string>
  locale: string
}

const HERO_IMAGE = "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/querenciaHeroSection.webp"
const FALLBACK_IMAGE = "/images/design-mode/querencia-exterior-1.webp"
const LOGO_IMAGE = "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/light_logo_querencia.png"

export default function HeroSection({ dict = {}, locale }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(HERO_IMAGE)
  const [mounted, setMounted] = useState(false)

  // Get translations with fallbacks
  const tagline = dict["hero.tagline"] || "In Harmony With Luxury in North Cyprus"
  const discover = dict["hero.discover"] || "Discover More"

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)
  }, [])

  useEffect(() => {
    // Preload image
    const img = new window.Image()
    img.src = imageSrc
    img.onload = () => {
      setImageLoaded(true)
    }
    img.onerror = () => {
      console.error("Failed to load hero image, using fallback")
      setImageSrc(FALLBACK_IMAGE)
      setImageLoaded(true)
    }
  }, [imageSrc])

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      const navbar = document.querySelector("nav")
      const navbarHeight = navbar ? navbar.offsetHeight : 0
      const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - navbarHeight - 16,
        behavior: "smooth",
      })
    }
  }

  // Prevent hydration issues
  if (!mounted) {
    return (
      <section id="home" className="relative h-screen w-full overflow-hidden bg-primary">
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="sr-only">Querencia</h1>
          <div className="w-72 sm:w-96 md:w-[500px] lg:w-[600px] mb-4">
            <Image
              src={LOGO_IMAGE || "/placeholder.svg"}
              alt="Querencia"
              width={600}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        {/* SEO-friendly h1 text (hidden) */}
        <h1 className="sr-only">Querencia</h1>

        {/* Visible logo image */}
        <div
          className={cn(
            "w-72 sm:w-96 md:w-[500px] lg:w-[600px] mb-4 transition-all duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <Image
            src={LOGO_IMAGE || "/placeholder.svg"}
            alt="Querencia"
            width={600}
            height={200}
            className="w-full h-auto"
            priority
          />
        </div>

        <p
          className={cn(
            "max-w-2xl text-lg font-light tracking-wide transition-all delay-300 duration-1000 sm:text-xl md:text-2xl",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
          style={{ color: "#e0e0e0" }}
        >
          {tagline}
        </p>

        <button
          onClick={scrollToNextSection}
          className={cn(
            "absolute flex animate-bounce flex-col items-center justify-center transition-all delay-700 duration-1000",
            "bottom-20 sm:bottom-12",
            isVisible ? "opacity-100" : "opacity-0",
          )}
          aria-label="Scroll down"
          style={{ color: "#c9a77c" }}
        >
          <span className="mb-2 text-sm font-light">{discover}</span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </section>
  )
}
