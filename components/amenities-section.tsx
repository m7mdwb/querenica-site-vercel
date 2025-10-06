"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trees } from "lucide-react"

interface AmenitiesSectionProps {
  dict: Record<string, string>
  locale: string
}

export default function AmenitiesSection({ dict }: AmenitiesSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("amenities")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const allAmenities = [
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12c0 0 2-3 6-3s6 3 6 3 2-3 6-3 6 3 6 3" />
          <path d="M2 8c0 0 2-3 6-3s6 3 6 3 2-3 6-3 6 3 6 3" />
          <path d="M2 16c0 0 2-3 6-3s6 3 6 3 2-3 6-3 6 3 6 3" />
        </svg>
      ),
      titleKey: "amenities.resortStylePoolTitle",
      descriptionKey: "amenities.resortStylePoolDesc",
    },
    {
      icon: <Trees className="w-5 h-5" />,
      titleKey: "amenities.landscapedGardensTitle",
      descriptionKey: "amenities.landscapedGardensDesc",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
      titleKey: "amenities.socialLoungesTitle",
      descriptionKey: "amenities.socialLoungesDesc",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6" />
          <path d="m15.5 3.5-1.5 1.5m0 12-1.5 1.5" />
          <path d="m8.5 3.5 1.5 1.5m0 12 1.5 1.5" />
          <path d="m1 12h6m6 0h6" />
          <path d="m3.5 8.5 1.5 1.5m12 0 1.5-1.5" />
          <path d="m3.5 15.5 1.5-1.5m12 0 1.5 1.5" />
        </svg>
      ),
      titleKey: "amenities.childrensPlayAreaTitle",
      descriptionKey: "amenities.childrensPlayAreaDesc",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
      titleKey: "amenities.secureParkingTitle",
      descriptionKey: "amenities.secureParkingDesc",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      titleKey: "amenities.conciergeServicesTitle",
      descriptionKey: "amenities.conciergeServicesDesc",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      titleKey: "amenities.retailConveniencesTitle",
      descriptionKey: "amenities.retailConveniencesDesc",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      titleKey: "amenities.fitnessCenterTitle",
      descriptionKey: "amenities.fitnessCenterDesc",
    },
  ]

  return (
    <section id="amenities" className="py-32 bg-gradient-to-b from-alabaster to-parchment relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/design-mode/querencia-exterior-1.webp"
          alt="Querencia Luxury Amenities"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-0">
        <div className="text-center mb-20">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block font-inter">
            {dict["amenities.premiumAmenities"]}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight font-playfair">
            {dict["amenities.resortStyleLiving"]}
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed font-inter text-white/90">
            {dict["amenities.introText"]}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allAmenities.map((amenity, index) => (
            <div
              key={index}
              className={`group backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                backgroundColor: "rgba(224, 224, 224, 0.1)",
                border: "1px solid rgba(201, 167, 124, 0.2)",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-secondary">
                {amenity.icon}
              </div>
              <h4 className="text-lg font-medium text-white mb-3 transition-colors font-playfair">
                {dict[amenity.titleKey]}
              </h4>
              <p className="leading-relaxed text-sm transition-colors font-inter text-white/80">
                {dict[amenity.descriptionKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
