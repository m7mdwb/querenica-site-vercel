"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"
import { LanguageSelector } from "./language-selector"

export default function Navbar() {
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navbarRef = useRef<HTMLElement>(null)
  const isNavigatingFromMenu = useRef(false)

  const shouldShowDarkElements = isScrolled || isMobileMenuOpen

  // Logo URLs - using the updated Querencia logos
  const whiteLogoUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_logo_querencia-c1yecf3hxKXUjzc7t4YQdMAwsbiC97.png"
  const darkLogoUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark_logo_querencia-RKneFVNYlNklaf0DSks551nwWQaotI.png"

  const navLinks = [
    { name: t("navbar.home"), href: "#home" },
    { name: t("navbar.about"), href: "#about" },
    { name: t("navbar.location"), href: "#location" },
    { name: t("navbar.residences"), href: "#residences" },
    { name: t("navbar.amenities"), href: "#amenities" },
    { name: t("navbar.gallery"), href: "#gallery" },
    { name: t("navbar.virtualTour"), href: "#virtual-tour" },
    { name: t("navbar.contact"), href: "#contact" },
  ]

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
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (isMobileMenuOpen) {
      const savedScrollPosition = window.scrollY
      body.style.position = "fixed"
      body.style.width = "100%"
      body.style.top = `-${savedScrollPosition}px`
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      const topStyle = body.style.top
      if (!isNavigatingFromMenu.current && topStyle) {
        const scrollYToRestore = Number.parseInt(topStyle.replace("px", ""), 10) * -1

        body.style.position = ""
        body.style.width = ""
        body.style.top = ""
        body.style.paddingRight = ""
        html.style.overflow = ""
        body.style.overflow = ""

        if (!isNaN(scrollYToRestore) && scrollYToRestore >= 0) {
          window.scrollTo(0, scrollYToRestore)
        }
      }
      isNavigatingFromMenu.current = false
    }

    return () => {
      html.style.overflow = ""
      body.style.overflow = ""
      body.style.position = ""
      body.style.width = ""
      body.style.top = ""
      body.style.paddingRight = ""
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    isNavigatingFromMenu.current = true
    setIsMobileMenuOpen(false)

    setTimeout(() => {
      const element = document.querySelector(href)
      if (element && navbarRef.current) {
        const navbarHeight = navbarRef.current.offsetHeight
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - navbarHeight - 20

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  const navTextColor = shouldShowDarkElements ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"

  const mobileMenuIconColor = shouldShowDarkElements
    ? "text-primary hover:text-secondary"
    : "text-white hover:text-secondary"

  return (
    <nav
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b transition-colors",
        isMobileMenuOpen
          ? "bg-white shadow-2xl border-secondary/20"
          : isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-secondary/20"
            : "bg-transparent border-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#home")
            }}
            className="relative z-[60] flex-shrink-0"
            aria-label="Querencia Home"
          >
            <div className="h-10 w-auto sm:h-12 md:h-14 transition-all duration-500">
              {/* White Logo */}
              <Image
                src={whiteLogoUrl || "/placeholder.svg"}
                alt="Querencia Logo Light"
                width={200}
                height={60}
                className={cn(
                  "h-full w-auto object-contain transition-opacity duration-500 ease-in-out",
                  shouldShowDarkElements ? "opacity-0 pointer-events-none" : "opacity-100",
                )}
                priority
              />
              {/* Dark Logo */}
              <Image
                src={darkLogoUrl || "/placeholder.svg"}
                alt="Querencia Logo Dark"
                width={200}
                height={60}
                className={cn(
                  "absolute inset-0 h-full w-auto object-contain transition-opacity duration-500 ease-in-out",
                  shouldShowDarkElements ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={cn(
                  "text-sm font-light tracking-wide transition-all duration-300 relative group font-inter",
                  navTextColor,
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <div className="ml-4">
              <LanguageSelector isScrolled={shouldShowDarkElements} className={navTextColor} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-[60]">
            <button
              onClick={() => {
                isNavigatingFromMenu.current = false
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-xl focus:outline-none transition-all duration-300 hover:bg-white/10",
                mobileMenuIconColor,
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[55] md:hidden transition-transform duration-500 ease-in-out transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="absolute inset-0 bg-white shadow-2xl"></div>
        <div className="h-full w-full overflow-y-auto pt-20 pb-10 px-6">
          <ul className="flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                className="transform transition-all duration-500 ease-out"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(30px)",
                  transitionDelay: isMobileMenuOpen ? `${100 + index * 75}ms` : "0ms",
                }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="block px-4 py-4 rounded-xl text-base font-light text-primary hover:text-secondary hover:bg-alabaster transition-all duration-300 relative group font-inter"
                >
                  {link.name}
                  <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-8"></span>
                </a>
              </li>
            ))}

            {/* Language Selector in Mobile Menu */}
            <li
              className="transform transition-all duration-500 ease-out pt-6 flex justify-center"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(30px)",
                transitionDelay: isMobileMenuOpen ? `${100 + navLinks.length * 75}ms` : "0ms",
              }}
            >
              <LanguageSelector
                isMobile
                mobileMenuOpen={isMobileMenuOpen}
                className="text-primary hover:text-secondary"
              />
            </li>

            {/* Contact Information */}
            <li
              className="transform transition-all duration-500 ease-out pt-8 px-4"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(30px)",
                transitionDelay: isMobileMenuOpen ? `${100 + (navLinks.length + 1) * 75}ms` : "0ms",
              }}
            >
              <div className="border-t border-secondary/20 pt-6">
                <p className="text-sm font-light text-slate-grey mb-3 font-inter">{t("navbar.getInTouch")}</p>
                <div className="space-y-2">
                  <a
                    href="tel:+905488370015"
                    className="block text-primary hover:text-secondary transition-colors duration-300 font-inter"
                  >
                    +90 548 837 0015
                  </a>
                  <a
                    href="mailto:info@dovecgroup.com"
                    className="block text-primary hover:text-secondary transition-colors duration-300 font-inter"
                  >
                    info@dovecgroup.com
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
