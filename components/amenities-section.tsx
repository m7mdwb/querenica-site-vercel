"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import {
  Dumbbell,
  Flower,
  PocketIcon as Pool,
  Sparkles,
  User,
  Droplets,
  Home,
  Leaf,
  Building,
  LayoutGrid,
  ShowerHead,
  Waves,
  Thermometer,
  Snowflake,
  BookOpen,
  ShoppingBag,
} from "lucide-react"

export default function AmenitiesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const amenities = [
    { icon: ShowerHead, name: "Built-in Shower Systems" },
    { icon: Droplets, name: "Walk-in Showers" },
    { icon: BookOpen, name: "Granite Kitchen Countertops" },
    { icon: Thermometer, name: "Underfloor Heating System" },
    { icon: Snowflake, name: "Hidden Channel Cooling" },
    { icon: Home, name: "Luxury Wooden Cabinets" },
    { icon: Waves, name: "Large Porcelain Ceramics" },
    { icon: Leaf, name: "Endemic Plant Landscaping" },
    { icon: Flower, name: "Expansive Green Areas" },
    { icon: Building, name: "Sustainable Design" },
    { icon: ShoppingBag, name: "Commercial Areas" },
    { icon: LayoutGrid, name: "Modern Architecture" },
    { icon: Pool, name: "Infinity Pool" },
    { icon: Sparkles, name: "Private Spa & Wellness" },
    { icon: Dumbbell, name: "Fitness Center" },
    { icon: User, name: "Concierge Service" },
  ]

  return (
    <section ref={ref} id="amenities" className="bg-[#0a1a2a] py-20 text-white md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-light tracking-wider sm:text-4xl md:text-5xl">
          Uncompromising Amenities
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#8a9bae] md:mb-16">
          Querencia offers world-class features designed for the most discerning residents.
        </p>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center transition-all duration-700",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                { "delay-[200ms]": index % 4 === 0 },
                { "delay-[400ms]": index % 4 === 1 },
                { "delay-[600ms]": index % 4 === 2 },
                { "delay-[800ms]": index % 4 === 3 },
              )}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a77c]/20 text-[#c9a77c] sm:h-14 sm:w-14 md:mb-4 md:h-16 md:w-16">
                <amenity.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="text-center text-xs font-light sm:text-sm">{amenity.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
