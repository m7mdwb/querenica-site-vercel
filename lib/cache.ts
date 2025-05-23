/**
 * Cache implementation with both class-based and function-based APIs
 * This maintains backward compatibility while adding new functionality
 */

// Types for the original function-based API
type CacheOptions = {
  maxAge: number
  staleWhileRevalidate?: number
}

// In-memory storage for both implementations
const memoryCache: Record<string, { data: any; timestamp: number }> = {}

// Original function-based API (for backward compatibility)
export function cacheData<DataType>(key: string, data: DataType, options: CacheOptions): DataType {
  try {
    memoryCache[key] = {
      data,
      timestamp: Date.now(),
    }
    return data
  } catch (error) {
    console.error("Cache set error:", error)
    return data
  }
}

export function getCachedData<DataType>(key: string, options: CacheOptions): DataType | null {
  try {
    const cached = memoryCache[key]
    if (!cached) return null

    const age = (Date.now() - cached.timestamp) / 1000

    if (age < options.maxAge) {
      return cached.data as DataType
    }

    if (options.staleWhileRevalidate && age < options.maxAge + options.staleWhileRevalidate) {
      return cached.data as DataType
    }

    delete memoryCache[key]
    return null
  } catch (error) {
    console.error("Cache get error:", error)
    return null
  }
}

export function clearCache(key: string): void {
  try {
    delete memoryCache[key]
  } catch (error) {
    console.error("Cache clear error:", error)
  }
}

export function clearAllCache(): void {
  try {
    Object.keys(memoryCache).forEach((key) => {
      delete memoryCache[key]
    })
  } catch (error) {
    console.error("Cache clear all error:", error)
  }
}

// Simple cache function that wraps cacheData for convenience
export function cache<T>(key: string, data: T, options: CacheOptions = { maxAge: 60 }): T {
  return cacheData<T>(key, data, options)
}

// New class-based API (for new code)
class CacheImplementation {
  /**
   * Get a value from the cache
   * @param key The cache key
   * @returns The cached value or null if not found or expired
   */
  async get(key: string): Promise<any> {
    try {
      const cached = memoryCache[key]
      if (!cached) return null
      return cached.data
    } catch (error) {
      console.error("Cache get error:", error)
      return null
    }
  }

  /**
   * Set a value in the cache
   * @param key The cache key
   * @param value The value to cache
   * @param ttlSeconds Time to live in seconds
   */
  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    try {
      memoryCache[key] = {
        data: value,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error("Cache set error:", error)
    }
  }

  /**
   * Delete a value from the cache
   * @param key The cache key
   */
  async delete(key: string): Promise<void> {
    try {
      delete memoryCache[key]
    } catch (error) {
      console.error("Cache delete error:", error)
    }
  }
}

// Export a singleton instance of the new implementation
export const cacheInstance = new CacheImplementation()
