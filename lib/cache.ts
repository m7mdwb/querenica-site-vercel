type CacheOptions = {
  maxAge: number
  staleWhileRevalidate?: number
}

const memoryCache: Record<string, { data: any; timestamp: number }> = {}

export function cacheData<DataType>(key: string, data: DataType, options: CacheOptions): DataType {
  memoryCache[key] = {
    data,
    timestamp: Date.now(),
  }
  return data
}

export function getCachedData<DataType>(key: string, options: CacheOptions): DataType | null {
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
}

export function clearCache(key: string): void {
  delete memoryCache[key]
}

export function clearAllCache(): void {
  Object.keys(memoryCache).forEach((key) => {
    delete memoryCache[key]
  })
}
