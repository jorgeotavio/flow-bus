import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import useUserCurrentPosition from '../hooks/useUserCurrentPosition';
import { useNavigate } from 'react-router-dom';
import useCurrentBusStop from '../hooks/useCurrentBusStop';
import useBusStops from '../hooks/useBusStops';
import useItineraries from '../hooks/useItineraries';
import MapComponentBase from './MapComponentBase';

const MapComponent = () => {
  const { busStops } = useBusStops();
  const { busStop } = useCurrentBusStop();
  const position = useUserCurrentPosition();
  const { itineraries } = useItineraries();

  let waypoints = itineraries.map(i => i.destinations.map(d => d.waypoints.map(w => w.coordenates)))[0][0];

  let center = position ? [position.latitude, position.longitude] : [-7.9820696461839695, -38.29091520605652];
  let zoom = 15;

  if (busStop) {
    center = busStop.coordenates;
    zoom = 16;
  }

  let busStopsToList = busStop ? busStops.filter(bs => bs.id === busStop.id) : busStops;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* {busStopsToList.map((stop, key) => (
        <Marker
          className='bg-danger'
          key={key}
          eventHandlers={{
            click: () => navigate(`/bus-stops/${stop.id}`)
          }}
          position={stop.coordenates}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))} */}
      <MapComponentBase center={center} zoom={zoom} waypoints={waypoints} />
    </MapContainer>
  );
};

export default MapComponent;
