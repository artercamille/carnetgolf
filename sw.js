const C="v-1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"])))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request);
    const net=fetch(e.request).then(r=>{if(r&&r.ok&&(new URL(e.request.url).origin===location.origin||e.request.url.includes("fonts.g")))c.put(e.request,r.clone());return r}).catch(()=>hit);
    return hit||net}))});
