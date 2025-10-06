"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageSelector } from "./language-selector"
import type { Locale } from "@/lib/i18n/config"

interface NavbarProps {
  dict: Record<string, string>
  locale: Locale
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navbarRef = useRef<HTMLElement>(null)

  const shouldShowDarkElements = isScrolled || isMobileMenuOpen

  const whiteLogoUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_logo_querencia-c1yecf3hxKXUjzc7t4YQdMAwsbiC97.png"
  const darkLogoUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark_logo_querencia-RKneFVNYlNklaf0DSks551nwWQaotI.png"

  const navLinks = [
    { name: dict["navbar.home"], href: `/${locale}#home` },
    { name: dict["navbar.about"], href: `/${locale}#about` },
    { name: dict["navbar.location"], href: `/${locale}#location` },
    { name: dict["navbar.residences"], href: `/${locale}#residences` },
    { name: dict["navbar.amenities"], href: `/${locale}#amenities` },
    { name: dict["navbar.gallery"], href: `/${locale}#gallery` },
    { name: dict["navbar.virtualTour"], href: `/${locale}#virtual-tour` },
    { name: dict["navbar.contact"], href: `/${locale}#contact` },
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

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    const hash = href.split("#")[1]
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element && navbarRef.current) {
          const navbarHeight = navbarRef.current.offsetHeight
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: elementPosition - navbarHeight - 20,
            behavior: "smooth",
          })
        }
      }, 100)
    }
  }

  const navTextColor = shouldShowDarkElements ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"

  return (
    <nav
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b",
        isMobileMenuOpen
          ? "bg-white shadow-2xl border-secondary/20"
          : isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-secondary/20"
            : "bg-transparent border-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Link href={`/${locale}`} className="relative z-[60] flex-shrink-0">
            <div className="h-10 w-auto sm:h-12 md:h-14 transition-all duration-500">
              <Image
                src={whiteLogoUrl || "/placeholder.svg"}
                alt="Querencia Logo"
                width={200}
                height={60}
                className={cn(
                  "h-full w-auto object-contain transition-opacity duration-500",
                  shouldShowDarkElements ? "opacity-0 pointer-events-none" : "opacity-100",
                )}
                priority
              />
              <Image
                src={darkLogoUrl || "/placeholder.svg"}
                alt="Querencia Logo"
                width={200}
                height={60}
                className={cn(
                  "absolute inset-0 h-full w-auto object-contain transition-opacity duration-500",
                  shouldShowDarkElements ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              />
            </div>
          </Link>

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
                  "text-sm font-light tracking-wide transition-all duration-300 relative group",
                  navTextColor,
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <div className="ml-4">
              <LanguageSelector currentLocale={locale} isScrolled={shouldShowDarkElements} />
            </div>
          </div>

          <div className="md:hidden z-[60]">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-xl focus:outline-none transition-all duration-300",
                shouldShowDarkElements ? "text-primary hover:text-secondary" : "text-white hover:text-secondary",
              )}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[55] md:hidden transition-transform duration-500",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="absolute inset-0 bg-white" />
        <div className="h-full w-full overflow-y-auto pt-20 pb-10 px-6">
          <ul className="flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                className="transform transition-all duration-500"
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
                  className="block px-4 py-4 rounded-xl text-base font-light text-primary hover:text-secondary hover:bg-alabaster transition-all duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-6 flex justify-center">
              <LanguageSelector currentLocale={locale} isMobile mobileMenuOpen={isMobileMenuOpen} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
