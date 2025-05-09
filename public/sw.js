// Service Worker version for cache busting
const CACHE_VERSION = "v1"
const CACHE_NAME = `querencia-cache-${CACHE_VERSION}`

// Assets to cache on install
const STATIC_ASSETS = ["/", "/thank-you", "/favicon.ico", "/manifest.json", "/sw.js"]

// Assets that should be cached as they're used
const RUNTIME_ASSETS = [
  // Image patterns
  /\.(?:png|jpg|jpeg|svg|webp)$/,
  // Font patterns
  /\.(?:woff|woff2|ttf|otf)$/,
  // CSS and JS
  /\.(?:js|css)$/,
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // Add all static assets to cache
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old version caches
              return cacheName.startsWith("querencia-cache-") && cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => {
        // Claim clients so the SW is in control immediately
        return self.clients.claim()
      }),
  )
})

// Helper function to determine if a request should be cached
const shouldCache = (url) => {
  // Don't cache API requests
  if (url.pathname.startsWith("/api/")) {
    return false
  }

  // Check if URL matches any runtime asset pattern
  return RUNTIME_ASSETS.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(url.pathname)
    }
    return url.pathname === pattern
  })
}

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return

  const url = new URL(event.request.url)

  // Handle navigation requests (HTML pages)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If offline, try to serve from cache
        return caches.match("/") || caches.match(event.request)
      }),
    )
    return
  }

  // For other requests, use stale-while-revalidate strategy
  if (shouldCache(url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Clone the request because it can only be used once
          const fetchPromise = fetch(event.request.clone())
            .then((response) => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== "basic") {
                return response
              }

              // Clone the response because it can only be used once
              const responseToCache = response.clone()
              cache.put(event.request, responseToCache)
              return response
            })
            .catch((error) => {
              console.error("Fetch failed:", error)
              // Return cached response or null if not available
              return cachedResponse || null
            })

          // Return cached response or wait for network
          return cachedResponse || fetchPromise
        })
      }),
    )
  }
})

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
