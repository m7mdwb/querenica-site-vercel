import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would validate the request
  // and potentially check for authentication

  // Return the API key from environment variables
  return NextResponse.json({
    apiKey: process.env.GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
  })
}
