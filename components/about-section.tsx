"use client"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

export default function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section id="about" ref={ref} className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:text-5xl">
          Discover Querencia
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div
            className={cn(
              "flex flex-col justify-center transition-all duration-1000 ease-out",
              inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
            )}
          >
            <p className="mb-6 text-lg leading-relaxed text-[#333]">
              Querencia represents the pinnacle of luxury living, where architectural brilliance meets uncompromising
              quality. Nestled in one of North Cyprus's most coveted locations, this exclusive development offers a
              sanctuary for those who demand excellence.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-[#333]">
              Each residence is meticulously crafted with premium materials and finishes, creating living spaces that
              are both timeless and contemporary. The attention to detail extends beyond the interiors to the carefully
              curated amenities and services.
            </p>
            <p className="text-lg leading-relaxed text-[#333]">
              Querencia isn't merely a residence—it's a statement of discernment and achievement, offering a lifestyle
              that few will experience but many will aspire to.
            </p>
          </div>

          <div
            className={cn(
              "overflow-hidden rounded-lg transition-all delay-300 duration-1000 ease-out",
              inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
            )}
          >
            <img
              src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Querencia%20Outside-night-Ninsee9pXTQh3zaUkshRPYtwse34GA.webp"
              alt="Querencia luxury living"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
