"use client"

import type React from "react"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

/* Dynamic loaders for built-in languages */
const DEFAULT_LOADERS: Record<string, () => Promise<any>> = {
  en: () => import("./translations/en"),
  tr: () => import("./translations/tr"),
  de: () => import("./translations/de"),
  ru: () => import("./translations/ru"),
}

interface TranslationCtx {
  /* NEW canonical names */
  locale: string
  setLocale: (locale: string) => void
  t: (key: string, vars?: Record<string, unknown>) => string

  /* LEGACY aliases -- kept for backward-compat */
  language: string
  changeLanguage: (locale: string) => void
}

const TranslationContext = createContext<TranslationCtx>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,

  /* legacy */
  language: "en",
  changeLanguage: () => {},
})

interface ProviderProps {
  children: ReactNode
  defaultLocale?: string
  loaders?: Record<string, () => Promise<any>>
}

/* flattens nested JSON messages into dot-notation keys */
function flatten(obj: any, prefix = ""): Record<string, string> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const val = obj[key]
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof val === "string") acc[newKey] = val
      else if (val && typeof val === "object") Object.assign(acc, flatten(val, newKey))
      return acc
    },
    {} as Record<string, string>,
  )
}

export const LanguageProvider: React.FC<ProviderProps> = ({ children, defaultLocale = "en", loaders }) => {
  const translationLoaders = loaders ?? DEFAULT_LOADERS
  const router = useRouter()
  const pathname = usePathname()

  const [locale, setLocaleState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("locale") ?? defaultLocale
    }
    return defaultLocale
  })
  const [messages, setMessages] = useState<Record<string, string>>({})

  /* Persist locale & load translations whenever it changes */
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale)
    }

    const load = async () => {
      const loader = translationLoaders[locale]
      if (loader) {
        try {
          const mod = await loader()
          setMessages(flatten(mod.default))
        } catch (err) {
          console.error("Failed to load translations:", err)
          setMessages({})
        }
      } else {
        setMessages({})
      }
    }

    load()
  }, [locale, translationLoaders])

  /* simple interpolation helper */
  const t = (key: string, vars: Record<string, unknown> = {}) => {
    const template = messages[key] ?? key
    return Object.keys(vars).reduce((str, v) => str.replaceAll(`{${v}}`, String(vars[v])), template)
  }

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    /* optional: refresh current page so Server Components re-render in new locale */
    router.push(pathname)
  }

  return (
    <TranslationContext.Provider
      value={{
        /* canonical */
        locale,
        setLocale,
        t,

        /* legacy aliases */
        language: locale,
        changeLanguage: setLocale,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export const useLanguage = () => useContext(TranslationContext)
export const useTranslation = useLanguage /* legacy alias */
