self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("timer-v1").then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/app.js",
        "/assets/alarm.mp3"
      ])
    )
  );
});
