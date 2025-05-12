import { redirect } from "next/navigation"

export function redirectToSection(section: string) {
  // This function will be used in server components to redirect to the main page with a section hash
  redirect(`/#${section}`)
}

// Add the missing export that's being referenced elsewhere in the codebase
export const sectionRedirect = redirectToSection
