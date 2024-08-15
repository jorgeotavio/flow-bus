import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import useItineraries from "../hooks/useItineraries";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { iconPin, iconPinRed } from "./icons";

function MapComponentBaseRoutes() {
  const map = useMap();
  const { currentWaypoints } = useItineraries();
  const mapRoutingControlRef = useRef(null)

  useEffect(() => {
    if (currentWaypoints && currentWaypoints.length > 0) {
      mapRoutingControlRef.current = L.Routing.control({
        waypoints: currentWaypoints.map(w => L.latLng(w)),
        routeWhileDragging: false,
        show: false,
        createMarker: function(i, wp) {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: i === 0 ? iconPinRed : iconPin
          });
        }
      }).addTo(map);
    }
    return () => mapRoutingControlRef.current && map && map.removeControl(mapRoutingControlRef.current);
  }, [currentWaypoints, map]);

  return null;
}

export default MapComponentBaseRoutes
