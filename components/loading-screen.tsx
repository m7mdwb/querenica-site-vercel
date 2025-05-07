"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  minimumLoadingTime?: number
  onLoadingComplete?: () => void
}

export default function LoadingScreen({
  minimumLoadingTime = 3000, // 3 seconds default loading time
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 2 // Increment by 2% each time
      })
    }, minimumLoadingTime / 50) // Divide the loading time into 50 steps

    // Ensure minimum loading time is respected
    const timer = setTimeout(() => {
      setIsComplete(true)
      if (onLoadingComplete) onLoadingComplete()
    }, minimumLoadingTime)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [minimumLoadingTime, onLoadingComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2c4051] transition-opacity duration-1000",
        isComplete ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div
          className="mb-12 w-64 opacity-0 md:w-80"
          style={{
            animation: "fadeIn 0.8s ease-out forwards, scaleUp 1.2s ease-out forwards",
            animationDelay: "0.2s",
          }}
        >
          <img
            src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/white_logo-BD39Nu2KjDrSHmKNE3zbil8kbxGFeq"
            alt="Querencia"
            className="w-full"
          />
        </div>

        {/* Loading Bar Container */}
        <div
          className="relative h-[2px] w-64 overflow-hidden bg-white/20 md:w-80"
          style={{
            animation: "fadeIn 0.8s ease-out forwards",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        >
          {/* Loading Bar Progress */}
          <div
            className="absolute left-0 top-0 h-full bg-[#c9a77c] transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              backgroundImage:
                "linear-gradient(90deg, rgba(201,167,124,1) 0%, rgba(201,167,124,1) 70%, rgba(225,205,176,1) 85%, rgba(201,167,124,1) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite linear",
            }}
          ></div>
        </div>

        {/* Loading Text */}
        <div
          className="mt-4 text-center mr-8"
          style={{
            animation: "fadeIn 0.8s ease-out forwards",
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          <p className="text-sm font-light tracking-wider text-white/70">
            {progress < 100 ? "LOADING" : "WELCOME"}
            <span className="inline-block w-16 text-right">{progress}%</span>
          </p>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute -left-24 -top-24 h-48 w-48 rounded-full border border-white/5"
          style={{
            animation: "pulse 3s infinite ease-in-out",
          }}
        ></div>
        <div
          className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full border border-white/5"
          style={{
            animation: "pulse 3s infinite ease-in-out",
            animationDelay: "0.5s",
          }}
        ></div>
        <div
          className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full border border-white/5"
          style={{
            animation: "pulse 3s infinite ease-in-out",
            animationDelay: "1s",
          }}
        ></div>

        {/* Luxury Accent Line */}
        <div
          className="absolute -bottom-8 left-1/2 h-16 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#c9a77c] to-transparent"
          style={{
            animation: "scaleUp 1.5s infinite alternate ease-in-out",
          }}
        ></div>
      </div>
    </div>
  )
}
