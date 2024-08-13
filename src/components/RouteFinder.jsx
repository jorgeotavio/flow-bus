import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RouteFinder = ({ busStops }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const map = useMap();

  const findRoute = () => {
    const originStop = busStops.find(stop => stop.name === origin);
    const destinationStop = busStops.find(stop => stop.name === destination);

    if (originStop && destinationStop) {
      L.Routing.control({
        waypoints: [
          L.latLng(originStop.latitude, originStop.longitude),
          L.latLng(destinationStop.latitude, destinationStop.longitude)
        ],
        createMarker: () => null
      }).addTo(map);
    } else {
      alert('Origem ou destino inválido.');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={origin} 
        onChange={e => setOrigin(e.target.value)} 
        placeholder="Origem" 
      />
      <input 
        type="text" 
        value={destination} 
        onChange={e => setDestination(e.target.value)} 
        placeholder="Destino" 
      />
      <button onClick={findRoute}>Encontrar Rota</button>
    </div>
  );
};

export default RouteFinder;
