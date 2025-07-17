"use client"

import { useState, useEffect } from "react"
import { MapPin, Utensils, Plane, GraduationCap } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function LocationSection() {
  const { t } = useLanguage()
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

  // Updated location benefits to match the design
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

  // Google Maps embed URL for the project location
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4008.401603493251!2d33.90661687632958!3d35.26566805268919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfb1768826e5b7%3A0x7aec004e466b2a6d!2sQuerencia!5e1!3m2!1sen!2sus!4v1752750997890!5m2!1sen!2sus"

  return (
    <section id="location" className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-1-2KGar18rZ8kKbe4VwFivhnCUSGkbMU.webp"
          alt="Querencia Location Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(44, 64, 81, 0.8)" }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {t("location.sereneBoazLocation")}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
            An Enviable
            <span className="block font-serif italic text-secondary" style={{ fontFamily: "var(--font-bodoni)" }}>
              Location
            </span>
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t("location.enviableLocationSubtitle")}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Google Maps */}
            <div
              className={`${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transition: "all 0.8s ease-out", transitionDelay: "200ms" }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
                {/* Map Toggle Buttons */}
                <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow-md overflow-hidden">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Map
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    Satellite
                  </button>
                </div>

                {/* Fullscreen Button */}
                <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>

                {/* Google Maps Iframe */}
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

            {/* Right Column - Content */}
            <div
              className={`${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transition: "all 0.8s ease-out", transitionDelay: "400ms" }}
            >
              <div className="space-y-8">
                <div>
                  <p className="text-lg leading-relaxed font-inter mb-8" style={{ color: "#e0e0e0" }}>
                    {t("location.strategicPositionText")}
                  </p>
                </div>

                {/* Location Benefits List */}
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
                        <p className="text-white text-lg font-medium font-inter">{t(benefit.titleKey)}</p>
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
