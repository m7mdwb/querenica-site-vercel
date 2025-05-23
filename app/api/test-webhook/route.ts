import { NextResponse } from "next/server"

export async function POST(request: Request) {
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

    // Create test data
    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+905551234567",
      message: "This is a test message from the API endpoint",
      requestCatalog: true,
      language: "en",
      formName: "Querencia Contact Form - TEST",
      websiteUrl: "https://querencia.dovecgroup.com",
      submittedAt: new Date().toISOString(),
      source: "api_test_endpoint",
    }

    console.log("Sending test data to Zapier webhook:", testData)

    // Send test data to Zapier
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Querencia-Website-Test/1.0",
      },
      body: JSON.stringify(testData),
    })

    // Log response details
    console.log(`Zapier test response status: ${response.status} ${response.statusText}`)

    const responseText = await response.text()
    console.log("Zapier test response body:", responseText)

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          message: `Zapier webhook test failed with status ${response.status}`,
          responseBody: responseText,
        },
        { status: 500 },
      )
    }

    // Return success
    return NextResponse.json(
      {
        status: "success",
        message: "Test data sent to Zapier webhook successfully",
        zapierResponse: responseText || "No response body",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error testing webhook:", error)
    return NextResponse.json(
      {
        status: "error",
        message: `Error testing webhook: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}
