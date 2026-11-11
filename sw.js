const C="tips-v2";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png","favicon-32.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||!r.url.startsWith(self.location.origin))return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||(r.mode==="navigate"?caches.match("index.html").then(i=>i||caches.match(self.registration.scope)):undefined))))});
