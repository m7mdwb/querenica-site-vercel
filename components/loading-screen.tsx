"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { loadingTranslations } from "@/lib/i18n/loading-translations"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const { language } = useLanguage()
  const t = loadingTranslations[language] || loadingTranslations.en

  // Ensure progress completes even if there's an issue
  useEffect(() => {
    let isMounted = true

    const interval = setInterval(() => {
      if (isMounted) {
        setProgress((prevProgress) => {
          // Accelerate progress as it gets closer to 100%
          const increment = prevProgress < 70 ? Math.random() * 10 : Math.random() * 15
          const newProgress = prevProgress + increment
          return newProgress >= 100 ? 100 : newProgress
        })
      }
    }, 200)

    // Force progress to complete after 8 seconds
    const forceComplete = setTimeout(() => {
      if (isMounted) {
        setProgress(100)
      }
    }, 8000)

    return () => {
      isMounted = false
      clearInterval(interval)
      clearTimeout(forceComplete)
    }
  }, [])

  // Call onLoadingComplete when progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        if (onLoadingComplete) {
          onLoadingComplete()
        }
      }, 500) // Give a small delay after reaching 100% before completing

      return () => clearTimeout(timeout)
    }
  }, [progress, onLoadingComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="mb-8 flex items-center justify-center">
        <img
          src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png"
          alt="Querencia Logo"
          className="h-16 w-auto"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = "none"
          }}
        />
      </div>
      <div className="mb-4 w-64 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-[#C8A27A] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">{t.loading}</p>
    </div>
  )
}
