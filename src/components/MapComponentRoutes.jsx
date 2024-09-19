import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import useItineraries from "../hooks/useItineraries";
import { iconPin, iconPinRed, iconPinUser } from "./icons";
import useUpdateHour from "../hooks/useUpdateHour";
import useNextBusTime from "../hooks/useNextBusTime";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import useCurrentBusStop from "../hooks/useCurrentBusStop";

function MapComponentBaseRoutes() {
  const map = useMap();
  const { currentItinerary } = useItineraries();
  const mapRoutingControlRef = useRef(null)
  const { upadeMinutes } = useUpdateHour();
  const { getNextBusTime } = useNextBusTime();
  const { setBusStopParam } = useCurrentBusStop();

  useEffect(() => {
    if (currentItinerary && currentItinerary.waypoints.length > 0) {
      const hour = getNextBusTime(currentItinerary.hours)
      const { waypoints: currentWaypoints } = currentItinerary
      mapRoutingControlRef.current = L.Routing.control({
        waypoints: currentWaypoints.map((w, key) => ({ latLng: L.latLng(w.coordenates), name: `${hour ? upadeMinutes(hour, key * 5) : ''} - ${w.name}` })),
        routeWhileDragging: false,
        show: false,
        lineOptions: {
          styles: [{ color: '#083FA6', weight: 4 }]
        },
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: i === 0 ? iconPinUser : i === currentWaypoints.length - 1 ? iconPinRed : iconPin
          }).bindTooltip(wp.name, {
            permanent: true,
            direction: 'top',
            offset: [-10, -30]
          }).on('click', () => {
            setBusStopParam(currentItinerary.waypoints[i].id);
          });
        }
      }).addTo(map);
    }
    return () => mapRoutingControlRef.current && map && map.removeControl(mapRoutingControlRef.current);
  }, [currentItinerary, map]);

  return null;
}

export default MapComponentBaseRoutes
