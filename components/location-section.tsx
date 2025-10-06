"use client"

import { useState, useEffect } from "react"
import { MapPin, Utensils, Plane, GraduationCap } from "lucide-react"

interface LocationSectionProps {
  dict: Record<string, string>
  locale: string
}

export default function LocationSection({ dict }: LocationSectionProps) {
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

    const section = document.getElementById("location")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const locationBenefits = [
    {
      icon: <MapPin className="w-5 h-5" />,
      titleKey: "location.benefit1Title",
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      titleKey: "location.benefit2Title",
    },
    {
      icon: <Plane className="w-5 h-5" />,
      titleKey: "location.benefit3Title",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      titleKey: "location.benefit4Title",
    },
  ]

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4008.401603493251!2d33.90661687632958!3d35.26566805268919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfb1768826e5b7%3A0x7aec004e466b2a6d!2sQuerencia!5e1!3m2!1sen!2sus!4v1752750997890!5m2!1sen!2sus"

  return (
    <section id="location" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/design-mode/querenciaLocationSection.webp"
          alt="Querencia Location Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {dict["location.sereneBoazLocation"]}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
            {dict["location.enviableLocationTitle"]}
            <span className="block font-serif italic text-secondary" style={{ fontFamily: "var(--font-bodoni)" }}>
              {dict["location.locationSubtitle"]}
            </span>
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            {dict["location.enviableLocationSubtitle"]}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transition: "all 0.8s ease-out", transitionDelay: "200ms" }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[400px]"
                  title="Querencia Location Map"
                ></iframe>
              </div>
            </div>

            <div
              className={`${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transition: "all 0.8s ease-out", transitionDelay: "400ms" }}
            >
              <div className="space-y-8">
                <div>
                  <p className="text-lg leading-relaxed font-inter mb-8" style={{ color: "#e0e0e0" }}>
                    {dict["location.strategicPositionText"]}
                  </p>
                </div>

                <div className="space-y-6">
                  {locationBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 ${
                        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                      }`}
                      style={{
                        transition: "all 0.8s ease-out",
                        transitionDelay: `${600 + index * 100}ms`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0"
                        style={{ backgroundColor: "#c9a77c" }}
                      >
                        {benefit.icon}
                      </div>
                      <div>
                        <p className="text-white text-lg font-medium font-inter">{dict[benefit.titleKey]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
