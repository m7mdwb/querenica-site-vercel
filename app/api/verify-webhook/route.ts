import { NextResponse } from "next/server"

export async function GET() {
  try {
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    return NextResponse.json({
      configured: !!zapierWebhookUrl,
      urlExists: !!zapierWebhookUrl,
      urlLength: zapierWebhookUrl?.length || 0,
      urlPrefix: zapierWebhookUrl?.substring(0, 30) + "..." || "Not configured",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to verify webhook configuration" }, { status: 500 })
  }
}
