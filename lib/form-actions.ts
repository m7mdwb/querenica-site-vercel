"use server"

import { cache } from "@/lib/cache"

type ContactFormData = {
  name: string
  email: string
  phone: string
  message: string
  requestCatalog: boolean
  language?: string
  submittedAt?: string
  source?: string
}

type FormResult = {
  success: boolean
  message?: string
}

// Cache successful submissions to prevent duplicates
const SUBMISSION_CACHE_TTL = 60 * 60 // 1 hour in seconds

export async function submitContactForm(formData: ContactFormData): Promise<FormResult> {
  try {
    // Generate a cache key based on email and timestamp (within a 5-minute window)
    const timeWindow = Math.floor(Date.now() / (1000 * 300)) // 5-minute window
    const cacheKey = `form_submission:${formData.email}:${timeWindow}`

    // Check if this submission is a duplicate within the time window
    let cachedSubmission = null
    try {
      cachedSubmission = await cache.get(cacheKey)
    } catch (cacheError) {
      console.error("Cache retrieval error:", cacheError)
      // Continue with submission even if cache check fails
    }

    if (cachedSubmission) {
      console.log("Duplicate submission prevented:", formData.email)
      // Return success to prevent spam but don't actually submit again
      return { success: true }
    }

    // Get your Zapier webhook URL from environment variables
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

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
      // Add any additional fields your CRM might need
      formName: "Querencia Contact Form",
      websiteUrl: "https://querencia.dovecgroup.com",
      submittedAt: formData.submittedAt || new Date().toISOString(),
    }

    console.log("Sending form data to Zapier:", {
      name: zapierData.name,
      email: zapierData.email,
      phone: zapierData.phone ? "✓ Phone exists" : "✗ Phone missing",
      messageLength: zapierData.message ? zapierData.message.length : 0,
      requestCatalog: zapierData.requestCatalog,
      language: zapierData.language,
    })

    // Send the data to Zapier
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zapierData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Zapier submission failed:", errorText)
      return {
        success: false,
        message: "Failed to submit form. Please try again later.",
      }
    }

    // Cache the successful submission to prevent duplicates
    try {
      await cache.set(cacheKey, { timestamp: Date.now() }, SUBMISSION_CACHE_TTL)
    } catch (cacheError) {
      console.error("Cache storage error:", cacheError)
      // Continue even if caching fails
    }

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
