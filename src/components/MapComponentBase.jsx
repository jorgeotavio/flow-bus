import { useEffect } from "react";
import { useMap } from "react-leaflet";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

function MapComponentBase({ center, zoom, waypoints }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (waypoints && waypoints.length > 0) {
      const routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        show: false,
        createMarker: function(i, wp) {
          return L.marker(wp.latLng, {
            draggable: false
          });
        }
      }).addTo(map);
      console.log('aui');

      return () => map.removeLayer(routingControl);
    }
  }, [waypoints, map]);

  return null;
}

export default MapComponentBase
