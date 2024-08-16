import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import useUserCurrentPosition from '../hooks/useUserCurrentPosition';
import useCurrentBusStop from '../hooks/useCurrentBusStop';
import useBusStops from '../hooks/useBusStops';
import useItineraries from '../hooks/useItineraries';
import MapComponentBase from './MapComponentBase';
import MapComponentBaseRoutes from './MapComponentRoutes';
import { iconPin, iconPinRed } from './icons';

const MapComponent = () => {
  const { busStops } = useBusStops();
  const { setBusStopParam, currentBusStop } = useCurrentBusStop();
  const { currentWaypoints } = useItineraries();

  return (
    <MapContainer style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {!currentWaypoints && busStops.map((stop, key) => (
        <Marker
          key={key}
          eventHandlers={{
            click: () => {
              setBusStopParam(stop.id)
            }
          }}
          position={stop.coordenates}
          icon={currentBusStop && currentBusStop.id == stop.id ? iconPinRed : iconPin}
          >
        </Marker>
      ))}
      <MapComponentBase />
      <MapComponentBaseRoutes />
    </MapContainer>
  );
};

export default MapComponent;
