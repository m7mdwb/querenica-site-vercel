import { NextResponse } from "next/server"

export async function GET() {
  // Check for both possible environment variable names
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.MAP_API_KEY

  // Check if API key exists
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  // Return the API key
  return NextResponse.json({ apiKey })
}
