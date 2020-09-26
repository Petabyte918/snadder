var cacheName = 'phaser-v1';
var filesToCache = [
    '/',
    '/index.html',

    '/assets/audio/music/music0.mp3',
    '/assets/audio/UI_sounds/button.json',
    '/assets/audio/UI_sounds/button.mp3',
    '/assets/audio/UI_sounds/sounds.json',
    '/assets/audio/UI_sounds/sounds.mp3',

    '/assets/fonts/azo-fire.png',
    '/assets/fonts/azo-fire.xml',
    '/assets/fonts/shortStack.png',
    '/assets/fonts/shortStack.xml',
    
    '/assets/images/icons/1.png',
    '/assets/images/icons/2.png',
    '/assets/images/icons/3.png',
    '/assets/images/icons/4.png',
    '/assets/images/icons/5.png',
    '/assets/images/icons/6.png',
    '/assets/images/icons/7.png',
    '/assets/images/icons/8.png',
    '/assets/images/icons/9.png',
    '/assets/images/icons/10.png',
    '/assets/images/icons/potions1.png',
    '/assets/images/icons/potions2.png',
    '/assets/images/icons/potions3.png',
    '/assets/images/icons/potions4.png',
    '/assets/images/icons/potions5.png',
    '/assets/images/icons/potions6.png',
    '/assets/images/icons/potions7.png',
    '/assets/images/icons/potions8.png',
    '/assets/images/icons/potions9.png',
    '/assets/images/icons/potions10.png',

    '/assets/images/sprites/dice.png',
    '/assets/images/sprites/avators.png',
    '/assets/images/sprites/demons.png',
    '/assets/images/sprites/fairy.png',
    '/assets/images/sprites/coin_sprite.png',
    '/assets/images/sprites/cobras.png',

    '/assets/images/UI/btn/01.png',
    '/assets/images/UI/btn/about.png',
    '/assets/images/UI/btn/close_2.png',
    '/assets/images/UI/btn/close.png',
    '/assets/images/UI/btn/faq.png',
    '/assets/images/UI/btn/leader.png',
    '/assets/images/UI/btn/menu.png',
    '/assets/images/UI/btn/misic.png',
    '/assets/images/UI/btn/music_off.png',
    '/assets/images/UI/btn/next.png',
    '/assets/images/UI/btn/ok.png',
    '/assets/images/UI/btn/pause.png',
    '/assets/images/UI/btn/play.png',
    '/assets/images/UI/btn/prew.png',
    '/assets/images/UI/btn/prize.png',
    '/assets/images/UI/btn/restart.png',
    '/assets/images/UI/btn/settings.png',
    '/assets/images/UI/btn/shop.png',
    '/assets/images/UI/btn/sound_off.png',
    '/assets/images/UI/btn/upgrade.png',

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