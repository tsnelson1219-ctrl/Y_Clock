const CACHE_NAME = 'ziwu-clock-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // 確保您有這張圖片
];

// 安裝並快取資源
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 攔截請求並回傳快取內容
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});