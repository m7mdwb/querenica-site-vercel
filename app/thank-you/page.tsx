import { redirect } from "next/navigation"
import ClientPage from "./client-page"

export default function ThankYouPage() {
  // Redirect to home if accessed directly
  if (typeof window !== "undefined" && !window.history.state?.key) {
    redirect("/")
  }

  return <ClientPage />
}
