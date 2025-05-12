/**
 * Preload and cache important images
 * @param urls Array of image URLs to preload
 */
export const preloadImages = (urls: string[]): void => {
  if (typeof window === "undefined") return

  urls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

/**
 * Cache images in IndexedDB for offline use
 * @param urls Array of image URLs to cache
 */
export const cacheImagesInIndexedDB = async (urls: string[]): Promise<void> => {
  if (typeof window === "undefined" || !("caches" in window)) return

  try {
    const cache = await caches.open("querencia-images-cache")

    // Add all images to the cache
    await Promise.all(
      urls.map(async (url) => {
        try {
          // Check if already cached
          const match = await cache.match(url)
          if (!match) {
            // If not cached, fetch and cache
            const response = await fetch(url, { mode: "no-cors" })
            await cache.put(url, response)
          }
        } catch (error) {
          console.error(`Failed to cache image in IndexedDB: ${url}`, error)
        }
      }),
    )
  } catch (error) {
    console.error("Failed to cache images in IndexedDB:", error)
  }
}
