// Hotel Mathar Bhai — service worker
//
// This app runs on live Firestore data (orders, bills, menu prices, stock).
// Aggressively caching any of that would risk showing staff stale prices,
// old orders, or out-of-date menu items while offline — which is worse than
// just not working offline at all. So this service worker deliberately does
// almost nothing: it exists so the browser considers the app "installable"
// (Add to Home Screen), but every request just passes straight through to
// the network as normal.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Always go to the network — no offline cache for live business data.
  event.respondWith(fetch(event.request));
});
