import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../../metadata-config"

export const metadata = generateSectionMetadata(
  "about",
  "About Querencia - Luxury Living in North Cyprus",
  "Discover Querencia, a premium development offering luxury residences with panoramic sea views in North Cyprus. Learn about our vision and commitment to excellence.",
)

export default function AboutPage() {
  return redirectToSection("about")
}
