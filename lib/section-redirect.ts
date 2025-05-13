import { redirect } from "next/navigation"

/**
 * Redirects to a section on the homepage
 * @param sectionId The ID of the section to redirect to
 * @returns null (for use in Server Components)
 */
export function redirectToSection(sectionId: string) {
  // Get the current URL path
  const path = typeof window !== "undefined" ? window.location.pathname : ""

  // Extract language from path if it exists
  const langMatch = path.match(/^\/([a-z]{2})(\/|$)/)
  const lang = langMatch ? langMatch[1] : "en"

  // Redirect to the homepage with the section hash
  redirect(`/${lang}#${sectionId}`)
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use redirectToSection instead
 */
export function sectionRedirect(sectionId: string) {
  return redirectToSection(sectionId)
}
