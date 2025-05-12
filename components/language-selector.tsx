"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage, type Language, languageNames } from "@/lib/i18n/context"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface LanguageSelectorProps {
  isMobile?: boolean
  mobileMenuOpen?: boolean
  index?: number
  isScrolled?: boolean
}

export function LanguageSelector({ isMobile, mobileMenuOpen, index, isScrolled }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Language options with flags
  const languages: { code: Language; flag: string }[] = [
    { code: "en", flag: "🇬🇧" },
    { code: "tr", flag: "🇹🇷" },
    { code: "de", flag: "🇩🇪" },
    { code: "ru", flag: "🇷🇺" },
  ]

  // Close dropdown when clicking outside
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

  // Get current language data
  const currentLanguage = languages.find((lang) => lang.code === language)

  // Handle language change with URL update
  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)

    // Update URL to reflect language change
    if (pathname.includes("/thank-you")) {
      // If on thank you page, navigate to language-specific thank you page
      router.push(`/${langCode}/thank-you`)
    } else {
      // Check if we're already on a language route
      const currentLangMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
      if (currentLangMatch) {
        // Replace current language with new language
        router.push(pathname.replace(/^\/[a-z]{2}/, `/${langCode}`))
      } else {
        // Add language to current path
        router.push(`/${langCode}${pathname}`)
      }
    }
  }

  // Mobile version with smaller cards
  if (isMobile) {
    return (
      <div
        className="transform transition-all duration-500"
        ref={dropdownRef}
        style={{
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(2rem)",
          opacity: mobileMenuOpen ? 1 : 0,
          transitionDelay: mobileMenuOpen ? `${100 + (index || 0) * 50}ms` : "0ms",
        }}
      >
        <div className="py-2 text-xl font-light text-[#2c4051]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center py-2 text-xl font-light text-[#2c4051] transition-colors"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className="relative overflow-hidden flex items-center">
              <span className="text-base mr-2">{currentLanguage?.flag}</span>
              {languageNames[language]}
              <ChevronDown className={cn("ml-2 h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")} />
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#c9a77c] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>

          {/* Compact language selection cards */}
          <div
            className={cn(
              "mt-2 bg-gray-50 rounded-lg shadow-sm transition-all duration-200",
              isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
            )}
          >
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                    language === lang.code ? "bg-[#c9a77c]/10 text-[#c9a77c]" : "text-[#2c4051] hover:bg-gray-100",
                  )}
                >
                  <span className="text-base mr-2">{lang.flag}</span>
                  <span>{languageNames[lang.code]}</span>
                  {language === lang.code && <span className="ml-auto h-2 w-2 rounded-full bg-[#c9a77c]"></span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop version with navbar color matching
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isOpen ? "bg-white/10" : "",
          "hover:bg-white/10",
          isScrolled ? "text-[#2c4051]" : "text-white", // Match navbar text color
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-base mr-1">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{languageNames[language]}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {/* Dropdown menu */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />}

      <div
        className={cn(
          "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-50 transition-all duration-200 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
        )}
      >
        <div className="py-1" role="menu" aria-orientation="vertical">
          {languages.map(({ code, flag }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm flex items-center justify-between",
                code === language ? "bg-[#c9a77c]/10 text-[#c9a77c]" : "text-[#2c4051] hover:bg-gray-100",
              )}
              role="menuitem"
            >
              <div className="flex items-center">
                <span className="text-base mr-2">{flag}</span>
                <span>{languageNames[code]}</span>
              </div>
              {code === language && <span className="h-2 w-2 rounded-full bg-[#c9a77c]"></span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
