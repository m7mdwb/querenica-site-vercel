import type { MetadataRoute } from "next"
import { siteConfig } from "./metadata-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const currentDate = new Date()

  // Define all the sections of the SPA as individual URLs
  const sections = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/residences`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/amenities`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/virtual-tour`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/thank-you`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ]

  // Add language variants with proper alternates
  const languages = ["en", "tr", "de", "ru"]
  const languageUrls = languages.flatMap((lang) =>
    sections
      .map((section) => {
        // Skip the root URL for English as it's already covered
        if (lang === "en" && section.url === baseUrl + "/") {
          return null
        }

        return {
          url: section.url.replace(baseUrl, `${baseUrl}/${lang}`).replace(/\/\/$/, "/"),
          lastModified: section.lastModified,
          changeFrequency: section.changeFrequency,
          priority: section.priority - 0.1, // Slightly lower priority for language variants
          // Add alternates for hreflang
          alternates: {
            languages: {
              en: section.url,
              tr: section.url.replace(baseUrl, `${baseUrl}/tr`),
              de: section.url.replace(baseUrl, `${baseUrl}/de`),
              ru: section.url.replace(baseUrl, `${baseUrl}/ru`),
            },
          },
        }
      })
      .filter(Boolean),
  )

  // Add alternates to the original sections
  const sectionsWithAlternates = sections.map((section) => ({
    ...section,
    alternates: {
      languages: {
        en: section.url,
        tr: section.url.replace(baseUrl, `${baseUrl}/tr`),
        de: section.url.replace(baseUrl, `${baseUrl}/de`),
        ru: section.url.replace(baseUrl, `${baseUrl}/ru`),
      },
    },
  }))

  return [...sectionsWithAlternates, ...languageUrls] as MetadataRoute.Sitemap
}
