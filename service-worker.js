const CACHE = 'infoac-offline-20260419';
const FILES = [
  '/',
  '/index.html',
  '/arsip.html',
  '/daftarhadir.html',
  '/cashflow.html',
  '/danaalokasi.html',
  '/forumlist.html',
  '/galeri.html',
  '/iuran1.html',
  '/kontak.html',
  '/lapor.html',
  '/menuu.html',
  '/mesinrumput.html',
  '/peralatan.html',
  '/rapat.html',
  '/rincian1.html',
  '/style.css',
  '/logo-AC.png',
  '/sawah8.png',
  '/bg.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      );
    })
  );
});