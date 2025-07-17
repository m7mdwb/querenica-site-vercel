"use client"

import Image from "next/image"
import { Download, Calendar, DollarSign, MapPin, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-alabaster to-parchment">
      <div className="container mx-auto px-4">
        {/* ----------  Section header ---------- */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block">
            <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block font-inter">
              {t("about.developerPresents", { developer: t("developer.name") })}
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-primary mb-6 tracking-tight font-playfair">
              {t("about.title")}
            </h2>

            <p className="text-lg text-slate-grey mb-2 font-inter">
              {t("about.luxuryLivingIn", { location: t("about.fullLocation") })}
            </p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto" />
          </div>
        </div>

        {/* ----------  Metrics cards and horizontal timeline ---------- */}
        <div className="bg-parchment/80 backdrop-blur-sm rounded-2xl p-8 border border-secondary/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-16 md:mb-24 transition-all duration-300">
          {/* Location Card */}
          <div className="flex-shrink-0 text-center w-full md:w-[20%] relative pb-8 md:pb-0 md:border-r md:border-secondary/30">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-sm uppercase tracking-wider text-slate-grey mb-1 font-inter">
              {t("about.timeline.cityLabel")}
            </h3>
            <p className="text-2xl font-light text-primary mb-0.5 font-playfair italic">{t("about.timeline.city")}</p>
            <p className="text-sm text-slate-grey/80 font-inter">{t("about.cityRegion")}</p>
          </div>

          {/* Project Timeline (middle element) */}
          <div className="flex-grow flex flex-col items-center justify-center px-4 py-2 md:py-0 w-full md:w-[60%] relative pb-8 md:pb-0 md:border-r md:border-secondary/30">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-sm uppercase tracking-wider text-slate-grey mb-6 font-inter">
              {t("about.timeline.projectTimelineLabel")}
            </h3>
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((phase) => (
                <div key={phase} className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-medium font-inter">
                      {phase}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-primary font-inter">
                        {t(`about.timeline.phase${phase}.name`)}
                      </p>
                      <p className="text-xs text-slate-grey font-inter">{t(`about.timeline.phase${phase}.date`)}</p>
                    </div>
                  </div>
                  {phase < 3 && <ChevronRight className="w-4 h-4 text-slate-grey/60 ml-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Starting Price Card */}
          <div className="flex-shrink-0 text-center w-full md:w-[20%]">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-sm uppercase tracking-wider text-slate-grey mb-1 font-inter">
              {t("about.timeline.startingPriceLabel")}
            </h3>
            <p className="text-2xl font-light text-primary mb-0.5 font-playfair italic">
              {t("about.timeline.startingPrice")}
            </p>
            <p className="text-sm text-slate-grey/80 font-inter">{t("about.accessibleLuxury")}</p>
          </div>
        </div>

        {/* ----------  Two-column main section ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left text column */}
          <div className="flex flex-col justify-between min-h-[500px] md:min-h-[600px] py-8">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground/80 font-inter">{t("about.paragraph1")}</p>

              <p className="text-lg leading-relaxed text-foreground/80 font-inter">{t("about.paragraph2")}</p>

              <p className="text-lg leading-relaxed text-foreground/80 font-inter">{t("about.paragraph3")}</p>
            </div>

            <button
              onClick={() => {
                const element = document.querySelector("#contact")
                if (element) {
                  const navbarHeight = 80 // Approximate navbar height
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY
                  const offsetPosition = elementPosition - navbarHeight - 20

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
              className="group inline-flex items-center bg-gradient-to-r from-secondary to-accent text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-inter text-sm"
            >
              <Download size={20} className="mr-3" />
              <span className="font-medium">{t("about.downloadCatalog")}</span>
            </button>
          </div>

          {/* Right image column */}
          <div className="relative">
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group">
              <Image
                src="https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/About%20Section/Querencia%20Outside-night%20%281%29-gHK4SqDKTsiKN2MUoLDfG7ZDocS9CG.webp"
                alt={`Querencia Luxury Living in ${t("about.fullLocation")}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ----------  Technical specs ---------- */}
      </div>
    </section>
  )
}
