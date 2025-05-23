"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils" // Assuming you have this
// Import chosen Lucide icons
import { Waves, Leaf, Users, Baby, ParkingSquare, UserCheck, Store, Dumbbell } from "lucide-react"

// Define your D-Point specific amenities for the icon grid (icons and names only)
const dPointAmenitiesList = [
  { name: "Resort-Style Pool", icon: Waves },
  { name: "Landscaped Gardens", icon: Leaf },
  { name: "Social Lounges", icon: Users },
  { name: "Children's Play Area", icon: Baby },
  { name: "Secure Parking", icon: ParkingSquare },
  { name: "Concierge Services", icon: UserCheck },
  { name: "Retail Conveniences", icon: Store },
  { name: "Fitness Center", icon: Dumbbell }, // Example
]

// Select a subset for 2 rows (e.g., 8 items for 4 columns, or 6 for 3 columns)
const displayedAmenities = dPointAmenitiesList.slice(0, 8)
// Or for 2 rows with 3 items each = 6 items
// const displayedAmenities = dPointAmenitiesList.slice(0, 6);

export default function AmenitiesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const gridColsClass = displayedAmenities.length <= 6 ? "md:grid-cols-3" : "md:grid-cols-4"

  return (
    <section id="amenities" className="py-20 md:py-28 bg-[#F8F9FA] scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#31325b] mb-4">
            Unparalleled Amenities
          </h2>
          <div className="w-20 h-1 bg-[#c6a55d] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            Enhancing your everyday with features designed for comfort, convenience, and delight.
          </p>
        </div>

        <div ref={ref} className={`grid grid-cols-2 ${gridColsClass} gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12`}>
          {displayedAmenities.map((amenity, index) => {
            const columnCount = displayedAmenities.length <= 6 ? 3 : 4
            const columnPosition = index % columnCount
            let delayClass = ""
            if (inView) {
              delayClass =
                columnPosition === 0
                  ? "delay-0"
                  : columnPosition === 1
                    ? "delay-150"
                    : columnPosition === 2
                      ? "delay-300"
                      : "delay-[450ms]"
            }

            return (
              <div
                key={amenity.name}
                className={cn(
                  "flex flex-col items-center text-center transition-all duration-700 ease-out h-full group",
                  inView ? `translate-y-0 opacity-100 ${delayClass}` : "translate-y-10 opacity-0",
                )}
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-5
                             bg-white border border-gray-200 
                             shadow-lg group-hover:shadow-xl 
                             group-hover:border-[#c6a55d] transition-all duration-300 flex-shrink-0
                             transform group-hover:scale-105"
                >
                  <amenity.icon
                    className="w-9 h-9 sm:w-11 sm:h-11 text-[#31325b] group-hover:text-[#c6a55d] transition-colors duration-300 z-10"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-md sm:text-lg font-medium text-[#31325b] tracking-wide line-clamp-2 min-h-[2.8em] sm:min-h-[3em] flex items-center justify-center">
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
