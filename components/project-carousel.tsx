"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/context"
import { thankYouTranslations } from "@/lib/i18n/thank-you-translations"

interface Project {
    name: string
    url: string
    status: "live" | "coming-soon"
    image: string
}
const projects: Project[] = [{
    name: "Courtyard Platinum",
    url: "https://courtyardplatinum.com",
    status: "live",
    image:
        "https://emjxtcn2pcqsrsav.public.blob.vercel-storage.com/gallery/Day/Day-4-Kp2LSkFt7AYPZCz6yEqMc8cvt1CImQ.webp",
},
{
    name: "D-Point",
    url: "https://dpointcyprus.com",
    status: "live",
    image:
        "https://lf8lg0kk2ixnghtm.public.blob.vercel-storage.com/Project/hero-section/hero-section-d-point-Rf2nDmKvGZPPe99nSj3fa83IhkyAKy.webp",
},
{
    name: "La Casalia",
    url: "https://lacasaliacyprus.com",
    status: "live",
    image:
        "https://emjxtcn2pcqsrsav.public.blob.vercel-storage.com/gallery/Day/Day-1-0tIqJBr6LJCTzy3AlzPA5dwfYsoFEH.webp",
},
{
    name: "Natulux",
    url: "https://natuluxcyprus.com",
    status: "live",
    image: "https://agzuppqphn2cpw1y.public.blob.vercel-storage.com/NataluxHeroSection.webp",
},
{
    name: "La Isla",
    url: "https://laislacyprus.com",
    status: "coming-soon",
    image: "https://lf8lg0kk2ixnghtm.public.blob.vercel-storage.com/LaIslaVillas-Dzlxg7000ZFB7q1aXyMuHNfsWxiNPs.webp",
},
]
export function ProjectCarousel() {
    const { language } = useLanguage();
    const t = thankYouTranslations[language as keyof typeof thankYouTranslations] || thankYouTranslations.en
    const scrollRef = useRef<HTMLDivElement>(null)
    const animationFrameId = useRef<number | null>(null)
    const scrollPosRef = useRef(0)
    const [activeCardIndex, setActiveCardIndex] = useState(0)



    const loopedProjects = [...projects, ...projects] // Duplicate for seamless loop

    const scrollSpeed = 0.5 // pixels per frame for smooth effect
    const cardWidth = 320 + 24 // w-80 (320px) + gap-6 (24px)
    const totalOriginalWidth = projects.length * cardWidth

    const animateScroll = useCallback(() => {
        scrollPosRef.current += scrollSpeed
        if (scrollPosRef.current >= totalOriginalWidth) {
            scrollPosRef.current -= totalOriginalWidth // Reset to start of first set
        }
        const scrollContainer = scrollRef.current
        if (scrollContainer) {
            scrollContainer.scrollLeft = scrollPosRef.current
        }
        animationFrameId.current = requestAnimationFrame(animateScroll)
    }, [scrollSpeed, totalOriginalWidth])

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
    }, [projects.length])

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(animateScroll)

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [animateScroll])

    return (
        <div className="max-w-6xl mx-auto mt-16 text-center">
            <h2 className="text-3xl font-light text-primary mb-8">{t.thankYou.viewOtherProjects}</h2>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                // Removed snap-x and snap-mandatory to allow smooth scrolling
                className="flex overflow-x-auto scrollbar-hide py-4 gap-6 hide-scrollbar"
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
              ${activeCardIndex === (index % projects.length) ? "scale-105 shadow-xl shadow-platinum-300/40" : "scale-100 shadow-lg hover:shadow-xl"}
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
                                {project.status === "live" ? t.projects.live : t.projects.comingSoon}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
