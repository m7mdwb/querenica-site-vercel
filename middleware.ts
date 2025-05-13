import { type NextRequest, NextResponse } from "next/server"

// Define supported languages
const supportedLanguages = ["en", "tr", "de", "ru"]
const defaultLanguage = "en"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for API routes, static files, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next()
  }

  // Check if the path already has a language prefix
  const pathnameHasLanguage = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  )

  if (pathnameHasLanguage) {
    return NextResponse.next()
  }

  // Determine preferred language
  let language = defaultLanguage

  // Check for language cookie
  const languageCookie = request.cookies.get("NEXT_LOCALE")?.value
  if (languageCookie && supportedLanguages.includes(languageCookie)) {
    language = languageCookie
  } else {
    // Check Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") || ""
    for (const lang of supportedLanguages) {
      if (acceptLanguage.includes(lang)) {
        language = lang
        break
      }
    }
  }

  // Create new URL with language prefix
  const newUrl = new URL(`/${language}${pathname}`, request.url)

  // Preserve query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value)
  })

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Match all paths except those that start with:
    // - _next
    // - api
    // - static files (with file extensions)
    // - already have a language prefix
    "/((?!_next|api|.*\\..*|en|tr|de|ru).+)",
    // Also match the root path
    "/",
  ],
}
