"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

// Navigation items extracted as a constant outside the component
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Virtual Tour", href: "#virtual-tour" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Determine which logo to show based on scroll position and mobile menu state
  const shouldShowDarkLogo = isScrolled || isMobileMenuOpen

  // Combined effect for scroll and resize listeners
  useEffect(() => {
    // Handle scroll event to change navbar appearance
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    // Close mobile menu when window is resized to desktop size
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    // Control body scroll when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""

    // Initial check
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Handle smooth scrolling with proper offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      // Get the navbar height to use as offset
      const navbar = document.querySelector("nav")
      const navbarHeight = navbar ? navbar.offsetHeight : 0

      // Calculate the element's position relative to the document
      const elementPosition = element.getBoundingClientRect().top + window.scrollY

      // Scroll to the element with offset for the navbar
      window.scrollTo({
        top: elementPosition - navbarHeight - 16, // Additional 16px buffer for spacing
        behavior: "smooth",
      })
    }
  }

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/60 backdrop-blur-md backdrop-saturate-150 border-b border-white/20 shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            aria-label="Go to Querencia home section"
            className="z-50"
          >
            <div className="h-10 w-auto md:h-12 lg:h-14">
              {/* White logo for transparent navbar */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_logo_querencia-c1yecf3hxKXUjzc7t4YQdMAwsbiC97.png"
                alt="Querencia Hotel & Residence"
                className={cn(
                  "h-10 w-auto md:h-12 lg:h-14 object-contain transition-opacity duration-300",
                  shouldShowDarkLogo ? "hidden" : "block",
                )}
              />
              {/* Dark logo for scrolled navbar or open mobile menu */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark_logo_querencia-RKneFVNYlNklaf0DSks551nwWQaotI.png"
                alt="Querencia Hotel & Residence"
                className={cn(
                  "h-10 w-auto md:h-12 lg:h-14 object-contain transition-opacity duration-300",
                  shouldShowDarkLogo ? "block" : "hidden",
                )}
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-4 lg:space-x-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "z-50 flex h-10 w-10 items-center justify-center rounded-full transition-all md:hidden",
              isScrolled || isMobileMenuOpen
                ? "text-[#2c4051] bg-white/80 backdrop-blur-sm"
                : "text-white bg-white/20 backdrop-blur-sm",
              isMobileMenuOpen && "shadow-lg",
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md transition-all duration-500 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#2c4051]/20"></div>
          <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full border border-[#c9a77c]/20"></div>
        </div>

        <div className="container mx-auto px-8 py-16 relative z-10">
          <ul className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.label}
                className="transform transition-all duration-500"
                style={{
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(2rem)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transitionDelay: isMobileMenuOpen ? `${100 + index * 50}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="group flex items-center py-2 text-xl font-light text-[#2c4051] transition-colors"
                >
                  <span className="relative overflow-hidden">
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#c9a77c] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Contact info */}
          <div
            className="mt-12 transition-all duration-500"
            style={{
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(2rem)",
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: isMobileMenuOpen ? "500ms" : "0ms",
            }}
          >
            <p className="mb-2 text-sm font-light text-[#666]">Get in touch</p>
            <a href="tel:+905488370015" className="block text-lg text-[#2c4051] hover:text-[#c9a77c]">
              +90 548 837 0015
            </a>
            <a href="mailto:info@dovecgroup.com" className="text-lg text-[#2c4051] hover:text-[#c9a77c]">
              info@dovecgroup.com
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
