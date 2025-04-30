import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    // Check if API key exists
    if (!apiKey) {
      console.warn("Google Maps API key not found in environment variables")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Return the API key
    return NextResponse.json({ apiKey })
  } catch (error) {
    console.error("Error retrieving API key:", error)
    return NextResponse.json({ error: "Failed to retrieve API key" }, { status: 500 })
  }
}
