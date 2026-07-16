// ═══════════════════════════════════════════════════
//  Service Worker — Auditoría de Parámetros Allegion
//  Permite que la app abra sin internet (cachea el HTML).
//
//  ⚠ IMPORTANTE: cada vez que actualices index.html,
//  sube el número de versión (v1 → v2 → v3...) para que
//  los dispositivos tomen la nueva versión automáticamente.
// ═══════════════════════════════════════════════════
const CACHE = 'allegion-auditoria-v2';   // ← SUBE ESTE NÚMERO al actualizar
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();  // activa la nueva versión de inmediato
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Nunca cachear llamadas a SharePoint / Microsoft (siempre red)
  if (url.includes('sharepoint.com') || url.includes('microsoftonline.com') ||
      url.includes('microsoft.com') || e.request.method !== 'GET') {
    return;
  }

  // Para el HTML: NETWORK-FIRST (siempre intenta traer la última versión,
  // usa caché solo si no hay internet). Esto evita quedarse con versión vieja.
  if (e.request.mode === 'navigate' || url.endsWith('.html') || url.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Otros archivos: cache-first
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached || fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone)).catch(() => {});
        return res;
      }).catch(() => cached)
    )
  );
});
