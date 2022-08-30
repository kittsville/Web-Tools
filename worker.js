const tools = [
	"",
    "alphabetizer",
    "case-converter",
    "generic-formatter",
    "json-formatter",
    "shared",
    "stack-extractor",
    "trimmer",
    "url-cleaner",
];

const files = [
    "/",
    "/styles.css",
    "/script.js",
];

const cacheName = 'web-tools-v1';


function listCacheables(domain)
{
    return tools.map(tool => files.map(file => `${domain}/${tool}${file}`)).flatten();
}

self.addEventListener('install', e =>
{
    console.log('Worker install');

    e.waitUntil(
        listCacheables(self.registration.scope).forEach(url => {
            console.log('Caching file ' + url);
            fetch(url, {cache: "no-cache"}).then(r => cacheResponse(url, r));
        })
    );
});

self.addEventListener('activate', e => {
    console.log('Worker activate');
    e.waitUntil(
        caches.keys().then(names => names.forEach(
            name => (name !== cacheName) && caches.delete(name)
        ))
    );

    return self.clients.claim();
});

self.addEventListener('fetch', e =>
{
    const url  = e.request.url;

    e.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(e.request))
        .then(cached =>
        {
            console.log(cached ? 'Cache Available' : 'Not Cached', url);

            if (! (cached instanceof Response))
            {
                console.log('Long-Fetching', url);

                return fetch(e.request, {cache: "no-cache"}).then(rsp => cacheResponse(e.request, rsp))
            }

            console.log('Short-Fetching', url);

            return timed_fetch(e.request, 1500)
                .then(rsp => {console.log('Fetched and cached', url); return rsp;})
                .then(rsp => cacheResponse(e.request, rsp))
				// If the underlying fetch call errors or doesn't return in 1500ms, return the cached version
                .catch(() => {console.log('Short fetch failed, falling back to cache', url); return cached;})
        }
    ))
});

const cacheResponse = (req, rsp) => caches.open(cacheName)
    .then(cache => cache.put(req, rsp.clone()))
    .then(() => rsp);

const timed_fetch = (url, timeout) => timeout(fetch(url, {mode: 'cors', credentials: 'omit', cache: "no-cache"}), timeout);

const timeout = (promise, ms) => new Promise((accept, reject) => {
    setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms);
    promise.then(accept, reject);
});
