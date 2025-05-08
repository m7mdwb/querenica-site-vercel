import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Only use server-side environment variables
    // Removed references to NEXT_PUBLIC_ prefixed variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.MAP_API_KEY

    // Check if API key exists
    if (!apiKey) {
      // Return a proper JSON response with error status
      return NextResponse.json({ error: "API key not configured", success: false }, { status: 500 })
    }

    // Return the API key as JSON
    return NextResponse.json({ apiKey, success: true })
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in map-key API route:", error)
    return NextResponse.json({ error: "Failed to retrieve API key", success: false }, { status: 500 })
  }
}
