"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"
import { loadingTranslations } from "@/lib/i18n/loading-translations"

interface LoadingScreenProps {
  minimumLoadingTime?: number
  onLoadingComplete?: () => void
}

export default function LoadingScreen({ minimumLoadingTime, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const { language } = useLanguage()

  useEffect(() => {
    const loadingTime = 3000 // Fixed 3 seconds

    let progressInterval: NodeJS.Timeout
    let loadingTimeout: NodeJS.Timeout
    let messageInterval: NodeJS.Timeout

    // Get translated messages based on current language
    const messages =
      loadingTranslations[language as keyof typeof loadingTranslations]?.messages || loadingTranslations.en.messages

    let messageIndex = 0
    setLoadingMessage(messages[0]) // Set initial message
    messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setLoadingMessage(messages[messageIndex])
    }, 1000) // Change message every second

    // Progress animation
    const steps = 100
    const increment = 100 / steps
    const intervalTime = loadingTime / steps

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100)
        if (newProgress >= 100) {
          clearInterval(progressInterval)
        }
        return newProgress
      })
    }, intervalTime)

    // Complete loading after 3 seconds
    loadingTimeout = setTimeout(() => {
      setProgress(100)
      setIsFadingOut(true)
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 800) // Fade out duration
      }
    }, loadingTime)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(loadingTimeout)
      clearInterval(messageInterval)
    }
  }, [onLoadingComplete, language])

  return (
    <div
      className={cn(
        "loading-screen fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out overflow-hidden",
        "bg-primary backdrop-blur-xl",
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      {/* Full Screen Glassmorphism Background */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/3 to-white/5 overflow-hidden pointer-events-none">
        {/* Subtle matte color blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-500/5 blur-3xl animate-[constellationMove_20s_ease-in-out_infinite] top-[10%] left-[10%]" />
          <div className="absolute w-80 h-80 bg-amber-500/4 blur-3xl animate-[constellationMove_25s_ease-in-out_infinite_reverse] top-[20%] right-[15%]" />
          <div className="absolute w-72 h-72 bg-purple-500/3 blur-3xl animate-[constellationMove_18s_ease-in-out_infinite_1s] bottom-[20%] left-[20%]" />
          <div className="absolute w-88 h-88 bg-cyan-500/3 blur-3xl animate-[constellationMove_22s_ease-in-out_infinite_2s] bottom-[15%] right-[20%]" />
          <div className="absolute w-64 h-64 bg-indigo-500/4 blur-3xl animate-[constellationMove_16s_ease-in-out_infinite_1.5s] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Glassmorphism overlay pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/2 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-2xl px-8 animate-[fadeInUp_1s_ease-out] z-10">
        {/* Logo Section */}
        <div className="mb-24 w-72 max-w-[90vw] relative mx-auto">
          <div className="relative">
            {/* Matte backdrop */}
            <div className="absolute inset-0 bg-amber-500/6 blur-2xl animate-[elegantPulse_6s_ease-in-out_infinite]" />

            <img
              src="/images/design-mode/querencia_logo_full.png"
              alt="Querencia"
              className="w-full h-auto relative z-10 transition-all duration-1000 opacity-90"
              onError={(e) => {
                e.currentTarget.style.opacity = "0"
              }}
            />
          </div>
        </div>

        {/* Progress Section */}
        <div className="w-full max-w-xs mb-20 mx-auto">
          {/* Simple Progress Bar */}
          <div className="relative mb-6">
            <div className="h-0.5 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500/80 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Progress Text */}
          <div className="text-center mb-8">
            <div className="text-white/90 text-lg font-light tracking-[0.2em] mb-2">{Math.round(progress)}%</div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center">
          <p
            className="text-white/80 text-sm font-light tracking-[0.3em] uppercase transition-all duration-1000 min-h-[1.2em]"
            key={loadingMessage}
          >
            {loadingMessage}
          </p>
        </div>
      </div>
    </div>
  )
}
