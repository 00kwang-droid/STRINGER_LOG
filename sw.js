const CACHE = 'string-journal-v11';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  './apple-touch-icon.png'
];

// install: try to pre-cache core assets (best-effort)
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(ASSETS.map(url => cache.add(url)))
    ).catch(() => {})
  );
});

// activate: drop old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// fetch: network-first, fall back to cache (keeps app fresh on deploy)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
