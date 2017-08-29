/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';




importScripts("scripts/sw/sw-toolbox.js","scripts/sw/runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["images/avatar.jpg","6ce0be1f222e2780d2f52cf4577f9d0b"],["images/hamburger.svg","d2cb0dda3e8313b990e8dcf5e25d2d0f"],["images/icon-arrow-down-black.svg","e33de997516565d3d2ffcb4027ca0c09"],["images/icon-arrow-down-xl.svg","103ef706b37b7f6542de540537be8db3"],["images/icon-arrow-down.svg","06488f93578ba32b75b225e4f2bad446"],["images/icon-arrow-right.svg","445e2f29434c25e79aaf1cfb6b7d3072"],["images/icon-award.svg","4a47e76406fcf077e81c85012845d0bb"],["images/icon-back.svg","6dcb18cb723eaff3bb0edc874e42c9ae"],["images/icon-book.svg","9f74c2d845d581d1ab22e2b5ba0e068c"],["images/icon-bookmark.svg","77111b06e761b25e98ec6b934f342a84"],["images/icon-briefcase.svg","c337b81b14c6b43431cb7cb440666d37"],["images/icon-check-circle.svg","a26718220e684f33c36759c8ca97538e"],["images/icon-chevron-down-xl.svg","c73e9d89ca2622c7de163d85c5891ae3"],["images/icon-chevron-down.svg","802739efddbdba54292ca0c78ff58d3f"],["images/icon-chevrons-down.svg","591a06ffeeaa9b1fb5f0ba1a98b0374f"],["images/icon-clock.svg","8bb65b99df3ace5fa9d08cf08778fb04"],["images/icon-corner-right-down.svg","2a4fedb981a6d6768ac59afa0df13625"],["images/icon-cpu.svg","65b336dd290a7b88fa89e1a4a87b188e"],["images/icon-external-link-white.svg","ed6c4a4b59097b9d5d689802e500ba28"],["images/icon-external-link.svg","fe8f9c67b7b65a4db3a5cf7b8a6980ee"],["images/icon-eye.svg","3cecbfb6c8248913f92a9067d9ce6724"],["images/icon-facebook-dark.svg","2989d53bece7a91c8cc919085ec7312c"],["images/icon-facebook.svg","be426800fbaa5eb564225337c52c2058"],["images/icon-feather-sm.svg","594a5815d1cb828aaf8fbd30977e1b3e"],["images/icon-feather-xl.svg","e95bb6b0cc45c463e5be0791df9574cf"],["images/icon-github-dark.svg","bed48ec123c59ee6bbf3b82ef5dde572"],["images/icon-github.svg","83b38486ad0d41eea201f83ac003e646"],["images/icon-hash.svg","b1c82c98a7b2f9ea32bd076bb1c70fd1"],["images/icon-info.svg","681775881a160bda4173817ba526c9bc"],["images/icon-layout.svg","ea437f220510c9abd4a08e30dfa569b5"],["images/icon-map-pin.svg","b6a8a37f5c9965b303dd016d6224ccdc"],["images/icon-menu-close.svg","104f369590b3e90aee96cb1b4bc7ea80"],["images/icon-menu.svg","2c1a2ce4f47db7ff38ed0a1157625e5c"],["images/icon-monitor.svg","5ddb5755708c78d406d24d73ec90aad4"],["images/icon-scroll.svg","d44b1392100d4098da0ae2bc0a25ec85"],["images/icon-twitter-dark.svg","3727cf3c3f126dadde225e198e9ead34"],["images/icon-twitter.svg","399fadf2bb3261c36c55e09d6fbe2823"],["images/icon-ul-check.svg","6a6ab1f76663590a4d562eedf924e566"],["images/icon-ul-plus.svg","62a74364d7bd433ca3bcfbf9b53bbb6f"],["images/icon-users.svg","fa1b32abce0361734f4b63629a501753"],["images/photo-bw.png","71cae48b5021a8908cd0c77e08a39c34"],["images/photo-color.png","05cf64b9883e42378a1e3da25e64d01e"],["images/pi1.jpg","8f96f46fece5b14206345587158725bb"],["images/portfolio_items/1.jpg","8f96f46fece5b14206345587158725bb"],["images/portfolio_items/2.jpg","8f96f46fece5b14206345587158725bb"],["images/portfolio_items/mamwiecej-0.jpg","204786538de7cae8d872fe4ff198b193"],["images/portfolio_items/mamwiecej-1.jpg","998e8e1bfdf07740e254ee3a7240666b"],["images/portfolio_items/mwaskowski-0.jpg","6ffae08e05ad15d6b42a9ae215882748"],["images/portfolio_items/mwaskowski-1.jpg","46f81330a7569ea3af73621f19e7391c"],["images/portfolio_items/mwaskowski-2.gif","0ed987c20323538d3aa0c7b5c00f270e"],["images/portfolio_items/portfolio-0.jpg","2fec6732796a8e46dee78d9186cac7e7"],["images/portfolio_items/portfolio-1.jpg","19c6f91b23f21febf0c122926b064db3"],["images/profile.jpg","a3f069b81bf54123754b490c5908d96b"],["images/tool-bootstrap.png","96963350b8739515246b9827260e3a8c"],["images/tool-googlestarter.png","3912acc5c7888707e97df31b9e2828f0"],["images/tool-laravel.png","a70468a744a6a9705bcb43c112b5a6db"],["images/tool-photoshop.png","1a81cf351efafa2a854aab6131e2e64d"],["images/tool-sage.png","18d2949fde4dcf8d52c3b991cbf7a047"],["images/tool-sass.png","fe074db1e444cebbf572e99d404aadcd"],["images/tool-semanticui.png","847721f43d48b2169e03faafbfd4f585"],["images/tool-sketch.png","307d1e3b43d4cdcad9cc386e89dab3e7"],["images/tool-spotify.png","f6b7b00c978cc4d998f9f41c50bd2b35"],["images/tool-template.png","38c21438dea316c248f5c84b60dfa3ce"],["images/tool-uxpin.png","1c215d048180f69ec75a2658a0b99057"],["images/tool-vue.png","a936d09ce82e847281d9348c647a4f09"],["images/tool-wordpress.png","b5464a0154248352e3a5dd26dd9f7b18"],["images/touch/apple-touch-icon.png","7326f54bfe6776293f08b34c3a5fde7b"],["images/touch/chrome-touch-icon-192x192.png","571f134f59f14a6d298ddd66c015b293"],["images/touch/icon-128x128.png","7c46d686765c49b813ac5eb34fabf712"],["images/touch/ms-touch-icon-144x144-precomposed.png","452d90b250d6f41a0c8f9db729113ffd"],["index.html","b1978bc181534add1932cfc71c684aee"],["manifest.json","30d402e280a04e6fe03b32da34c70890"],["scripts/main.min.js","7731ef69c278a57ffa34ab008c63abd3"],["scripts/sw/runtime-caching.js","e3e34dcb62b5d62453b9215961585488"],["scripts/sw/sw-toolbox.js","2770efb889cc10c4de88d0b746c2a13c"],["styles/base.css","b124a8bd2b0fee56ede9966ecdd02ae3"],["styles/components/animations.css","c2839117c68bab2e38a60a44437de69b"],["styles/components/button.css","c29f58785f0cb666482bfb93a55361dd"],["styles/components/contact_form.css","72e5c990b7b339f8f8557e47695ef50c"],["styles/components/icons.css","28ad793b4bb01e9aaf3f4c4a39f88e52"],["styles/components/image.css","a6234d9439cf6882c3834cf8d4bb5a87"],["styles/components/menu.css","1b6525a14d910a72cc771bb81c28be2f"],["styles/components/portfolio_item.css","d71fd2316159fe97cd8050d02154277b"],["styles/components/section.css","c3efee591539e3bddfe7fac3a8fe13c9"],["styles/components/skills.css","d842285a4fba558afd3a400f13e3df08"],["styles/components/social.css","f26b0c892c6f50afbeed6a0671b8a434"],["styles/main.css","071cb4872b410f04ab73b2921e730caf"],["styles/reset.css","f6ad8200a7e3163a5a3a272934c9082d"],["styles/variables.css","98ae411206e8f0eba13c93a1273603ac"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-web-starter-kit-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




