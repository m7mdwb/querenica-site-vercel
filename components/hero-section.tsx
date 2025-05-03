"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNextSection = () => {
    const projectDetailsSection = document.getElementById("project-details")
    if (projectDetailsSection) {
      projectDetailsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Querencia-hero-section-6WTGyZrkUr6n5wiZLlFncacMdO1e8H')",
        }}
      >
        <div className="absolute inset-0 bg-[#2c4051]/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1
          className={cn(
            "mb-4 font-serif text-4xl font-light tracking-wider transition-all duration-1000 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          Querencia
        </h1>
        <p
          className={cn(
            "max-w-2xl text-base font-light tracking-wide text-white/90 transition-all delay-300 duration-1000 sm:text-lg md:text-xl lg:text-2xl",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          Experience Unrivaled Luxury Living in North Cyprus
        </p>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNextSection}
          className={cn(
            "absolute bottom-8 flex animate-bounce flex-col items-center justify-center transition-all delay-700 duration-1000 sm:bottom-12",
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
