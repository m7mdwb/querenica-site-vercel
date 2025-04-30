"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Calendar, MapPin, PoundSterling } from "lucide-react"

export default function ProjectDetailsSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const details = [
    {
      icon: MapPin,
      title: "CITY",
      value: "TRIKOMO",
    },
    {
      icon: Calendar,
      title: "COMPLETION",
      value: "2024",
    },
    {
      icon: PoundSterling,
      title: "STARTING PRICE",
      value: "£ 144.000",
    },
  ]

  return (
    <section ref={ref} className="bg-[#f8f8f8] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
          {details.map((detail, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-md transition-all duration-700 sm:p-8",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                { "delay-[200ms]": index === 0 },
                { "delay-[400ms]": index === 1 },
                { "delay-[600ms]": index === 2 },
              )}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0a1a2a]/5 text-[#0a1a2a] sm:h-16 sm:w-16">
                <detail.icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-1 text-sm font-medium tracking-wider text-[#666] sm:mb-2">{detail.title}</h3>
              <p className="text-xl font-light text-[#0a1a2a] sm:text-2xl">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
