import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useUserCurrentPosition from '../hooks/useUserCurrentPosition';

const MapComponent = ({ busStops }) => {
  const position = useUserCurrentPosition()

  const center = position ? [position.latitude, position.longitude] : [-7.9820696461839695, -38.29091520605652]

  return (
    <MapContainer center={center} zoom={15} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {busStops.map((stop, key) => (
        <Marker key={key} position={[stop.coordenates.latitude, stop.coordenates.longitude]}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
