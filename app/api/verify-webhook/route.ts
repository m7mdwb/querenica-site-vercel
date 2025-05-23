import { NextResponse } from "next/server"

export async function GET() {
  try {
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL

    // Check if webhook URL exists
    if (!webhookUrl) {
      return NextResponse.json(
        {
          status: "error",
          message: "ZAPIER_WEBHOOK_URL environment variable is not configured",
        },
        { status: 500 },
      )
    }

    // Return success but don't expose the actual URL for security reasons
    return NextResponse.json(
      {
        status: "success",
        message: "Zapier webhook URL is configured",
        urlConfigured: true,
        urlPrefix: webhookUrl.substring(0, 30) + "...", // Show just the beginning
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error checking webhook URL:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Error checking webhook configuration",
      },
      { status: 500 },
    )
  }
}
