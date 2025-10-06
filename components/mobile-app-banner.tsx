"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface MobileAppBannerProps {
  dict: Record<string, string>
  locale: string
}

export default function MobileAppBanner({ dict }: MobileAppBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("mobile-app")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="mobile-app"
      className="py-12 md:py-16 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`text-primary-foreground ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
            style={{ transition: "all 0.8s ease-out", transitionDelay: "200ms" }}
          >
            {/* Section Header */}
            <div className="mb-8">
              <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
                {dict["mobileApp.stayConnected"]}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight font-heading">
                {dict["mobileApp.dovecLife"]}
                <span className="block font-accent text-secondary text-3xl md:text-4xl lg:text-5xl mt-2">
                  {dict["mobileApp.mobileApp"]}
                </span>
              </h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-xl">
                {dict["mobileApp.description"]}
              </p>
            </div>

            {/* Features List */}
            <div className="mb-8">
              <ul className="space-y-4">
                {[
                  dict["mobileApp.feature1"],
                  dict["mobileApp.feature2"],
                  dict["mobileApp.feature3"],
                  dict["mobileApp.feature4"],
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-primary-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* App Store Button */}
              <a
                href="https://apps.apple.com/us/app/d%C3%B6ve%C3%A7-life/id6736398997"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center bg-white/10 backdrop-blur-md text-white px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-80">{dict["mobileApp.downloadOn"]}</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.mycompany.dlife"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center bg-white/10 backdrop-blur-md text-white px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-80">{dict["mobileApp.getItOn"]}</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div
            className={`relative ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            style={{ transition: "all 0.8s ease-out", transitionDelay: "400ms" }}
          >
            <div className="relative max-w-lg mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-3xl blur-3xl scale-110"></div>

              {/* Mobile App Image */}
              <div className="relative">
                <Image
                  src="/images/design-mode/MockUpMobileApp.webp"
                  alt="Döveç Life Mobile App Interface"
                  width={600}
                  height={400}
                  className="w-full h-auto relative z-10"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/30 rounded-full blur-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
