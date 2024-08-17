import { useEffect } from "react";
import { useMap } from "react-leaflet";
import useCurrentBusStop from "../hooks/useCurrentBusStop";
import useItineraries from "../hooks/useItineraries";

function MapComponentBase() {
  const map = useMap();

  const { currentBusStop } = useCurrentBusStop();
  const { currentItinerary } = useItineraries()
  // const position = useUserCurrentPosition();

  // let center = position ? [position.latitude, position.longitude] : [-7.9820696461839695, -38.29091520605652];
  let center = [-7.9628707731104935, -38.29134606557274];
  let zoom = 13;

  if (currentBusStop) {
    center = currentBusStop.coordenates;
    zoom = 16;
  }

  if (currentItinerary) {
    center = [-7.985902720672017, -38.2955573422527];
    zoom = 13;
  }

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

export default MapComponentBase
