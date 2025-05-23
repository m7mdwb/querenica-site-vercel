import { cache } from "@/lib/cache"

const SUBMISSION_CACHE_TTL = 60 * 60 // 1 hour

export async function submitContactForm(formData: ContactFormData): Promise<FormResult> {
  try {
    // Generate a cache key based on email and timestamp (within a 5-minute window)
    const timeWindow = Math.floor(Date.now() / (1000 * 300)) // 5-minute window
    const cacheKey = `form_submission:${formData.email}:${timeWindow}`

    // Check if this submission is a duplicate within the time window
    const cachedSubmission = await cache.get(cacheKey)
    if (cachedSubmission) {
      console.log("Duplicate submission prevented:", formData.email)
      // Return success to prevent spam but don't actually submit again
      return { success: true }
    }

    // Get your Zapier webhook URL from environment variables
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    // Log the webhook URL (redacted for security)
    console.log("Zapier webhook URL configured:", zapierWebhookUrl ? "✓ URL exists" : "✗ URL missing")

    if (!zapierWebhookUrl) {
      console.error("Zapier webhook URL not configured")
      return {
        success: false,
        message: "Form submission service not configured. Please contact the administrator.",
      }
    }

    // Prepare the data for Zapier
    const zapierData = {
      ...formData,
      formName: "Querencia Contact Form",
      websiteUrl: "https://querencia.dovecgroup.com",
      submittedAt: formData.submittedAt || new Date().toISOString(),
    }

    console.log("Preparing to send data to Zapier:", {
      name: zapierData.name,
      email: zapierData.email,
      phone: zapierData.phone ? "✓ Phone exists" : "✗ Phone missing",
      messageLength: zapierData.message ? zapierData.message.length : 0,
      requestCatalog: zapierData.requestCatalog,
      language: zapierData.language,
      timestamp: zapierData.submittedAt,
    })

    // Send the data to Zapier with timeout and better error handling
    console.log("Sending request to Zapier webhook...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch(zapierWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Querencia-Website/1.0",
        },
        body: JSON.stringify(zapierData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Log the response status and headers
      console.log(`Zapier response status: ${response.status} ${response.statusText}`)

      const responseHeaders: Record<string, string> = {}
      response.headers.forEach((value, name) => {
        responseHeaders[name] = value
      })
      console.log("Zapier response headers:", responseHeaders)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Zapier submission failed:", errorText)
        return {
          success: false,
          message: `Failed to submit form (Status: ${response.status}). Please try again later.`,
        }
      }

      // Try to parse the response body
      let responseBody
      try {
        responseBody = await response.text()
        console.log("Zapier response body:", responseBody)
        if (responseBody) {
          try {
            const jsonResponse = JSON.parse(responseBody)
            console.log("Zapier JSON response:", jsonResponse)
          } catch (e) {
            // Not JSON, that's fine
          }
        }
      } catch (e) {
        console.log("Could not read response body:", (e as Error).message)
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("Fetch to Zapier failed:", (fetchError as Error).message)

      if ((fetchError as Error).name === "AbortError") {
        return {
          success: false,
          message: "Request to form service timed out. Please try again later.",
        }
      }

      return {
        success: false,
        message: `Network error: ${(fetchError as Error).message}. Please try again later.`,
      }
    }

    // Cache the successful submission to prevent duplicates
    await cache.set(cacheKey, { timestamp: Date.now() }, SUBMISSION_CACHE_TTL)
    console.log("Form submission successful and cached")

    return { success: true }
  } catch (error) {
    console.error("Form submission error:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace available")
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  message: string
  requestCatalog: boolean
  language: string
  submittedAt?: string
}

export type FormResult = {
  success: boolean
  message?: string
}
