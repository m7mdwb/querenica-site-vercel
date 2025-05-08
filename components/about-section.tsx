"use client"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import ProjectDetailsShowcase, { type ProjectPhase } from "./project-details-showcase"

export default function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  // Project phases data with block information
  const projectPhases: ProjectPhase[] = [
    {
      id: 1,
      name: "Phase 1",
      completionDate: "April 2026",
      description: "First Signature Homes",
      blocks: "Block A",
    },
    {
      id: 2,
      name: "Phase 2",
      completionDate: "December 2026",
      description: "New Homes & Amenities",
      blocks: "Block B",
    },
    {
      id: 3,
      name: "Phase 3",
      completionDate: "June 2027",
      description: "The Vision Perfected",
      blocks: "Block C & D",
    },
  ]

  return (
    <section id="about" ref={ref} className="py-5 md:py-10 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:text-5xl">
          Discover Querencia
        </h2>

        {/* Integrated Project Details Showcase */}
        <div
          className={cn(
            "mb-16 transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <ProjectDetailsShowcase city="TRIKOMO" startingPrice="£ 145.000" phases={projectPhases} />
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
              src="https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/About%20Section/Querencia%20Outside-night%20%281%29-gHK4SqDKTsiKN2MUoLDfG7ZDocS9CG.webp"
              alt="Querencia luxury living"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
