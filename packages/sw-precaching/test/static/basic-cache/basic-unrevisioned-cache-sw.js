importScripts('/packages/sw-precaching/test/static/test-data.js');
importScripts('/packages/sw-precaching/build/sw-precaching.min.js');
importScripts('/packages/sw-precaching/test/static/skip-and-claim.js');

const precacheManager = new goog.precaching.UnrevisionedCacheManager();
precacheManager.addToCacheList({
  unrevisionedFiles: goog.__TEST_DATA['set-2']['step-1'],
});

self.addEventListener('install', (event) => {
  event.waitUntil(precacheManager.install());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(precacheManager.cleanup());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request));
});
