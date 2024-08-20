import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import useCurrentBusStop from '../hooks/useCurrentBusStop';
import useBusStops from '../hooks/useBusStops';
import useItineraries from '../hooks/useItineraries';
import MapComponentBase from './MapComponentBase';
import MapComponentBaseRoutes from './MapComponentRoutes';
import { iconPin, iconPinRed } from './icons';

const MapComponent = () => {
  const { busStops } = useBusStops();
  const { setBusStopParam, currentBusStop } = useCurrentBusStop();
  const { currentItinerary } = useItineraries();

  return (
    <MapContainer style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {!currentItinerary && busStops.map((stop, key) => (
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
            <Tooltip direction='top' onClick={() => {
              setBusStopParam(stop.id)
            }} offset={[-10, -30]} permanent>{stop.name}</Tooltip>
        </Marker>
      ))}
      <MapComponentBase />
      <MapComponentBaseRoutes />
    </MapContainer>
  );
};

export default MapComponent;
