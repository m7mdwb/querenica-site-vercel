"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "./translations/en"
import { tr } from "./translations/tr"
import { de } from "./translations/de"
import { ru } from "./translations/ru"

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
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
  translations: en,
})

// Provider props
interface LanguageProviderProps {
  children: ReactNode
}

// Language provider component
export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initialize with English, will be updated from localStorage if available
  const [language, setLanguageState] = useState<Language>("en")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load language preference from localStorage on mount
  useEffect(() => {
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
  }, [])

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    // Update HTML lang attribute
    document.documentElement.lang = lang
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

  // Only render children after language is loaded from localStorage
  if (!isLoaded) {
    return null
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations: translations[language],
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
