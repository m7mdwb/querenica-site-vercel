"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils" // Ensure this path is correct

interface LoadingScreenProps {
  minimumLoadingTime?: number
  // onLoadingComplete is not directly used by Next.js loading.tsx in a way that
  // this component can control Next.js's unmounting.
  // We'll keep the prop if you use this component elsewhere and need a callback.
  onLoadingComplete?: () => void
}

// CSS Keyframes expected to be in global CSS:
// fadeIn, scaleUp, shimmer, pulse (ensure 'pulse' is suitably elegant)

export default function LoadingScreen({
  minimumLoadingTime, // Remove default value to use random time
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [hasCompletedMinimumTime, setHasCompletedMinimumTime] = useState(false)
  const [loadingTime, setLoadingTime] = useState(0)

  useEffect(() => {
    // Generate a random loading time between 3-5 seconds (3000-5000ms)
    const randomLoadingTime = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
    setLoadingTime(randomLoadingTime)

    // If minimumLoadingTime prop is provided, use that instead of random time
    const effectiveLoadingTime = minimumLoadingTime || randomLoadingTime

    let progressInterval: NodeJS.Timeout
    let minimumTimeTimeout: NodeJS.Timeout

    // Start progress simulation
    // Animate progress a bit faster to ensure it likely hits 100%
    // before or around the minimumLoadingTime for a smoother visual.
    const progressDuration = effectiveLoadingTime * 0.9 // Aim to finish progress slightly before min time
    const steps = 50
    const increment = 100 / steps
    const intervalTime = progressDuration / steps

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + increment
      })
    }, intervalTime)

    // Enforce minimum display time
    minimumTimeTimeout = setTimeout(() => {
      setHasCompletedMinimumTime(true)
      // If progress is also 100, or we just want to start fade out after min time
      setIsFadingOut(true)

      // Call onLoadingComplete after the fadeout animation completes
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 1000) // Match fadeout duration
      }
    }, effectiveLoadingTime)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(minimumTimeTimeout)
    }
  }, [minimumLoadingTime, onLoadingComplete])

  // Determine if the screen should be visible or fully faded (for unmounting by parent)
  // For Next.js loading.tsx, it handles unmounting. This prop helps if used standalone.
  const isEffectivelyHidden = isFadingOut

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2c4051] transition-opacity duration-1000 ease-in-out",
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div
          className="mb-10 w-56 opacity-0 md:w-72" // Slightly adjusted margin and widths
          style={{
            // Ensure fadeIn and scaleUp are defined in your global CSS
            animation: "fadeIn 0.8s ease-out forwards, scaleUp 1.2s ease-out forwards",
            animationDelay: "0.1s", // Start logo animation a bit sooner
          }}
        >
          <img
            src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/white_logo-BD39Nu2KjDrSHmKNE3zbil8kbxGFeq"
            alt="Querencia" // Your brand name
            className="w-full h-auto"
          />
        </div>

        {/* Loading Bar Container */}
        <div
          className="relative h-[3px] w-56 overflow-hidden rounded-full bg-white/15 md:w-72" // Thinner bar, slightly more visible track
          style={{
            animation: "fadeIn 0.7s ease-out forwards",
            animationDelay: "0.4s", // Stagger after logo
            opacity: 0,
          }}
        >
          {/* Loading Bar Progress */}
          <div
            className="absolute left-0 top-0 h-full bg-[#c9a77c] transition-width duration-150 ease-linear" // Faster width transition for smoother look with interval
            style={{
              width: `${progress}%`,
              // Shimmer effect via gradient and animation
              backgroundImage:
                "linear-gradient(90deg, rgba(201,167,124,0.7) 0%, rgba(201,167,124,1) 30%, rgba(225,205,176,1) 50%, rgba(201,167,124,1) 70%, rgba(201,167,124,0.7) 100%)",
              backgroundSize: "250% 100%", // Wider size for a slower, more luxurious shimmer
              animation: "shimmer 2.5s infinite linear", // Slower shimmer
            }}
          ></div>
        </div>

        {/* Loading Text */}
        <div
          className="mt-6 text-center" // Adjusted margin
          style={{
            animation: "fadeIn 0.7s ease-out forwards",
            animationDelay: "0.6s", // Stagger after bar
            opacity: 0,
          }}
        >
          <p className="text-xs font-light tracking-[0.2em] uppercase text-white/60 md:text-sm">
            {" "}
            {/* Evocative text, wider tracking */}
            {progress < 100 ? "Crafting Perfection" : "Welcome"}
            {progress < 100 && <span className="ml-2 inline-block w-10 text-left">{Math.round(progress)}%</span>}
          </p>
        </div>

        {/* Decorative Circles - Refined for luxury */}
        {/* Consider fewer, larger, and more subtly animated circles or omit for ultimate clean look */}
        {/* Example of one large, very subtle pulsing circle */}
        <div
          className="absolute -z-10 rounded-full border border-[#c9a77c]/10" // Accent color, very transparent
          style={{
            width: "clamp(300px, 80vmin, 600px)", // Responsive size
            height: "clamp(300px, 80vmin, 600px)",
            animation: "subtlePulse 6s infinite ease-in-out", // Custom subtle pulse
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute -z-10 rounded-full border border-[#c9a77c]/5" // Even more transparent
          style={{
            width: "clamp(400px, 100vmin, 800px)",
            height: "clamp(400px, 100vmin, 800px)",
            animation: "subtlePulse 6s infinite ease-in-out",
            animationDelay: "2s", // Staggered delay
          }}
        ></div>

        {/* Luxury Accent Line - Making it more dynamic */}
        <div
          className="absolute -bottom-12 left-1/2 h-20 w-[1.5px] -translate-x-1/2 opacity-0" // Start invisible
          style={{
            // Gradient from gold to transparent
            background: "linear-gradient(to bottom, rgba(201,167,124,0.5) 0%, rgba(201,167,124,0) 100%)",
            // Animation: fade in, then gentle pulse or shimmer
            animation: "lineAppearAndPulse 4s ease-out forwards",
            animationDelay: "0.8s",
          }}
        ></div>
      </div>
    </div>
  )
}
