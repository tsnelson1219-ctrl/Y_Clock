const CACHE_NAME = 'ziwu-clock-live-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝時預載入基礎資源
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 核心邏輯：實時更新，離線備援
self.addEventListener('fetch', (event) => {
  // 只處理同網域的資源請求
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && event.request.url.startsWith(self.location.origin))) {
    
    event.respondWith(
      // 嘗試從網路抓取，並設定超時或捕獲錯誤
      fetch(event.request)
        .then((response) => {
          // 如果網路請求成功，拷貝一份存入快取
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          // 如果斷網或請求失敗，從快取中提取
          return caches.match(event.request);
        })
    );
  }
});

// 清理舊版本快取
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});