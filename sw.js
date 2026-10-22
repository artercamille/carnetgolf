const C="v-4";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"])))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  const u=new URL(e.request.url),page=e.request.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith(".html");
  if(page){e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const c2=r.clone();caches.open(C).then(c=>c.put(e.request,c2));return r}).catch(()=>caches.match(e.request).then(h=>h||caches.match("./index.html"))));return}
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request);
    const net=fetch(e.request).then(r=>{if(r&&r.ok&&(u.origin===location.origin||e.request.url.includes("fonts.g")))c.put(e.request,r.clone());return r}).catch(()=>hit);
    return hit||net}))});
