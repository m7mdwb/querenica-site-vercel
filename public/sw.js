// Simple service worker that doesn't try to cache non-existent resources
self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim())
})

self.addEventListener("fetch", (event) => {
  // Pass through all requests without attempting to cache
  event.respondWith(fetch(event.request))
})
