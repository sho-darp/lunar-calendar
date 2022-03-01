const CACHE_NAME = "pwa-lunar-calendar";
const jsons = [...Array(50)].map((_, i) => `json/${2000 + i}_calendar.json.gz`);

const urlsToCache = [
  // キャッシュ化したいコンテンツ
  "index.html",
  "img/favicon.png",
  "css/style.css",
  "css/sp.css",
  "css/theme.css",
  "css/pwa.css",
  "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js",
  "https://cdn.jsdelivr.net/npm/pako@2.0.4/dist/pako.min.js",
  "https://unpkg.com/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://unpkg.com/bootstrap-vue@2.21.2/dist/bootstrap-vue.min.css",
  "https://unpkg.com/bootstrap-vue@2.21.2/dist/bootstrap-vue.min.js",
  "https://unpkg.com/bootstrap-vue@2.21.2/dist/bootstrap-vue-icons.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js",
  "https://unpkg.com/swiper@7/swiper-bundle.min.css",
  "https://unpkg.com/swiper@7/swiper-bundle.min.js",
  "https://cdn.jsdelivr.net/npm/vue2-touch-events@3.2.2/index.min.js",
  ...jsons,
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response ? response : fetch(event.request);
    })
  );
});

self.addEventListener("push", function (event) {
  const notificationDataObj = event.data.json();
  const content = {
    body: notificationDataObj.body,
  };
  event.waitUntil(
    self.registration.showNotification(notificationDataObj.title, content)
  );
});

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  return false;
});
