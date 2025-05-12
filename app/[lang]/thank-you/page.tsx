import ThankYouClientPage from "./client-page"
import { generateSectionMetadata } from "../../metadata-config"
import type { Metadata } from "next"

export const metadata: Metadata = generateSectionMetadata(
  "thank-you",
  "Thank You - Querencia",
  "Thank you for your interest in Querencia luxury residences. We've received your inquiry and will be in touch shortly.",
)

export default function ThankYouPage() {
  return <ThankYouClientPage />
}
