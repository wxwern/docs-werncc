/* ===========================================================
 * docs.wern.cc service worker
 *   Copyright 2023 @wxwern
 *
 * Modified from official docsify documentation.
 *   Copyright 2016 @huxpro
 *   Licensed under Apache 2.0
 * ========================================================== */

const RUNTIME = 'docs-werncc-runtime-v0';
const HOSTNAME_WHITELIST = [
  self.location.hostname,
  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'raw.githubusercontent.com',
  'cdn.jsdelivr.net'
];
const CRITICAL_SELF_HOST_PATHS = [
  '/',
  '/_404.md',
  '/_sidebar.md',
  '/README.md',
];
const CRITICAL_EXTERNAL_URLS = [
  "https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js",
  "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/js/docsify-themeable.min.js",
  "https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.js",
  "https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/zoom-image.min.js",
  "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css",
  "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css",
];


// ===== URL GETTERS =====

// Cache busted URL for fetching 1st party content,
// original URL for fetching 3rd-party content.
const getRemoteFetchUrl = (req) => {
  var now = Date.now();
  var url = new URL(req.url);

  // Fixed http URL
  url.protocol = self.location.protocol;

  // Add query for caching-busting.
  // See Cache-Control bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
  if (url.hostname === self.location.hostname) {
    url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
  }
  return url.href;
}

// URL without query string
const getNoParamUrl = (req) => {
  var url = new URL(req.url);
  url.search = '';
  return url.href;
}

// Alternative URL for the request that can return the same result.
// This is used for offline caching to work under 'history' routing mode.
const getAltUrl = (req) => {
  var url = new URL(req.url);

  if (url.hostname == self.location.hostname &&
      !url.pathname.split('/').pop().includes('.') &&
      url.pathname != '/') {

    // Get the root if this is not a request for a file,
    // as all paths use the same index.html file under history routing mode.
    url.pathname = '/';
    url.search = '';

    return url.href;
  } else {
    // Otherwise we say there's no alternative URL.
    return undefined;
  }
}



// ===== RESPONSE AND CACHE MANAGERS =====

// Given a response, inserts new header to track cache time,
// so as to detect stale content later.
const insertCacheHeaderTime = (res) => {
  let headers = new Headers(res.headers);
  headers.append('sw-fetched-on', new Date().getTime());
  return res.blob().then(body =>
    new Response(body, {
      status: res.status,
      statusText: res.statusText,
      headers: headers
    })
  ).catch(_ => res);
}

// Serve cache content if available within the max age.
// If the cached response is stale, we wait for the live response unless that fails.
// This is to avoid showing stale content when the user is online,
// while still allowing offline access to the content.
const getCombinedResponsePromise = (liveResponse, cachedResponse) => {

  if (self.location.hostname == 'localhost') {
    // Always prioritise live responses when debugging.
    return liveResponse.catch(_ => cachedResponse);
  }


  const maxAge = 1 * 60 * 60 * 1000; // 1 hour

  return cachedResponse.then((cRes) => {
    let swFetchedOn = cRes.headers.get('sw-fetched-on');
    let isUsable = (swFetchedOn && (parseFloat(swFetchedOn) + maxAge) > new Date().getTime());

    if (isUsable) {
      return cachedResponse;
    } else {
      return liveResponse.catch(() => cachedResponse);
    }
  }).catch(_ => {
    return liveResponse;
  });

}

// Cleanup for old stuff
const deleteOldCaches = async () => {
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter(key => key != RUNTIME);
  await Promise.all(cachesToDelete.map(deleteCache));
};





// ===== EVENT LISTENERS =====

self.addEventListener('activate', event => {
  event.waitUntil(Promise.allSettled([
    self.clients.claim(),
    deleteOldCaches()
  ]));

});

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(async () => {
    // Pre-cache critical files
    const urls = CRITICAL_SELF_HOST_PATHS.concat(CRITICAL_EXTERNAL_URLS);

    return caches.open(RUNTIME).then(cache =>
      Promise.allSettled(urls.map(async url => {
        const fetchedResponse = await fetch(url, { cache: 'no-store' }).then(r => insertCacheHeaderTime(r));

        const final = cache.put(url, fetchedResponse);
        final.then(() => console.log('Cached critical path: ' + url));

        return final;
      }))
    );
  });
});

self.addEventListener('fetch', event => {

  const targetUrl = new URL(event.request.url);
  if (
    // Skip cross-port requests (like docsify live-reload)
    (self.location.hostname == targetUrl.hostname && self.location.port != targetUrl.port) ||
    // Skip requests to other hosts
    HOSTNAME_WHITELIST.indexOf(targetUrl.hostname) == -1 ||
    // Skip non-GET requests
    event.request.method !== 'GET'
  ) {
    console.log("SW: Passthrough " + event.request.url);
    event.respondWith(fetch(event.request));
    return;
  }

  // Only allow necessary hosts and requests to be cached below.

  // Begin preparations
  const mainRequest = event.request;

  const noParamUrl = getNoParamUrl(mainRequest);
  const fixedUrl = getRemoteFetchUrl(mainRequest);
  const altUrl = getAltUrl(mainRequest);

  const headers = new Headers(mainRequest.headers);

  console.log("SW: Loading " + noParamUrl);

  // Get both cache and live copies
  const cached = caches.match(noParamUrl);
  const fetched = fetch(fixedUrl, { headers: headers, cache: 'no-store' });
  const fetchedCopy = fetched.then(resp => resp.clone());

  // Get the optimal response to return to the user
  event.respondWith(
    getCombinedResponsePromise(fetched, cached)
    .then(resp => {
      console.log(resp);
      return resp;
    })
    .catch(err => {
      return altUrl ? caches.match(altUrl) : Promise.reject(err);
    })
    .catch(_ => {
      return new Response(
        "<h1>408 Request Timeout</h1>" +
        "<h2>You might not be connected to the Internet</h2><p>Please check your network and try again.</p><hr />" +
        "<p>All files and pages on this documentation site, if they exist, will be automatically cached " +
        "for offline access (as long as you've loaded them with an Internet connection before).</p>",
        { status: 408, headers: { 'Content-Type': 'text/html' } }
      );
    })
  );

  // Update the cache with the version we just fetched (only if status=ok)
  event.waitUntil(
    Promise.all([fetchedCopy, caches.open(RUNTIME)])
    .then(async ([response, cache]) => {
      if (response.ok) {
        let resp = await insertCacheHeaderTime(response);
        await cache.put(noParamUrl, resp);
        if (altUrl) {
          await cache.put(altUrl, resp);
        }
      } else {
        await cache.delete(noParamUrl);
      }
    })
    .catch(async _ => { /* eat any errors */ })
  );

});




