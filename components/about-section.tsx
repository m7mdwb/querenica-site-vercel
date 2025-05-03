"use client"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, PoundSterling, Download } from "lucide-react"

export default function AboutSection() {
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
    <section id="about" ref={ref} className="py-5 md:py-10">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:text-5xl">
          Discover Querencia
        </h2>

        {/* Project Details Cards */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
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
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] sm:h-16 sm:w-16">
                <detail.icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-1 text-sm font-medium tracking-wider text-[#666] sm:mb-2">{detail.title}</h3>
              <p className="text-xl font-light text-[#2c4051] sm:text-2xl">{detail.value}</p>
            </div>
          ))}
        </div>

        {/* About Content */}
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
            <div className="mt-6">
              <Button
                onClick={() => {
                  window.localStorage.setItem("requestCatalog", "true")
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })

                    // Highlight the form
                    setTimeout(() => {
                      const formElement = document.getElementById("contact-form")
                      if (formElement) {
                        formElement.classList.add("highlight-form")
                        setTimeout(() => {
                          formElement.classList.remove("highlight-form")
                        }, 2000)
                      }
                    }, 500)
                  }
                }}
                className="bg-[#c9a77c] text-white hover:bg-[#b89669] flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Catalog
              </Button>
            </div>
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
