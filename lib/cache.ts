interface CacheEntry<T> {
  data: T
  expiry: number // Unix timestamp in ms
  staleExpiry?: number // Unix timestamp in ms for stale-while-revalidate
}

// Using a simple Map for in-memory cache
const inMemoryCache = new Map<string, CacheEntry<any>>()

/**
 * Caches data asynchronously.
 * @param key The cache key.
 * @param data The data to cache.
 * @param options Caching options including maxAge and staleWhileRevalidate.
 * @returns A Promise that resolves when the data is cached.
 */
export async function cacheData<T>(
  key: string,
  data: T,
  options?: { maxAge?: number; staleWhileRevalidate?: number },
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Simulate a small delay for asynchronous operation
    setTimeout(() => {
      try {
        const now = Date.now()
        const expiry = options?.maxAge ? now + options.maxAge * 1000 : Number.POSITIVE_INFINITY
        const staleExpiry = options?.staleWhileRevalidate ? now + options.staleWhileRevalidate * 1000 : undefined

        inMemoryCache.set(key, { data, expiry, staleExpiry })
        console.log(`[Cache] Data cached for key: ${key}`)
        resolve()
      } catch (error) {
        console.error(`[Cache] Error caching data for key ${key}:`, error)
        reject(error instanceof Error ? error : new Error(String(error))) // Explicitly reject the promise on error
      }
    }, 10) // Minimal delay
  })
}

/**
 * Retrieves cached data asynchronously.
 * @param key The cache key.
 * @param options Caching options (currently not used for retrieval logic, but can be extended).
 * @returns A Promise that resolves with the cached data or null if not found/expired.
 */
export async function getCachedData<T>(
  key: string,
  options?: { maxAge?: number; staleWhileRevalidate?: number },
): Promise<T | null> {
  return new Promise((resolve, reject) => {
    // Simulate a small delay for asynchronous operation
    setTimeout(() => {
      try {
        const item = inMemoryCache.get(key)
        const now = Date.now()

        if (!item) {
          console.log(`[Cache] No data found for key: ${key}`)
          resolve(null)
          return
        }

        if (item.expiry <= now) {
          // Item is expired, remove it
          inMemoryCache.delete(key)
          console.log(`[Cache] Data expired for key: ${key}`)
          resolve(null)
          return
        }

        // If stale-while-revalidate is active and item is stale
        if (item.staleExpiry && item.staleExpiry <= now) {
          console.log(`[Cache] Data stale for key: ${key}, returning stale and revalidating`)
          // In a real scenario, you might trigger a background revalidation here
        }

        console.log(`[Cache] Retrieved data for key: ${key}`)
        resolve(item.data as T)
      } catch (error) {
        console.error(`[Cache] Error retrieving data for key ${key}:`, error)
        reject(error instanceof Error ? error : new Error(String(error))) // Explicitly reject the promise on error
      }
    }, 10) // Minimal delay
  })
}
