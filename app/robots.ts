import type { MetadataRoute } from "next"
import { siteConfig } from "./metadata-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*", "/_next/*", "/404", "/500"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url.replace(/^https?:\/\//, ""),
  }
}
