if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/statics/service-worker.js')
    .then(() => console.log('service worker registered'))
    .catch((err) => console.log('service worker not registered', err));
} else {
  console.log('service worker not supported');
}
