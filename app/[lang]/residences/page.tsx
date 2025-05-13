import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../../metadata-config"

export const metadata = generateSectionMetadata(
  "residences",
  "Querencia Residences - Luxury Apartments in North Cyprus",
  "Explore our 705 luxury apartments, each offering 180° uninterrupted sea views. Discover exclusive penthouses with private pools and panoramic terraces.",
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-1-SHTfRkXnlb8DCUNOAzL1372jBh4Em5.webp",
)

export default function ResidencesPage() {
  return redirectToSection("residences")
}
