import { NextResponse } from "next/server"

export async function POST() {
  try {
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (!zapierWebhookUrl) {
      return NextResponse.json({ error: "Zapier webhook URL not configured" }, { status: 500 })
    }

    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      message: "This is a test message from the webhook verification system.",
      requestCatalog: true,
      language: "en",
      formName: "Querencia Contact Form - TEST",
      websiteUrl: "https://querencia.dovecgroup.com",
      submittedAt: new Date().toISOString(),
      source: "webhook_test",
    }

    console.log("Sending test data to Zapier webhook...")

    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Querencia-Website-Test/1.0",
      },
      body: JSON.stringify(testData),
    })

    const responseText = await response.text()

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      responseBody: responseText,
      testData,
    })
  } catch (error) {
    console.error("Test webhook error:", error)
    return NextResponse.json(
      {
        error: "Failed to test webhook",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
