"use client"

import { useEffect, useState } from "react"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

// Updated location coordinates for Querencia in North Cyprus
const QUERENCIA_LOCATION = { lat: 35.265891430330605, lng: 33.909266898704175 }
const FALLBACK_IMAGE =
  "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/map-fallback-image-Yx9Ij9Yd0Yd0Yd0Yd0Yd0.jpg"

// Define the response type
interface MapKeyResponse {
  apiKey: string
  success: boolean
  error?: string
}

export default function InteractiveMap() {
  const [isLoading, setIsLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Use SWR for data fetching with caching
  const { data, error } = useSWR<MapKeyResponse>("/api/map-key", fetcher, {
    revalidateOnFocus: false, // Don't revalidate when window focuses
    revalidateIfStale: false, // Don't revalidate if data is stale
    revalidateOnReconnect: false, // Don't revalidate when reconnecting
    dedupingInterval: 3600000, // Dedupe requests for 1 hour (in milliseconds)
  })

  // Update loading state based on SWR state
  useEffect(() => {
    if (data || error) {
      setIsLoading(false)
    }
  }, [data, error])

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
  if (error || !data?.success || !data?.apiKey) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-[#3a526a]">
        <div className="text-center text-[#8a9bae] px-4">
          <p className="text-lg mb-2">Unable to load map</p>
          <p className="text-sm max-w-md mx-auto">
            {error?.message || data?.error || "The Google Maps API key is missing or invalid."}
          </p>
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
      <APIProvider apiKey={data.apiKey}>
        <Map
          defaultCenter={QUERENCIA_LOCATION}
          defaultZoom={15}
          gestureHandling={"greedy"}
          mapId="querencia-map"
          className="h-full w-full"
          mapTypeId="satellite"
          onLoad={() => setMapLoaded(true)}
        >
          {/* Use the built-in Marker component from @vis.gl/react-google-maps */}
          <Marker position={QUERENCIA_LOCATION} title="Querencia Hotel & Residence" />
        </Map>
      </APIProvider>
    </div>
  )
}
