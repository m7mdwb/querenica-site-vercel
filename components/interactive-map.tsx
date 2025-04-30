"use client"

import { useEffect, useState } from "react"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"

export default function InteractiveMap() {
  const [isClient, setIsClient] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Location coordinates for Querencia in North Cyprus (Trikomo)
  const querenciaLocation = { lat: 35.2901, lng: 33.9138 }

  // Fetch API key from server and ensure client-side rendering
  useEffect(() => {
    setIsClient(true)

    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api/map-key")
        const data = await response.json()
        setApiKey(data.apiKey)
        console.log(apiKey);
      } catch (error) {
        console.error("Failed to fetch API key:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiKey()
  }, [])

  // Show loading state
  if (!isClient || isLoading || !apiKey) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-[#132639]">
        <div className="text-center text-[#8a9bae]">
          <p className="text-lg">Loading Map...</p>
        </div>
      </div>
    )
  }

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
