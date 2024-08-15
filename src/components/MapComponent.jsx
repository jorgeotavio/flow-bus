import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useUserCurrentPosition from '../hooks/useUserCurrentPosition';
import { useNavigate, useParams } from 'react-router-dom';
import useCurrentBusStop from '../hooks/useCurrentBusStop';
import useNearestBusStop from '../hooks/useNearestBusStop';

function MapComponentBase({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

const MapComponent = ({ busStops }) => {
  const { busStop } = useCurrentBusStop()
  const position = useUserCurrentPosition()
  const navigate = useNavigate()

  let center = position ? [position.latitude, position.longitude] : [-7.9820696461839695, -38.29091520605652]
  let zoom = 15

  const nearestBusStop = useNearestBusStop(position)
  console.log(nearestBusStop && nearestBusStop.name);

  if (busStop) {
    center = busStop.coordenates
    zoom = 16
  }

  let busStopsToList = busStop ? busStops.filter(bs => bs.id == busStop.id) : busStops

  let waypoints = [    { lat: 51.505, lng: -0.09 },
    { lat: 51.51, lng: -0.1 },
    { lat: 51.515, lng: -0.09 },]

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {busStopsToList.map((stop, key) => (
        <Marker
          className='bg-danger'
          key={key}
          eventHandlers={{
            click: () => navigate(`/bus-stops/${stop.id}`)
          }}
          position={stop.coordenates}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}
      <MapComponentBase center={center} zoom={zoom} />
      <Polyline positions={waypoints.map(point => [point.lat, point.lng])} color="blue" />
    </MapContainer>
  );
};

export default MapComponent;
