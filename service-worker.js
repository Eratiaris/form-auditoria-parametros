// ═══════════════════════════════════════════════════
//  Service Worker — Auditoría de Parámetros Allegion
//  Permite que la app abra sin internet (cachea el HTML).
// ═══════════════════════════════════════════════════
const CACHE = 'allegion-auditoria-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instala: cachea los archivos base
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// Activa: limpia cachés viejos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: estrategia network-first para las llamadas a SharePoint,
// cache-first para los archivos de la app (para abrir offline).
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Nunca cachear llamadas a SharePoint / Microsoft (siempre red)
  if (url.includes('sharepoint.com') || url.includes('microsoftonline.com') ||
      url.includes('microsoft.com') || e.request.method !== 'GET') {
    return; // deja pasar a la red normal
  }

  // Archivos de la app: intenta caché primero, luego red
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        // guarda en caché para la próxima
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone)).catch(() => {});
        return res;
      }).catch(() => cached);
    })
  );
});
