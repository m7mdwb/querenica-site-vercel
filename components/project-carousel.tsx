"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface ProjectCarouselProps {
  dict: Record<string, string>
}

const projects = [
  {
    name: "Courtyard Platinum",
    url: "https://courtyardplatinum.com",
    status: "live",
    image: "https://bpee586anmliawyw.public.blob.vercel-storage.com/courtyardPlatinumHero.webp",
  },
  {
    name: "D-Point",
    url: "https://dpointcyprus.com",
    status: "live",
    image: "https://j1nxv1ac2l7kqckz.public.blob.vercel-storage.com/dpointHeroSection.webp",
  },
  {
    name: "La Casalia",
    url: "https://lacasaliacyprus.com",
    status: "live",
    image: "https://5kut59tby5yv02dk.public.blob.vercel-storage.com/laCasaliaHero.jpg",
  },
  {
    name: "Natulux",
    url: "https://natuluxcyprus.com",
    status: "live",
    image: "https://futnnrv6gcfa7ssb.public.blob.vercel-storage.com/NataluxHeroSection.webp",
  },
  {
    name: "La Isla",
    url: "https://laislacyprus.com",
    status: "live",
    image: "https://c7c0pdbziiwdjdwd.public.blob.vercel-storage.com/la-isla-hero.webp",
  },
]

export default function ProjectCarousel({ dict }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const currentScrollPosition = useRef<number>(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const loopedProjects = [...projects, ...projects] // Duplicate for seamless loop

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollSpeed = 0.3 // Changed from 0.1 - faster, smoother scrolling
    const cardWidth = 320 + 24 // w-80 (320px) + gap-6 (24px)
    const totalOriginalWidth = projects.length * cardWidth

    const updateScroll = () => {
      currentScrollPosition.current += scrollSpeed

      // Reset position when we've scrolled through the first set
      if (currentScrollPosition.current >= totalOriginalWidth) {
        currentScrollPosition.current -= totalOriginalWidth
      }

      scrollContainer.scrollLeft = Math.round(currentScrollPosition.current)
      animationFrameId.current = requestAnimationFrame(updateScroll)
    }

    animationFrameId.current = requestAnimationFrame(updateScroll)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const containerCenter = container.scrollLeft + container.offsetWidth / 2
    let closestIndex = 0
    let minDistance = Number.POSITIVE_INFINITY

    Array.from(container.children).forEach((child, index) => {
      const cardElement = child as HTMLElement
      const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2
      const distance = Math.abs(cardCenter - containerCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    // Adjust index for the duplicated array to get the original project index
    setActiveCardIndex(closestIndex % projects.length)
  }, [])

  return (
    <div className="max-w-6xl mx-auto mt-16 text-center">
      <h2 className="text-3xl font-light text-primary mb-8">{dict["thankYou.viewOtherProjects"]}</h2>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide py-4 gap-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loopedProjects.map((project, index) => (
          <Link
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex-shrink-0 w-80 h-64 rounded-xl overflow-hidden relative group
              bg-white/80 backdrop-blur-sm border border-platinum-200
              transition-all duration-300 ease-in-out
              ${activeCardIndex === index % projects.length ? "scale-105 shadow-xl shadow-platinum-300/40" : "scale-100 shadow-lg hover:shadow-xl"}
            `}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end text-white">
              <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
              <p className="text-sm opacity-90">
                {project.status === "live" ? dict["projects.live"] : dict["projects.comingSoon"]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
