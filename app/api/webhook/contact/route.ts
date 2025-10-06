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

    // Send to Zapier webhook
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (zapierWebhookUrl) {
      try {
        const zapierResponse = await fetch(zapierWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        })

        if (!zapierResponse.ok) {
          console.error("Failed to send to Zapier:", zapierResponse.statusText)
          // Log the response text for debugging
          const errorText = await zapierResponse.text()
          console.error("Zapier error response:", errorText)
        } else {
          console.log("Successfully sent to Zapier")
        }
      } catch (zapierError) {
        console.error("Error sending to Zapier:", zapierError)
        // Continue processing even if Zapier fails
      }
    } else {
      console.warn("ZAPIER_WEBHOOK_URL environment variable is not set")
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
