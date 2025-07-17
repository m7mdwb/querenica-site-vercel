import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, message, language } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare data for Zapier webhook
    const webhookData = {
      name,
      email,
      phone,
      message: message || "",
      language: language || "en",
      timestamp: new Date().toISOString(),
      source: "Querencia Website",
      lead_type: "Contact Form Inquiry",
    }

    // Send to Zapier webhook (replace with your actual Zapier webhook URL)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (zapierWebhookUrl) {
      const zapierResponse = await fetch(zapierWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (!zapierResponse.ok) {
        console.error("Failed to send to Zapier:", zapierResponse.statusText)
        // Continue processing even if Zapier fails
      }
    }

    // You can also send to additional webhooks or services here
    // For example, a backup webhook or direct CRM integration

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
