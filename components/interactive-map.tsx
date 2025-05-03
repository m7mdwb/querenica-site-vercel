"use client"

import { useEffect, useState } from "react"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"

export default function InteractiveMap() {
  const [isClient, setIsClient] = useState(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Location coordinates for Querencia in North Cyprus (Trikomo)
  const querenciaLocation = { lat: 35.2901, lng: 33.9138 }

  // Fetch API key from server and ensure client-side rendering
  useEffect(() => {
    setIsClient(true)

    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api/map-key")

        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        if (!data.apiKey) {
          throw new Error("No API key returned")
        }

        setApiKey(data.apiKey)
      } catch (error) {
        console.error("Failed to fetch API key:", error)
        setError("Unable to load map: API key not available")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiKey()
  }, [])

  // Show loading state
  if (!isClient || isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-[#3a526a]">
        <div className="text-center text-[#8a9bae]">
          <p className="text-lg">Loading Map...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error || !apiKey) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-[#3a526a]">
        <div className="text-center text-[#8a9bae]">
          <p className="text-lg">{error || "Unable to load map"}</p>
          <p className="mt-2 text-sm">Please check your API key configuration</p>
        </div>
      </div>
    )
  }

  // Show map
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={querenciaLocation}
          defaultZoom={15}
          gestureHandling={"greedy"}
          mapId="querencia-map"
          className="h-full w-full"
          mapTypeId="satellite"
        >
          <Marker position={querenciaLocation} title="Querencia Hotel & Residence" />
        </Map>
      </APIProvider>
    </div>
  )
}
