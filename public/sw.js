const files=[
    'index.html',
    '404.html',
    'background.jpg',
    'offline.html'
];

const cacheName='first_cache';

self.addEventListener('install',event=>{
    console.log('attempting to install service wroker and cache static assets')
    event.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            return cache.addAll(files)
        })
    );
});

self .addEventListener('fetch',event=>{
    console.log('fetch event for',event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response){
                console.log('found',event.request.url,'in cache');
            }
            //console.log('network request for',event.request.url);
            return fetch(event.request)
            .then(response=>{
                if(response.status===404){
                    return caches.match('404.html');
                }
                return caches.open(cacheName)
                .then(cache=>{
                    cache.put(event.request.url,response.clone());
                    return response
                })
            })
        })
        .catch(err=>{
            console.error(err);
            return caches.match('offline.html')
        })
    )
});

self.addEventListener('activate',event=>{
    console.log('activating a new service worker');

    const list=[cacheName];

    event.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache_Name=>{
                    if(list.indexOf(cache_Name)===-1){
                        return caches.delete(cache_Name);
                    }
                })
            )
        })
    )
})