import { NextResponse } from "next/server"
import { cacheData, getCachedData } from "@/lib/cache"

const CACHE_KEY = "map-api-key"
const CACHE_OPTIONS = {
  maxAge: 60 * 60, // 1 hour in seconds
  staleWhileRevalidate: 60 * 60 * 24, // 24 hours in seconds
}

export async function GET() {
  try {
    // Try to get from cache first
    const cachedData = getCachedData<{ apiKey: string; success: boolean }>(CACHE_KEY, CACHE_OPTIONS)

    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      })
    }

    // If not in cache, get from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.MAP_API_KEY

    // Check if API key exists
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured", success: false },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        },
      )
    }

    // Create response data
    const responseData = { apiKey, success: true }

    // Store in cache
    cacheData(CACHE_KEY, responseData, CACHE_OPTIONS)

    // Return the API key as JSON with cache headers
    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error in map-key API route:", error)
    return NextResponse.json(
      { error: "Failed to retrieve API key", success: false },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    )
  }
}
