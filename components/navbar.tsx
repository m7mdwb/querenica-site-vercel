"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/lib/i18n/context"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [savedScrollPosition, setSavedScrollPosition] = useState(0)
  const { t } = useLanguage()
  const navbarRef = useRef<HTMLElement>(null)
  const isNavigatingFromMenu = useRef(false)

  const shouldShowDarkLogo = isScrolled || isMobileMenuOpen

  const NAV_ITEMS = [
    { label: t("navbar.home"), href: "#home" },
    { label: t("navbar.about"), href: "#about" },
    { label: t("navbar.location"), href: "#location" },
    { label: t("navbar.residences"), href: "#residences" },
    { label: t("navbar.amenities"), href: "#amenities" },
    { label: t("navbar.gallery"), href: "#gallery" },
    { label: t("navbar.virtualTour"), href: "#virtual-tour" },
    { label: t("navbar.contact"), href: "#contact" },
  ]

  useEffect(() => {
    // Get scrollbar width once on component mount
    const getScrollbarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth
    }

    const scrollbarWidth = getScrollbarWidth()
    const body = document.body
    const html = document.documentElement

    if (isMobileMenuOpen) {
      // Save current scroll position before locking
      const currentScrollY = window.scrollY
      setSavedScrollPosition(currentScrollY)

      // Apply a class to the body that will be used for CSS transitions
      body.classList.add("menu-open")

      // Important: Apply these styles synchronously in the correct order
      // 1. First add padding to compensate for scrollbar (prevents layout shift)
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`
      }

      // 2. Then fix the position and set top (after padding is applied)
      body.style.position = "fixed"
      body.style.width = "100%"
      body.style.top = `-${currentScrollY}px`

      // 3. Finally prevent scrolling
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
    } else {
      // Remove styles in the correct order to prevent visual glitches
      // 1. First remove the menu-open class
      body.classList.remove("menu-open")

      // 2. Store the current top position before unlocking scroll
      const scrollY = Number.parseInt(body.style.top || "0") * -1

      // 3. Reset all styles
      html.style.overflow = ""
      body.style.overflow = ""
      body.style.position = ""
      body.style.width = ""
      body.style.top = ""
      body.style.paddingRight = ""

      // 4. Restore scroll position only if not navigating from menu
      if (!isNavigatingFromMenu.current && savedScrollPosition >= 0) {
        window.scrollTo(0, scrollY)
      }

      // Reset the navigation flag
      isNavigatingFromMenu.current = false
    }
  }, [isMobileMenuOpen, savedScrollPosition])

  // Effect for scroll and resize listeners
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobileMenuOpen) {
        setIsScrolled(window.scrollY > 50)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)

      // Ensure we clean up ALL scroll locking styles if component unmounts
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.paddingRight = ""
      document.body.classList.remove("menu-open")
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault()
    isNavigatingFromMenu.current = true
    setIsMobileMenuOpen(false)

    setTimeout(() => {
      const targetId = href.replace("#", "")
      const element = document.getElementById(targetId)
      if (element) {
        const navbar = navbarRef.current
        const navbarHeight = navbar ? navbar.offsetHeight : 0
        const offset = navbarHeight + 20
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const scrollToPosition = elementPosition - offset

        window.scrollTo({
          top: Math.max(0, scrollToPosition),
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <nav
      ref={navbarRef}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isMobileMenuOpen
          ? "bg-white shadow-md"
          : isScrolled
            ? "bg-white/60 backdrop-blur-md backdrop-saturate-150 border-b border-white/20 shadow-lg"
            : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo - z-index ensures it stays above the mobile menu */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            aria-label="Go to Querencia home section"
            className="relative z-[60]"
          >
            <div className="h-10 w-auto md:h-12 lg:h-14">
              {/* Light Logo */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_logo_querencia-c1yecf3hxKXUjzc7t4YQdMAwsbiC97.png"
                alt="Querencia Hotel & Residence Light Logo"
                className={cn(
                  "h-full w-auto object-contain transition-opacity duration-300",
                  shouldShowDarkLogo ? "opacity-0 pointer-events-none" : "opacity-100",
                )}
              />
              {/* Dark Logo - Absolutely positioned to overlay */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark_logo_querencia-RKneFVNYlNklaf0DSks551nwWQaotI.png"
                alt="Querencia Hotel & Residence Dark Logo"
                className={cn(
                  "absolute inset-0 h-full w-auto object-contain transition-opacity duration-300",
                  shouldShowDarkLogo ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <ul className="flex space-x-4 lg:space-x-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={cn(
                      "text-sm font-light tracking-wide transition-colors hover:text-[#c9a77c]",
                      isScrolled ? "text-[#2c4051]" : "text-white",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="ml-4 lg:ml-8">
              <LanguageSelector isScrolled={isScrolled} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "z-[60] flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 md:hidden",
              isMobileMenuOpen
                ? "bg-slate-100 text-[#2c4051] shadow-md"
                : isScrolled
                  ? "bg-white/80 text-[#2c4051] backdrop-blur-sm"
                  : "bg-white/20 text-white backdrop-blur-sm",
            )}
            onClick={() => {
              isNavigatingFromMenu.current = false
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Fixed overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[55] md:hidden transition-opacity duration-300 ease-in-out will-change-transform will-change-opacity",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        style={{
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Solid white background for the entire menu */}
        <div className="absolute inset-0 bg-white shadow-2xl"></div>

        {/* Fixed header area with solid background to prevent content from scrolling behind the logo */}
        <div className="mobile-menu-header"></div>

        {/* Scrollable content area that starts below the fixed header */}
        <div
          className="relative h-full w-full overflow-y-auto mobile-menu-scroll mobile-menu-content"
          style={{
            overflowX: "hidden",
            maxWidth: "100vw",
            willChange: "transform, opacity",
          }}
        >
          <ul className="flex flex-col space-y-5 pt-2">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className="transform transition-all duration-300 ease-out"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(1rem)",
                  transitionDelay: isMobileMenuOpen ? `${75 + index * 50}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="group flex items-center py-2.5 text-lg font-light text-[#2c4051] transition-colors active:text-[#c9a77c]"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <span className="relative w-full">
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#c9a77c] transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
                  </span>
                </a>
              </li>
            ))}
            {/* Language selector with staggered animation */}
            <li
              className="transform transition-all duration-300 ease-out"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(1rem)",
                transitionDelay: isMobileMenuOpen ? `${75 + NAV_ITEMS.length * 50}ms` : "0ms",
              }}
            >
              <LanguageSelector isMobile mobileMenuOpen={isMobileMenuOpen} />
            </li>
          </ul>

          {/* Contact information at the bottom */}
          <div className="mt-auto pt-8 px-6 pb-8">
            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(1rem)",
                transitionDelay: isMobileMenuOpen ? `${75 + (NAV_ITEMS.length + 1) * 50 + 100}ms` : "0ms",
              }}
            >
              <p className="mb-2 text-sm font-light text-[#666]">{t("navbar.getInTouch")}</p>
              <a
                href="tel:+905488370015"
                className="block text-lg text-[#2c4051] hover:text-[#c9a77c] active:text-[#c9a77c]"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                +90 548 837 0015
              </a>
              <a
                href="mailto:info@dovecgroup.com"
                className="block text-lg text-[#2c4051] hover:text-[#c9a77c] active:text-[#c9a77c]"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                info@dovecgroup.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
