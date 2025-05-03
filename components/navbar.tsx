"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Navigation items
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" }, // Keep this as the main link
    { label: "Location", href: "#location" },
    { label: "Residences", href: "#residences" },
    { label: "Amenities", href: "#amenities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Virtual Tour", href: "#virtual-tour" },
    { label: "Contact", href: "#contact" },
  ]

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  // Handle smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      element.scrollIntoView({
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
        isMobileMenuOpen ? "bg-white/80 backdrop-blur-md backdrop-saturate-150" : "",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            aria-label="Go to Querencia home section"
            className="z-10"
          >
            <div className="h-10 w-auto">
              {/* White logo for transparent navbar */}
              <img
                src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/white_logo-BD39Nu2KjDrSHmKNE3zbil8kbxGFeq"
                alt="Querencia Hotel & Residence"
                className={cn(
                  "h-10 w-auto object-contain transition-opacity duration-300",
                  isScrolled ? "hidden" : "block",
                )}
              />
              {/* Dark logo for scrolled navbar */}
              <img
                src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png"
                alt="Querencia Hotel & Residence"
                className={cn(
                  "h-10 w-auto object-contain transition-opacity duration-300",
                  isScrolled ? "block" : "hidden",
                )}
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-4 lg:space-x-8">
              {navItems.map((item) => (
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

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            className={cn(
              "z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all md:hidden",
              isScrolled || isMobileMenuOpen
                ? "text-[#2c4051] bg-[#2c4051]/5 backdrop-blur-sm"
                : "text-white bg-white/20 backdrop-blur-sm",
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay with Improved Opacity */}
      {isMobileMenuOpen && (
      <div className="fixed inset-0 z-0 bg-white/95 backdrop-blur-md backdrop-saturate-150 pt-16 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="flex h-12 items-center border-b border-gray-100 text-lg font-light text-[#2c4051] hover:text-[#c9a77c]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}
