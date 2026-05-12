const CACHE_NAME = 'battaglia-vcard-v2';
const ASSETS = [
  './',
  './index.html',
  './1.jpg',
  './Battaglia.png',
  './icon.png',
  './manifest.json'
];

// Installation : Mise en cache des fichiers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activation : Nettoyage des vieux caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// Récupération : Servir le cache en priorité
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
