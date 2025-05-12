// Preload critical images
export function preloadImages(urls: string[]): Promise<void[]> {
  // Add error handling to prevent failures from blocking the page
  const preloadPromises = urls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => {
        console.error(`Failed to preload image: ${url}`)
        resolve() // Resolve anyway to prevent blocking
      }
      img.src = url
    })
  })

  return Promise.all(preloadPromises)
}

// Cache images in IndexedDB for offline use
export async function cacheImagesInIndexedDB(urls: string[]): Promise<void> {
  try {
    // Check if IndexedDB is supported
    if (!("indexedDB" in window)) {
      console.warn("IndexedDB not supported, skipping image caching")
      return
    }

    // Implementation details...
    // This is a placeholder for the actual implementation
    console.log("Caching images in IndexedDB:", urls)

    // For each URL, fetch the image and store it in IndexedDB
    for (const url of urls) {
      try {
        const response = await fetch(url, { mode: "cors" })
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${url}`)
        }
        // Store in IndexedDB (implementation details omitted)
      } catch (error) {
        console.error(`Error caching image ${url}:`, error)
        // Continue with other images
      }
    }
  } catch (error) {
    console.error("Error in cacheImagesInIndexedDB:", error)
    // Don't throw, just log the error
  }
}
