"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Skip service worker registration in preview environments and development
    const isPreviewEnvironment = window.location.hostname.includes("vusercontent.net")
    const isDevelopment = process.env.NODE_ENV === "development" || window.location.hostname === "localhost"

    if (typeof window !== "undefined" && "serviceWorker" in navigator && !isPreviewEnvironment && !isDevelopment) {
      // Only register in production environments
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope)
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
          // Don't throw errors to prevent app crashes
        })
    } else {
      console.log("Service Worker not registered: running in development or preview environment")
    }
  }, [])

  return null // This component doesn't render anything
}
