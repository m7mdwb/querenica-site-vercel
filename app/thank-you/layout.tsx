import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You | Querencia Hotel & Residence",
  description: "Thank you for your inquiry. Our team will contact you shortly.",
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
