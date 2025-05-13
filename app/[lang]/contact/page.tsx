import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../../metadata-config"

export const metadata = generateSectionMetadata(
  "contact",
  "Contact Querencia - Inquire About Luxury Residences",
  "Contact our sales team to inquire about Querencia luxury residences in North Cyprus. Request information, schedule a viewing, or download our catalog.",
)

export default function ContactPage() {
  return redirectToSection("contact")
}
