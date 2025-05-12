"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

export default function VirtualTourSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  // Define the Google Site URL
  const virtualTourUrl = "https://360.dovecconstruction.com/querencia/"

  return (
    <section ref={ref} id="virtual-tour" className="bg-[#2c4051] py-24 text-white md:py-32 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-light tracking-wider sm:text-4xl md:text-5xl">
          {t("virtualTour.title")}
        </h2>

        {/* Animation container */}
        <div
          className={cn(
            "mx-auto max-w-5xl transition-all duration-1000",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          {/* Container maintaining the aspect ratio and styling */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-[#3a526a]">
            <iframe
              src={virtualTourUrl}
              title="Querencia 360 Virtual Tour"
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              allowFullScreen
            >
              {/* Fallback content for browsers that don't support iframes */}
              {t("virtualTour.fallbackText")}{" "}
              <a href={virtualTourUrl} target="_blank" rel="noopener noreferrer">
                {t("common.here")}
              </a>
              .
            </iframe>
          </div>

          {/* Keep the descriptive text below the tour */}
          <div className="mt-8 text-center">
            <p className="text-[#8a9bae]">{t("virtualTour.description")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
