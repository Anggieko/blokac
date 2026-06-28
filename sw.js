const CACHE_NAME = 'info-blok-ac-v11';
const ASSETS = [
  '/',
  '/index.html',
  '/menuu.html',
  '/voting.html',
  '/forumlist.html',
  '/kontak.html',
  '/lapor.html',
  '/iuran1.html',
  '/cashflow.html',
  '/inputiuran.html',
  '/inputkas.html',
  '/rapat.html',
  '/daftarhadir.html',
  '/pengurus.html',
  '/peralatan.html',
  '/mesinrumput.html',
  '/penyimpanan.html',
  '/arsip.html',
  '/galeri.html',
  '/catatansipil.html',
  '/admac.html',
  '/datalain.html',
  '/rincian1.html',
  '/danaalokasi.html',
  '/bg.png',
  '/logoAC192.png',
  '/sawah8.png',
  '/logoAC512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// ===== NO-CACHE UNTUK HALAMAN DATA REALTIME =====
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Halaman yang WAJIB selalu fresh (NO-CACHE)
  if (url.pathname.includes('cashflow') || 
      url.pathname.includes('iuran1') || 
      url.pathname.includes('rincian1') || 
      url.pathname.includes('danaalokasi') ||
      url.pathname.includes('voting') ||
      url.pathname.includes('arsip') ||
      url.pathname.includes('mesinrumput') ||
      url.pathname.includes('galeri')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Halaman lain pakai cache
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
            return response;
          });
      })
  );
});