import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../../metadata-config"

export const metadata = generateSectionMetadata(
  "amenities",
  "Querencia Amenities - Luxury Features & Facilities",
  "Discover the premium amenities at Querencia including swimming pools, spa, restaurants, sports courts, and 24-hour security in a luxurious North Cyprus setting.",
)

export default function AmenitiesPage() {
  return redirectToSection("amenities")
}
