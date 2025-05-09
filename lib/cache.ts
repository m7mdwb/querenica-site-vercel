// Define the cache options type
type CacheOptions = {
  maxAge: number // Cache duration in seconds
  staleWhileRevalidate?: number // Additional time to serve stale content while revalidating
}

// In-memory cache store
const memoryCache: Record<string, { data: any; timestamp: number }> = {}

/**
 * Simple in-memory cache implementation
 */
export function cacheData<DataType>(key: string, data: DataType, options: CacheOptions): DataType {
  memoryCache[key] = {
    data,
    timestamp: Date.now(),
  }
  return data
}

/**
 * Get data from cache
 * @returns The cached data or null if not found or expired
 */
export function getCachedData<DataType>(key: string, options: CacheOptions): DataType | null {
  const cached = memoryCache[key]
  if (!cached) return null

  const age = (Date.now() - cached.timestamp) / 1000

  // If cache is fresh, return it
  if (age < options.maxAge) {
    return cached.data as DataType
  }

  // If staleWhileRevalidate is set and cache is within that extended window, return stale data
  if (options.staleWhileRevalidate && age < options.maxAge + options.staleWhileRevalidate) {
    return cached.data as DataType
  }

  // Cache is too old, remove it
  delete memoryCache[key]
  return null
}

/**
 * Clear a specific cache entry
 */
export function clearCache(key: string): void {
  delete memoryCache[key]
}

/**
 * Clear all cache entries
 */
export function clearAllCache(): void {
  Object.keys(memoryCache).forEach((key) => {
    delete memoryCache[key]
  })
}
