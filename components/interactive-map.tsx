"use client"

import { useEffect, useState } from "react"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"

// Location coordinates for Querencia in North Cyprus (Trikomo)
const QUERENCIA_LOCATION = { lat: 35.2901, lng: 33.9138 }
const FALLBACK_IMAGE =
  "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/map-fallback-image-Yx9Ij9Yd0Yd0Yd0Yd0Yd0.jpg"

export default function InteractiveMap() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch API key from server
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/map-key")

        // Check if the response is ok before trying to parse JSON
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API returned ${response.status}: ${errorText}`)
        }

        // Parse the JSON response safely
        const data = await response.json()

        // Check if the response contains the expected data
        if (!data.success || !data.apiKey) {
          throw new Error(data.error || "Invalid API key response")
        }

        setApiKey(data.apiKey)
        setError(null)
      } catch (error) {
        console.error("Failed to fetch API key:", error)
        setError(error instanceof Error ? error.message : "Unable to load map")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiKey()
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-[#3a526a]">
        <div className="text-center text-[#8a9bae]">
          <p className="text-lg">Loading Map...</p>
        </div>
      </div>
    )
  }

  // Show error state with fallback image
  if (error || !apiKey) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-[#3a526a]">
        <div className="text-center text-[#8a9bae] px-4">
          <p className="text-lg mb-2">Unable to load map</p>
          <p className="text-sm max-w-md mx-auto">{error || "The Google Maps API key is missing or invalid."}</p>
          <div className="mt-4 opacity-60 hover:opacity-100 transition-opacity">
            <img
              src={FALLBACK_IMAGE || "/placeholder.svg"}
              alt="Map of Querencia location"
              className="max-w-full h-auto rounded-lg mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Show map
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={QUERENCIA_LOCATION}
          defaultZoom={15}
          gestureHandling={"greedy"}
          mapId="querencia-map"
          className="h-full w-full"
          mapTypeId="satellite"
        >
          <Marker position={QUERENCIA_LOCATION} title="Querencia Hotel & Residence" />
        </Map>
      </APIProvider>
    </div>
  )
}
