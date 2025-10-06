"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config"

interface LanguageSelectorProps {
  currentLocale: Locale
  isScrolled?: boolean
  isMobile?: boolean
  mobileMenuOpen?: boolean
  className?: string
}

export function LanguageSelector({
  currentLocale,
  isScrolled,
  isMobile,
  mobileMenuOpen,
  className,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = locales.map((code) => ({
    code,
    name: localeNames[code],
    flag: localeFlags[code],
  }))

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isMobile && !mobileMenuOpen) {
      setIsOpen(false)
    }
  }, [isMobile, mobileMenuOpen])

  const changeLanguage = (newLocale: Locale) => {
    // Set cookie for preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`

    // Get the current path without locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || ""

    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center space-x-2 px-4 py-3 rounded-xl border border-platinum-200 bg-white hover:bg-luxury-50 transition-all duration-300",
            className,
          )}
          aria-expanded={isOpen}
        >
          <Globe className="h-5 w-5" />
          <span className="font-light">{currentLanguage.name}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
        </button>

        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-platinum-200 overflow-hidden transition-all duration-300 origin-top z-50",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-luxury-50 transition-colors duration-200",
                lang.code === currentLocale ? "text-secondary bg-luxury-50" : "text-primary",
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-light">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10",
          isScrolled ? "text-primary" : "text-white",
          className,
        )}
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-light tracking-wide">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 min-w-[140px] bg-white rounded-xl shadow-xl border border-platinum-200 overflow-hidden transition-all duration-300 origin-top-right z-50",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
        )}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-luxury-50 transition-colors duration-200",
              lang.code === currentLocale ? "text-secondary bg-luxury-50" : "text-primary",
            )}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-light">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
