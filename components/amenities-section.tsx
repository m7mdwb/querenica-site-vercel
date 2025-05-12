"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"
import {
  Ship,
  Waves,
  Shield,
  ParkingSquare,
  Sparkles,
  Utensils,
  Trophy,
  LandPlot,
  Paintbrush,
  Snowflake,
  Thermometer,
  Baby,
  User,
  Briefcase,
  Bike,
  Music,
} from "lucide-react"

export default function AmenitiesSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const amenities = [
    { name: t("amenities.items.seaView"), icon: Ship },
    { name: t("amenities.items.swimmingPools"), icon: Waves },
    { name: t("amenities.items.security"), icon: Shield },
    { name: t("amenities.items.parking"), icon: ParkingSquare },
    { name: t("amenities.items.wellness"), icon: Sparkles },
    { name: t("amenities.items.restaurants"), icon: Utensils },
    { name: t("amenities.items.sportsCourts"), icon: Trophy },
    { name: t("amenities.items.miniGolf"), icon: LandPlot },
    { name: t("amenities.items.interiorFinishes"), icon: Paintbrush },
    { name: t("amenities.items.cooling"), icon: Snowflake },
    { name: t("amenities.items.heating"), icon: Thermometer },
    { name: t("amenities.items.kidsClub"), icon: Baby },
    { name: t("amenities.items.concierge"), icon: User },
    { name: t("amenities.items.businessCenter"), icon: Briefcase },
    { name: t("amenities.items.paths"), icon: Bike },
    { name: t("amenities.items.entertainment"), icon: Music },
  ]

  return (
    <section id="amenities" className="py-20 md:py-32 bg-gradient-to-b from-[#2c4051] to-[#1e2c38] scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-light tracking-wider text-white mb-12 md:mb-16">
          {t("amenities.title")}
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12"
        >
          {amenities.map((amenity, index) => {
            // Calculate delay based on column position
            const columnPosition = index % 4
            const delayClass =
              columnPosition === 0
                ? ""
                : columnPosition === 1
                  ? "delay-200"
                  : columnPosition === 2
                    ? "delay-400"
                    : "delay-600"

            return (
              <div
                key={amenity.name}
                className={cn(
                  "flex flex-col items-center text-center transition-all duration-700 h-full",
                  inView ? `translate-y-0 opacity-100 ${delayClass}` : "translate-y-8 opacity-0",
                )}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 
                  bg-[rgba(255,255,255,0.08)] backdrop-blur-md 
                  border border-[rgba(255,255,255,0.1)] 
                  shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
                  hover:bg-[rgba(255,255,255,0.12)] transition-all duration-300 flex-shrink-0"
                >
                  <amenity.icon className="w-7 h-7 text-[#c9a77c]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-light text-white tracking-wide line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                  {amenity.name}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
