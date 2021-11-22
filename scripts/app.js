// if service worker is supported
//local environment
// if('serviceWorker' in navigator){

//   navigator.serviceWorker.register('/sw.js')
//     .then((reg) => console.log('service worker registered!', reg))
//     .catch((err) => console.log('service worker failed to register!', err));  
// }



//github environment

if('serviceWorker' in navigator){

  navigator.serviceWorker.register('/IT-Code-Fair-2020/sw.js')
    .then((reg) => console.log('service worker registered!', reg))
    .catch((err) => console.log('service worker failed to register!', err));  
}

