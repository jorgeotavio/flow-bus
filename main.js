class BusStopMap extends HTMLElement {
  constructor() {
      super();
      this.map = null;
      this.busStops = [];
  }

  connectedCallback() {
      this.innerHTML = `<div id="map"></div>`;
      this.loadMap();
  }

  loadMap() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
              this.initMap(latitude, longitude);
          }, () => {
              console.error('Geolocation not supported or permission denied');
          });
      } else {
          console.error('Geolocation not supported');
      }
  }

  initMap(lat, lng) {
      this.map = L.map('map').setView([lat, lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      this.loadBusStops();
  }

  loadBusStops() {
      fetch('bus-stops.json')
          .then(response => response.json())
          .then(data => {
              this.busStops = data;
              this.displayBusStops();
          })
          .catch(error => console.error('Error loading bus stops:', error));
  }

  displayBusStops() {
      this.busStops.forEach(stop => {
          L.marker([stop.latitude, stop.longitude])
              .addTo(this.map)
              .bindPopup(stop.name);
      });
  }
}

customElements.define('bus-stop-map', BusStopMap);

// Registering Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, error => {
              console.log('ServiceWorker registration failed: ', error);
          });
  });
}
