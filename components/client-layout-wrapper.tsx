"use client"

import { LanguageProvider } from "@/lib/i18n/context"
import LoadingScreen from "@/components/loading-screen"
import { useState, useEffect } from "react"
import type React from "react"

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading screen on mount
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <LanguageProvider>
      {isLoading && <LoadingScreen />}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>{children}</div>
    </LanguageProvider>
  )
}
