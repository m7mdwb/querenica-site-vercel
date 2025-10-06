"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  dict: Record<string, string>
  locale: string
}

const HERO_IMAGE = "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/querenciaHeroSection.webp"

export default function HeroSection({ dict }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE || "/placeholder.svg"}
          alt="Querencia hero background"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-1000",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1
          className={cn(
            "mb-4 font-playfair text-5xl font-light tracking-wider transition-all duration-1000 sm:text-6xl md:text-7xl lg:text-8xl",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          Querencia
        </h1>
        <p
          className={cn(
            "max-w-2xl text-lg font-light tracking-wide transition-all delay-300 duration-1000 sm:text-xl md:text-2xl mt-8",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
          style={{ color: "#e0e0e0" }}
        >
          {dict["hero.tagline"]}
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
          <span className="mb-2 text-sm font-light">{dict["hero.discover"]}</span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </section>
  )
}
