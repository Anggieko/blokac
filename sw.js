const CACHE_NAME = 'info-blok-ac-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/admac.html', '/arsip.html', '/cashflow.html', '/catatansipil.html',
  '/daftarhadir.html', '/danaalokasi.html', '/datalain.html', '/forumlist.html',
  '/galeri.html', '/inputiuran.html', '/inputkas.html', '/iuran1.html',
  '/kontak.html', '/lapor.html', '/menuu.html', '/pengurus.html',
  '/penyimpanan.html', '/peralatan.html', '/rapat.html', '/rincian1.html',
  '/voting.html', '/logoAC.png', '/sawah8.png', '/bg.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
