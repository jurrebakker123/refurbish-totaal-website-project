
const CACHE_NAME = 'rtn-admin-v1';
const urlsToCache = [
  '/admin-dashboard',
  '/admin',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/43b44fd9-a2c6-4670-9ec2-b2dbe73b1a5f.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Only cache admin routes
  if (event.request.url.includes('/admin')) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Return cached version or fetch from network
          return response || fetch(event.request);
        }
      )
    );
  }
});

// Handle push notifications for new requests
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/lovable-uploads/43b44fd9-a2c6-4670-9ec2-b2dbe73b1a5f.png',
      badge: '/lovable-uploads/43b44fd9-a2c6-4670-9ec2-b2dbe73b1a5f.png',
      vibrate: [200, 100, 200],
      data: {
        url: '/admin-dashboard'
      },
      actions: [
        {
          action: 'view',
          title: 'Bekijk Dashboard'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow('/admin-dashboard')
    );
  }
});
