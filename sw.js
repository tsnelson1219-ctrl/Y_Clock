// sw.js (V9.6 - 強制淨化版)
const CACHE_NAME = 'ziwu-clock-v9.6'; 
const ASSETS = [
  './',
  './index.html',
  './lunar.min.js',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // 立即停用舊版 SW
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
  )));
});
// ... fetch 邏輯 ...
