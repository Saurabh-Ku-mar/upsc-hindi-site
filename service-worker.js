const CACHE_NAME = 'upsc-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',    // अगर आपकी CSS फाइल है
  '/script.js',     // अगर आपकी JS फाइल है
  // यहाँ अन्य ज़रूरी फाइलें जोड़ें
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (!cacheWhitelist.includes(key)) {
              return caches.delete(key);
            }
          })
        );
      })
  );
});
