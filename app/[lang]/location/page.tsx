import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../../metadata-config"

export const metadata = generateSectionMetadata(
  "location",
  "Querencia Location - Prime Position in North Cyprus",
  "Querencia is strategically positioned in Trikomo, North Cyprus, offering both tranquility and convenience with easy access to beaches, restaurants, and more.",
)

export default function LocationPage() {
  return redirectToSection("location")
}
