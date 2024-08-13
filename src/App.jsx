import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import BusStopList from './components/BusStopList';
import RouteFinder from './components/RouteFinder';
import busStopsData from './data/busStops.json';
import { Container } from 'reactstrap';

const App = () => {
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    setBusStops(busStopsData);
  }, []);

  const handleSelect = stop => {
    console.log('Parada selecionada:', stop);
  };

  return (
    <Container>
      <h1 className='mb-5'>Paradas de Ônibus</h1>
      <BusStopList busStops={busStops} onSelect={handleSelect} />
      <MapComponent busStops={busStops} />
      {/* <RouteFinder busStops={busStops} /> */}
    </Container>
  );
};

export default App;
