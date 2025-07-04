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
    let cachedData = null

    try {
      // Await the getCachedData call to ensure the promise is resolved/rejected
      cachedData = await getCachedData<{ apiKey: string; success: boolean }>(CACHE_KEY, CACHE_OPTIONS)
    } catch (cacheError) {
      // Ensure cacheError is an Error object for consistent logging
      const err = cacheError instanceof Error ? cacheError : new Error(String(cacheError))
      console.error("Cache error during retrieval:", err.message)
      // Continue execution even if cache fails
    }

    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      })
    }

    // If not in cache, get from environment variables
    // IMPORTANT: Only use server-side environment variables, not NEXT_PUBLIC_ ones
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.MAP_API_KEY

    // Check if API key exists
    if (!apiKey) {
      console.error("API key not configured in environment variables")
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

    // Store in cache (but don't let cache errors break the response)
    try {
      // Await the cacheData call to ensure the promise is resolved/rejected
      await cacheData(CACHE_KEY, responseData, CACHE_OPTIONS)
    } catch (cacheError) {
      // Ensure cacheError is an Error object for consistent logging
      const err = cacheError instanceof Error ? cacheError : new Error(String(cacheError))
      console.error("Failed to cache API key:", err.message)
      // Continue execution even if cache fails
    }

    // Return the API key as JSON with cache headers
    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    // Catch any unexpected errors and ensure they are logged as Error objects
    const err = error instanceof Error ? error : new Error(String(error))
    console.error("Error in map-key API route:", err)

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to retrieve API key",
        message: err.message,
        success: false,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    )
  }
}
