const CACHE_NAME = 'ssnlc-cache-v1';

// Assets that exist and are safe to precache.
// NOTE: do NOT add /index.html or /_next/static/css/app.css — they don't
// exist in Next.js; a single failing request makes cache.addAll() reject
// and kills the whole install.
const PRECACHE_URLS = [
  '/',
  '/logo.jpeg',
  '/collegelogo.png',
  '/manifest.json',
  '/images/library/library-bg.jpg',
  '/images/library/reading-area.jpg',
  '/images/library/book-collection.jpg',
];

// Install a service worker
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch((error) => console.error('Pre-caching failed:', error))
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  // Don't cache POST requests or API calls
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('/api/') ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  // Network-first: fresh pages/chunks always win, so stale code can never
  // shadow a new deploy. The cache is only a fallback when offline.
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);

        if (networkResponse.ok && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          const url = new URL(event.request.url);
          const isAsset =
            url.pathname.startsWith('/_next/static/') ||
            url.pathname.startsWith('/images/') ||
            PRECACHE_URLS.includes(url.pathname) ||
            /\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/.test(url.pathname);

          if (isAsset) {
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache))
              .catch(() => {});
          }
        }

        return networkResponse;
      } catch (error) {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        return new Response('Network error', {
          status: 408,
          headers: new Headers({ 'Content-Type': 'text/plain' }),
        });
      }
    })()
  );
});

// Update a service worker
self.addEventListener('activate', (event) => {
  // Claim clients immediately so the new service worker takes effect right away
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches
        .keys()
        .then((cacheNames) =>
          Promise.all(
            cacheNames
              .filter((name) => name !== CACHE_NAME)
              .map((name) => caches.delete(name))
          )
        ),
    ])
  );
});
