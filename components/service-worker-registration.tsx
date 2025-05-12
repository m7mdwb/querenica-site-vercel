"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Check if we're in a browser environment and if service workers are supported
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register the service worker
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope)
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error)
          })
      })
    }
  }, [])

  // This component doesn't render anything
  return null
}
