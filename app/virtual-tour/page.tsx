import { redirectToSection } from "@/lib/section-redirect"
import { generateSectionMetadata } from "../metadata-config"

export const metadata = generateSectionMetadata(
  "virtual-tour",
  "Querencia Virtual Tour - 360° Experience",
  "Take a virtual tour of Querencia luxury residences and experience our premium properties from every angle with our immersive 360° virtual tour.",
)

export default function VirtualTourPage() {
  redirectToSection("virtual-tour")
  return null
}
