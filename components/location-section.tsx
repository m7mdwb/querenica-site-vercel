"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Utensils, Plane, School, Shell } from "lucide-react"
import InteractiveMap from "./interactive-map"
import { useLanguage } from "@/lib/i18n/context"

export default function LocationSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })
  const { t } = useLanguage()

  const locationFeatures = [
    { icon: Shell, text: t("location.features.0") },
    { icon: Utensils, text: t("location.features.1") },
    { icon: Plane, text: t("location.features.2") },
    { icon: School, text: t("location.features.3") },
  ]

  return (
    <section ref={ref} id="location" className="bg-[#2c4051] py-20 text-white md:py-32 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-light tracking-wider sm:text-4xl md:text-5xl">
          {t("location.title")}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#8a9bae] md:mb-16">{t("location.subtitle")}</p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div
            className={cn(
              "transition-all duration-1000 ease-out",
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
          >
            <InteractiveMap />
          </div>

          <div
            className={cn(
              "flex flex-col justify-center transition-all delay-300 duration-1000 ease-out",
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
          >
            <p className="mb-8 text-lg leading-relaxed text-[#e0e0e0]">{t("location.description")}</p>

            <ul className="space-y-6">
              {locationFeatures.map((feature, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-center transition-all",
                    inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
                    { "delay-[400ms]": index === 0 },
                    { "delay-[600ms]": index === 1 },
                    { "delay-[800ms]": index === 2 },
                    { "delay-[1000ms]": index === 3 },
                  )}
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a77c]/20 text-[#c9a77c]">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className="text-lg">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
