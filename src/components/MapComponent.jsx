import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ busStops }) => {
  return (
    <MapContainer center={[-7.9820696461839695, -38.29091520605652]} zoom={15} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {busStops.map(stop => (
        <Marker key={stop.id} position={[stop.latitude, stop.longitude]}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
