"use client"

import { useLanguage } from "@/lib/i18n/context"

export default function VirtualTourSection() {
  const { t } = useLanguage()

  return (
    <section id="virtual-tour" className="py-32 bg-gradient-to-b from-platinum-100 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-0">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {t("virtualTour.virtualExperience")}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6 tracking-tight">
            {t("virtualTour.immerseYourself").split(" ")[0]}
            <span className="block font-serif italic text-secondary" style={{ fontFamily: "var(--font-bodoni)" }}>
              {t("virtualTour.immerseYourself").split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-lg text-platinum-600 max-w-3xl mx-auto leading-relaxed">{t("virtualTour.introText")}</p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        {/* Virtual Tour Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm border border-platinum-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-platinum-300/20 transition-all duration-700">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-platinum-100 to-luxury-100">
              <iframe
                src="https://360.dovecgroup.com/querencia/"
                className="w-full h-full border-0 rounded-xl"
                allowFullScreen
                title="Querencia 360° Virtual Tour"
                loading="lazy"
              />

              {/* Loading overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="text-center text-primary">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10,8 16,12 10,16 10,8"></polygon>
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">{t("virtualTour.tourTitle")}</p>
                  <p className="text-sm text-platinum-600">{t("virtualTour.tourSubtitle")}</p>
                </div>
              </div>
            </div>

            {/* Tour Information */}
            

            {/* Call to Action */}
            <div className="text-center mt-8">
              <button
                onClick={() => window.open("https://360.dovecgroup.com/querencia/", "_blank")}
                className="inline-flex items-center bg-gradient-to-r from-secondary to-accent text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3 relative z-10"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10,17 15,12 10,7"></polyline>
                  <line x1="15" x2="3" y1="12" y2="12"></line>
                </svg>
                <span className="font-medium relative z-10">{t("virtualTour.openFullScreenTour")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
