import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./lib/i18n/config"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, API routes, and special Next.js paths
  const shouldSkip =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes("/favicon") ||
    pathname.includes("/site.webmanifest") ||
    pathname.includes("/android-chrome") ||
    pathname.includes("/apple-touch-icon") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/)

  if (shouldSkip) {
    return NextResponse.next()
  }

  // Handle root path redirect to default locale
  if (pathname === "/") {
    // Get locale from cookie or Accept-Language header, default to 'en'
    let locale = defaultLocale
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value

    if (cookieLocale && locales.includes(cookieLocale as any)) {
      locale = cookieLocale as any
    } else {
      // Parse Accept-Language header
      const acceptLanguage = request.headers.get("Accept-Language")
      if (acceptLanguage) {
        const preferredLocale = acceptLanguage
          .split(",")
          .map((lang) => lang.split(";")[0].trim().toLowerCase())
          .map((lang) => lang.split("-")[0])
          .find((lang) => locales.includes(lang as any))

        if (preferredLocale) {
          locale = preferredLocale as any
        }
      }
    }

    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Get locale from cookie or Accept-Language header, default to 'en'
  let locale = defaultLocale
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value

  if (cookieLocale && locales.includes(cookieLocale as any)) {
    locale = cookieLocale as any
  } else {
    // Parse Accept-Language header
    const acceptLanguage = request.headers.get("Accept-Language")
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().toLowerCase())
        .map((lang) => lang.split("-")[0])
        .find((lang) => locales.includes(lang as any))

      if (preferredLocale) {
        locale = preferredLocale as any
      }
    }
  }

  // Redirect to the locale-prefixed path (defaults to /en)
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_vercel|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
