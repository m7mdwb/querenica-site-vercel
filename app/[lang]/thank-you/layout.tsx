import type React from "react"

export default function LangThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="thank-you-container">{children}</div>
}
