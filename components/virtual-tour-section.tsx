"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function VirtualTourSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section ref={ref} className="bg-[#0a1a2a] py-24 text-white md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-light tracking-wider sm:text-4xl md:text-5xl">
          Immerse Yourself
        </h2>

        <div
          className={cn(
            "mx-auto max-w-5xl transition-all duration-1000",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <div className="relative aspect-video overflow-hidden rounded-lg bg-[#132639]">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="mb-6 text-xl text-[#8a9bae]">360° Virtual Tour Experience</p>
              <Button
                variant="outline"
                className="border-[#c9a77c] bg-transparent text-[#c9a77c] hover:bg-[#c9a77c]/10 hover:text-[#c9a77c]"
              >
                <Play className="mr-2 h-4 w-4" />
                Launch Virtual Tour
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#8a9bae]">
              Experience Querencia from every angle with our immersive virtual tour.
              <br />
              Explore the residences, amenities, and breathtaking views from the comfort of your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
