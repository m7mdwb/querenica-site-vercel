"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Phone, Mail, Download, Home } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import ProjectCarousel from "@/components/project-carousel"

export default function ThankYouPage() {
  const { t, locale } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Function to get the correct catalog URL based on current locale
  const getCatalogUrl = () => {
    switch (locale) {
      case "tr":
        return "https://sites.google.com/view/courtyard-platinum---tr/"
      case "en":
        return "https://sites.google.com/view/catalog-en/"
      case "ru":
        return "https://sites.google.com/view/catalog-ru/"
      case "de":
        return "https://sites.google.com/view/catalog-de/"
      default:
        return "https://sites.google.com/view/catalog-en/" // fallback to English
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-50 to-platinum-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Language Selector - Top Right Corner */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageSelector />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-platinum-600 mb-8">
          <Home className="w-4 h-4 mr-2" />
          <Link href="/" className="hover:text-secondary transition-colors">
            {t("navbar.home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-secondary">{t("thankYou.title")}</span>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white/95 backdrop-blur-sm border border-platinum-200 rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-all duration-700 text-center ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Logo */}
            <div className="mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark_logo_querencia-RKneFVNYlNklaf0DSks551nwWQaotI.png"
                alt="Querencia"
                className="h-20 mx-auto"
              />
            </div>

            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-secondary" />
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-light text-primary mb-6 tracking-tight">{t("thankYou.title")}</h1>
            <p className="text-lg text-platinum-600 max-w-2xl mx-auto leading-relaxed mb-12">
              {t("thankYou.subtitle")}
            </p>

            {/* What Happens Next */}
            <div className="mb-12">
              <h2 className="text-2xl font-light text-primary mb-8">{t("thankYou.whatHappensNext")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-6 border border-secondary/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium mb-4">
                    1
                  </div>
                  <p className="text-platinum-700 text-sm leading-relaxed">{t("thankYou.step1")}</p>
                </div>
                <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-6 border border-secondary/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium mb-4">
                    2
                  </div>
                  <p className="text-platinum-700 text-sm leading-relaxed">{t("thankYou.step2")}</p>
                </div>
                <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-6 border border-secondary/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium mb-4">
                    3
                  </div>
                  <p className="text-platinum-700 text-sm leading-relaxed">{t("thankYou.step3")}</p>
                </div>
              </div>
            </div>

            {/* Immediate Assistance */}
            <div className="mb-12">
              <h3 className="text-xl font-light text-primary mb-6">{t("thankYou.immediateAssistance")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl border border-secondary/20 p-6 flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-platinum-600 mb-1">{t("thankYou.callDirectly")}</p>
                    <a
                      href="tel:+905488370015"
                      className="text-lg text-primary hover:text-secondary transition-colors duration-300 font-medium"
                    >
                      +90 548 837 0015
                    </a>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl border border-secondary/20 p-6 flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-platinum-600 mb-1">{t("thankYou.emailTeam")}</p>
                    <a
                      href="mailto:info@dovecgroup.com"
                      className="text-lg text-primary hover:text-secondary transition-colors duration-300 font-medium"
                    >
                      info@dovecgroup.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Catalog Button */}
            <div className="mb-8">
              <a
                href={getCatalogUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-secondary to-accent text-white py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:scale-105 flex items-center justify-center font-medium relative overflow-hidden mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Download size={20} className="mr-3 relative z-10" />
                <span className="relative z-10">{t("thankYou.downloadCatalog")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* View Our Other Projects Section - Now a component */}
        <ProjectCarousel />
      </div>
    </div>
  )
}
