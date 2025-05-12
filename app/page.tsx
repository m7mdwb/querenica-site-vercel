import ClientPage from "./client-page"
import { defaultMetadata } from "./metadata-config"
import type { Metadata } from "next"

// Export metadata from this Server Component
export const metadata: Metadata = defaultMetadata

// This is now a Server Component that renders a Client Component
export default function Home() {
  return <ClientPage />
}
