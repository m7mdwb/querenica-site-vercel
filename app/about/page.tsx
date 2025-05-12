import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../metadata-config"

export const metadata = generateSectionMetadata(
  "about",
  "About Querencia - Luxury Living in North Cyprus",
  "Discover the story behind Querencia, a pinnacle of luxury living in North Cyprus where architectural brilliance meets uncompromising quality.",
  "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/About%20Section/Querencia%20Outside-night%20%281%29-gHK4SqDKTsiKN2MUoLDfG7ZDocS9CG.webp",
)

export default function AboutPage() {
  redirectToSection("about")
  // This is a server component that redirects to the main page with the about section hash
  // The metadata will be used by search engines
  return null
}
