"use client"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import ProjectTimeline from "./project-timeline"
import { useLanguage } from "@/lib/i18n/context"

export default function AboutSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  // Project phases data from translations
  const projectPhases = [
    {
      id: 1,
      name: t("about.timeline.phase1.name"),
      date: t("about.timeline.phase1.date"),
      description: t("about.timeline.phase1.description"),
      blocks: t("about.timeline.phase1.blocks"),
    },
    {
      id: 2,
      name: t("about.timeline.phase2.name"),
      date: t("about.timeline.phase2.date"),
      description: t("about.timeline.phase2.description"),
      blocks: t("about.timeline.phase2.blocks"),
    },
    {
      id: 3,
      name: t("about.timeline.phase3.name"),
      date: t("about.timeline.phase3.date"),
      description: t("about.timeline.phase3.description"),
      blocks: t("about.timeline.phase3.blocks"),
    },
  ]

  return (
    <section id="about" ref={ref} className="py-5 md:py-10 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:text-5xl">
          {t("about.title")}
        </h2>

        {/* Project Timeline */}
        <div
          className={cn(
            "transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <ProjectTimeline
            city={t("about.timeline.city")}
            startingPrice={t("about.timeline.startingPrice")}
            phases={projectPhases}
          />
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div
            className={cn(
              "flex flex-col justify-center transition-all duration-1000 ease-out",
              inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
            )}
          >
            <p className="mb-6 text-lg leading-relaxed text-[#333]">{t("about.paragraph1")}</p>
            <p className="mb-6 text-lg leading-relaxed text-[#333]">{t("about.paragraph2")}</p>
            <p className="text-lg leading-relaxed text-[#333]">{t("about.paragraph3")}</p>

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
                {t("about.downloadCatalog")}
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
