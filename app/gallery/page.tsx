import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../metadata-config"

export const metadata = generateSectionMetadata(
  "gallery",
  "Querencia Gallery - Luxury Property Images",
  "Browse our gallery of stunning images showcasing Querencia luxury residences, amenities, and breathtaking views in North Cyprus.",
)

export default function GalleryPage() {
  redirectToSection("gallery")
  return null
}
