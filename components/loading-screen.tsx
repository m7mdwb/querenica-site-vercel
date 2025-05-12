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
    const randomLoadingTime = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
    const effectiveLoadingTime = minimumLoadingTime || randomLoadingTime

    let progressInterval: NodeJS.Timeout
    let minimumTimeTimeout: NodeJS.Timeout
    let messageInterval: NodeJS.Timeout
    let forceCompleteTimeout: NodeJS.Timeout

    // Get translated messages based on current language
    const messages = loadingTranslations[language]?.messages || loadingTranslations.en.messages

    let messageIndex = 0
    setLoadingMessage(messages[0]) // Set initial message
    messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setLoadingMessage(messages[messageIndex])
    }, 2000)

    const progressDuration = effectiveLoadingTime * 0.95 // Let progress complete a bit closer to the end
    const steps = 100
    const increment = 100 / steps
    const intervalTime = Math.max(20, progressDuration / steps) // Ensure interval isn't too fast

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100)
        if (newProgress >= 100) {
          clearInterval(progressInterval)
        }
        return newProgress
      })
    }, intervalTime)

    minimumTimeTimeout = setTimeout(() => {
      setProgress(100) // Ensure progress is 100%
      setIsFadingOut(true)
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 1000) // Match fadeout duration (1000ms)
      }
    }, effectiveLoadingTime)

    // Force complete after 10 seconds as a fallback
    forceCompleteTimeout = setTimeout(() => {
      setProgress(100)
      setIsFadingOut(true)
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 1000)
      }
    }, 10000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(minimumTimeTimeout)
      clearInterval(messageInterval)
      clearTimeout(forceCompleteTimeout)
    }
  }, [minimumLoadingTime, onLoadingComplete, language])

  return (
    <div
      className={cn(
        "loading-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2c4051] transition-opacity duration-1000 ease-in-out overflow-hidden",
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      {/* Three floating hollow circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle */}
        <div
          className="absolute rounded-full border border-[#c9a77c]/20"
          style={{
            width: "600px",
            height: "600px",
            left: "calc(50% - 300px)",
            top: "calc(50% - 350px)",
            animation: "floatCircle1 15s infinite ease-in-out",
          }}
        />

        {/* Medium circle */}
        <div
          className="absolute rounded-full border border-[#c9a77c]/15"
          style={{
            width: "500px",
            height: "500px",
            left: "calc(50% - 350px)",
            top: "calc(50% - 150px)",
            animation: "floatCircle2 18s infinite ease-in-out",
          }}
        />

        {/* Small-medium circle */}
        <div
          className="absolute rounded-full border border-[#c9a77c]/25"
          style={{
            width: "450px",
            height: "450px",
            left: "calc(50% + 50px)",
            top: "calc(50% - 100px)",
            animation: "floatCircle3 12s infinite ease-in-out",
          }}
        />
      </div>

      {/* Logo container with increased size */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[85vw] sm:max-w-sm md:max-w-md">
        {/* Logo with increased size */}
        <div className="mb-10 sm:mb-12 w-[55%] min-w-[180px] max-w-[280px] relative mx-auto">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_logo_querencia-c1yecf3hxKXUjzc7t4YQdMAwsbiC97.png"
            alt="Querencia"
            className="w-full h-auto transition-all duration-700 animate-fadeIn"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.opacity = "0"
            }}
          />
        </div>

        {/* Elegant progress bar */}
        <div
          className="w-32 sm:w-40 h-[2px] mb-5 sm:mb-6 overflow-hidden relative mx-auto animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute inset-0 bg-[#c9a77c]/20 rounded-full"></div> {/* Bar track */}
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#c9a77c]/70 via-[#c9a77c] to-[#c9a77c]/70 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundSize: "200% 100%", // For shimmer
              animation: progress < 100 ? "shimmer 2.5s infinite linear" : "none", // Stop shimmer at 100%
              transition: "width 0.2s linear", // Smooth progress update
            }}
          ></div>
        </div>

        {/* Loading text with changing messages */}
        <div
          className="flex flex-col items-center w-full text-center animate-fadeIn"
          style={{ animationDelay: "0.6s" }}
        >
          <p
            className="text-[#c9a77c] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-light min-h-[1.5em] sm:min-h-[1.75em] text-center w-full"
            style={{ animation: "textFade 2s infinite ease-in-out" }}
            key={loadingMessage}
          >
            {loadingMessage}
          </p>
        </div>
      </div>
    </div>
  )
}
