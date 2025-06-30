import { NextResponse } from "next/server"

// Force dynamic execution in every environment (incl. next-lite / dev preview)
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const url = process.env.ZAPIER_WEBHOOK_URL ?? ""

    const configured = url.trim().length > 0

    return NextResponse.json(
      {
        configured,
        urlExists: configured,
        urlLength: configured ? url.length : 0,
        urlPrefix: configured ? `${url.slice(0, 30)}${url.length > 30 ? "..." : ""}` : null,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[verify-webhook] unexpected error:", error)
    return NextResponse.json({ error: "Failed to verify webhook configuration" }, { status: 500 })
  }
}
