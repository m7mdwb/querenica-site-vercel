"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const languages = [
  { code: "en", name: "English", locale: "en-US" },
  { code: "tr", name: "Türkçe", locale: "tr-TR" },
  { code: "de", name: "Deutsch", locale: "de-DE" },
  { code: "ru", name: "Русский", locale: "ru-RU" },
]

export default function LanguageSwitcherSEO() {
  const pathname = usePathname()

  // Extract the current language from the pathname
  const currentLang = pathname.split("/")[1]
  const isDefaultLang = !languages.some((lang) => lang.code === currentLang)

  // Determine the base path without language prefix
  let basePath = pathname
  if (!isDefaultLang) {
    basePath = pathname.substring(currentLang.length + 1) || "/"
  }
  if (basePath === "") basePath = "/"

  return (
    <div className="hidden">
      {/* These links are hidden but help search engines understand language relationships */}
      {languages.map((language) => {
        const path =
          language.code === "en"
            ? basePath === "/"
              ? "/"
              : basePath
            : `/${language.code}${basePath === "/" ? "" : basePath}`

        return (
          <Link
            key={language.code}
            href={path}
            hrefLang={language.locale}
            rel={language.code === "en" ? "alternate canonical" : "alternate"}
          >
            {language.name}
          </Link>
        )
      })}
    </div>
  )
}
