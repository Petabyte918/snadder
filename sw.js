var cacheName = 'phaser-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/assets/images/background0.png',
    '/assets/images/background2.png',
    '/assets/images/bg_1.png',
    '/assets/images/bg_2.png',
    '/assets/images/bg_3.png',
    '/assets/images/bg_4.png',
    '/assets/images/BG_Decor.png',
    '/assets/images/darkbg.png',
    '/assets/images/demon-large.png',
    '/assets/images/failbg.png',
    '/assets/images/fairy-large.png',
    '/assets/images/Forground.png',
    '/assets/images/Ground.png',
    '/assets/images/Middle_Decor.png',
    '/assets/images/Sky.png',
    '/assets/images/snake-large.png',
    '/assets/images/snakes0.png',
    '/assets/images/stone.png',
    '/assets/images/userpin.png',
    '/js/phaser.min.js', 
    '/js/prototype.js', 
    '/js/constants.js', 
    '/js/utils.js', 
    '/js/tile.js', 
    '/js/player.js', 
    '/js/scenes/splash.js', 
    '/js/scenes/avator.js', 
    '/js/scenes/levels.js', 
    '/js/scenes/match.js', 
    '/js/scenes/shop.js', 
    '/js/scenes/upgrades.js',
    '/js/scenes/match.js', 
    '/js/scenes/dashboard.js', 
    '/js/popups/task.js', 
    '/js/popups/rapidTask.js', 
    '/js/scenes/gameMain.js', 
    '/js/main.js', 
    '/css/main.css',
];

/** install the service worker */

self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});



/** called when service worker is installed */
self.addEventListener('fetch', (event) => {
    console.log('sw fetch');
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      }).catch(function (error) {
        console.log(error);
      })
    );
  });


  self.addEventListener('activate', function(event) {
    console.log('sw activate');
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('sw removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
  });