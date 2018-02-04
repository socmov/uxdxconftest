---
  layout: null
---

const CACHE_NAME = "uxdx-2018-cache-v1";

console.log("installing service worker");

const urlsToCache = [
  'style.css'

]

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(function () {
        // `skipWaiting()` forces the waiting ServiceWorker to become the
        // active ServiceWorker, triggering the `onactivate` event.
        // Together with `Clients.claim()` this allows a worker to take effect
        // immediately in the client(s).
        return self.skipWaiting();
      })
  );
});

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function (response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return fetch(event.request).then(function (response) {
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     })
//   );
// });

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
