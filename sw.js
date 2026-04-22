// sw.js (V9.5 - 強制版本生效)
const CACHE_NAME = 'ziwu-clock-v9.5'; 
const ASSETS = [
  './',
  './index.html',
  './lunar.min.js',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // 立即跳過等待，強迫更新
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
  )));
});

self.addEventListener('fetch', (e) => {
  // 對於 lunar.min.js，如果失敗，嘗試不讀取快取直接請求網路
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).catch(err => console.error("SW Fetch Fail:", err));
    })
  );
});
