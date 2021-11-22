//note: when sw.js file changes, close and the new service worker does not get activated automatically
//by defult, it gets activated after close and reopen the browser

// when assets get updated, cache should also be updated
// update cache name when updating the cache
// notice if any of the items' url in the assets goes wrone, caching will be unsuccessful 
const staticCacheName = 'site-static-v1.1';
// a list of references for assets that need to be added in to the cache

// local version
// const assets = [
//   '/',
//   'index.html',
//   'scripts/app.js',
//   'scripts/main.js',
//   'scripts/vendor/materialize.min.js',
//   'scripts/vendor/jquery-3.5.1.min.js',
//   'styles/main.css',
//   'styles/vendor/materialize.css',
//   'styles/vendor/materialize.min.css',
//   'styles/vendor/materialIcons.css',
//   'assets/images/AppIcons/outline_person_search_black_24dp.png',
//   'assets/images/AppIcons/baseline_person_search_black_24dp.png',
//   'assets/images/AppIcons/outline_group_add_black_24dp.png',
//   'assets/images/AppIcons/baseline_group_add_black_24dp.png',
//   'assets/images/AppIcons/round_star_border_black_24dp.png',
//   'assets/images/AppIcons/round_star_black_24dp.png',
//   'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',

// ];

//  'https://i.pravatar.cc/72?img=6',
//   'https://i.pravatar.cc/72?img=7',
//   'https://i.pravatar.cc/72?img=3',
//   'https://i.pravatar.cc/72?img=5',
//   'https://i.pravatar.cc/72?img=21',
//   'https://i.pravatar.cc/512?img=6',
//   'https://i.pravatar.cc/512?img=7',
//   'https://i.pravatar.cc/512?img=3',
//   'https://i.pravatar.cc/512?img=5',
//   'https://i.pravatar.cc/512?img=21',


// 'https://fonts.googleapis.com/icon?family=Material+Icons',
// 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',

//github version
const assets = [
  '/IT-Code-Fair-2020/',
  'index.html',
  'scripts/app.js',
  'scripts/main.js',
  'scripts/vendor/materialize.min.js',
  'scripts/vendor/jquery-3.5.1.min.js',
  'styles/main.css',
  'styles/vendor/materialize.css',
  'styles/vendor/materialize.min.css',
  'styles/vendor/materialIcons.css',
  'assets/images/AppIcons/outline_person_search_black_24dp.png',
  'assets/images/AppIcons/baseline_person_search_black_24dp.png',
  'assets/images/AppIcons/outline_group_add_black_24dp.png',
  'assets/images/AppIcons/baseline_group_add_black_24dp.png',
  'assets/images/AppIcons/round_star_border_black_24dp.png',
  'assets/images/AppIcons/round_star_black_24dp.png',
  'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];


// install event only fires when service worker has changed 
self.addEventListener('install', evt => {
    // use 'waitUntil' to make sure that it doesn't finish the 'install' event until the promise is resolved
    evt.waitUntil(
       // open a cache, if it doesn't exist, create it, then open 
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        // add all the assets defined into the cache
        cache.addAll(assets);
      })
    );
  });

  // activate event
self.addEventListener('activate', evt => {
    
    evt.waitUntil(
        // getting an array of cache names (keys)
      caches.keys().then(keys => {
        // 'promise.all' takes an array of promises
        return Promise.all(keys
          // filter the key array
          // if the key is not equal to the current cache name, it stays in the array        
          .filter(key => key !== staticCacheName)
          // map the leftover array to an array of promises 
          // delete each key in the leftover array
          .map(key => caches.delete(key))
        );
      })
    );
  });

// fetch event
self.addEventListener('fetch', evt => {
    
    evt.respondWith(
       // if the fetch requested item matches an item in the cache 
      caches.match(evt.request)
        // if the item is not in the cache, return the original fetch request
        .then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
  });    

