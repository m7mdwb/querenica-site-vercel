import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You - Querencia",
  description: "Thank you for your interest in Querencia luxury residences.",
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="thank-you-container">{children}</div>
}
