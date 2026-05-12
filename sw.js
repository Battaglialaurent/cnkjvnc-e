const CACHE_NAME = 'vcard-battaglia-v1';
const ASSETS = [
  './',
  './index.html',
  './1.jpg',
  './Battaglia.png',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
