"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "./translations/en"
import { tr } from "./translations/tr"
import { de } from "./translations/de"
import { ru } from "./translations/ru"
import { useRouter, usePathname } from "next/navigation"

// Define available languages
export type Language = "en" | "tr" | "de" | "ru"

// Define translations structure
export type Translations = typeof en

// Map of language codes to translation objects
const translations: Record<Language, Translations> = {
  en,
  tr,
  de,
  ru,
}

// Language names for display
export const languageNames: Record<Language, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  ru: "Русский",
}

// Language context type
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: Translations
  isLoaded: boolean
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
  translations: en,
  isLoaded: false,
})

// Provider props
interface LanguageProviderProps {
  children: ReactNode
  initialLang?: Language
}

// Language provider component
export function LanguageProvider({ children, initialLang }: LanguageProviderProps) {
  // Initialize with English or initialLang if provided
  const [language, setLanguageState] = useState<Language>(initialLang || "en")
  const [isLoaded, setIsLoaded] = useState(initialLang ? true : false)
  const router = useRouter()
  const pathname = usePathname()

  // Detect language from URL path
  useEffect(() => {
    if (pathname) {
      const pathLangMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
      if (pathLangMatch && pathLangMatch[1] in translations) {
        const pathLang = pathLangMatch[1] as Language
        if (language !== pathLang) {
          setLanguageState(pathLang)
        }
      }
    }
  }, [pathname, language])

  // Load language preference from localStorage on mount if initialLang not provided
  useEffect(() => {
    if (!initialLang) {
      const storedLanguage = localStorage.getItem("language") as Language
      if (storedLanguage && translations[storedLanguage]) {
        setLanguageState(storedLanguage)
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0] as Language
        if (translations[browserLang]) {
          setLanguageState(browserLang)
        }
      }
      setIsLoaded(true)
    }
  }, [initialLang])

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)

    // Update HTML lang attribute
    document.documentElement.lang = lang

    // Update URL to reflect language change if we're not already on a language-specific route
    if (!pathname.startsWith(`/${lang}`)) {
      // Only navigate if we're changing to a different language
      if (language !== lang) {
        // Check if we're on a language route already
        const currentLangMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
        if (currentLangMatch) {
          // Replace current language with new language
          router.push(pathname.replace(/^\/[a-z]{2}/, `/${lang}`))
        } else {
          // Add language to current path
          router.push(`/${lang}${pathname}`)
        }
      }
    }
  }

  // Translation function
  const t = (key: string): string => {
    // Split the key by dots to access nested properties
    const keys = key.split(".")
    let value: any = translations[language]

    // Navigate through the nested properties
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // If key not found, return the key itself
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations: translations[language],
        isLoaded,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
