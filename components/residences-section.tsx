"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResidencesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const propertyTypes = [
    { id: "a", name: "Block A", types: ["A 1+1", "A 2+1", "A Studio"] },
    {
      id: "bcd",
      name: "Block B, C & D",
      types: ["BCD 1+1", "BCD 2+1", "BCD 3+1", "BCD Dublex", "BCD Penthouse", "BCD Studio"],
    },
  ]

  const residences = [
    {
      type: "A 1+1",
      image: "/images/residence-1.jpg",
      description: "One-bedroom residence with panoramic sea views",
      feature: "Floor-to-ceiling windows with smart home integration",
      block: "a",
    },
    {
      type: "A 2+1",
      image: "/images/residence-2.jpg",
      description: "Two-bedroom residence with private balcony",
      feature: "Luxury finishes and underfloor heating",
      block: "a",
    },
    {
      type: "BCD Penthouse",
      image: "/images/residence-3.jpg",
      description: "Exclusive top-floor living with 360° views",
      feature: "Private rooftop terrace with infinity plunge pool",
      block: "bcd",
    },
    {
      type: "BCD 3+1",
      image: "/images/residence-4.jpg",
      description: "Three-bedroom residence with spacious living area",
      feature: "Panoramic terraces and walk-in showers",
      block: "bcd",
    },
  ]

  return (
    <section ref={ref} id="residences" className="bg-[#f8f8f8] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:text-5xl">
          Residences Crafted for Luxury
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#666] md:mb-16">
          705 Luxury Apartments with 180° Uninterrupted Sea View, featuring penthouses with private pools and panoramic
          terraces.
        </p>

        <div
          className={cn(
            "mb-10 transition-all duration-700 md:mb-12",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <Tabs defaultValue="a" className="mx-auto max-w-3xl">
            <TabsList className="grid w-full grid-cols-2">
              {propertyTypes.map((block) => (
                <TabsTrigger key={block.id} value={block.id}>
                  {block.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {propertyTypes.map((block) => (
              <TabsContent key={block.id} value={block.id} className="mt-6 md:mt-8">
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2 md:mb-8 md:gap-3">
                  {block.types.map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-[#0a1a2a]/10 px-3 py-1.5 text-xs text-[#0a1a2a] md:px-4 md:py-2 md:text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {residences.map((residence, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden border-none bg-white shadow-md transition-all duration-700 hover:shadow-lg",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                { "delay-[200ms]": index === 0 },
                { "delay-[400ms]": index === 1 },
                { "delay-[600ms]": index === 2 },
                { "delay-[800ms]": index === 3 },
              )}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={residence.image || "/images/placeholder.jpg"}
                  alt={residence.type}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-lg font-medium text-[#1a1a1a] md:text-xl">{residence.type}</CardTitle>
                <CardDescription className="text-sm text-[#666] md:text-base">{residence.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-5">
                <p className="text-xs text-[#c9a77c] md:text-sm">{residence.feature}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
