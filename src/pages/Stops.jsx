import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import BusStopList from '../components/BusStopList';
import busStopsData from '../data/busStops.json';
import { Card, CardBody, Col, Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ShowStopData from '../components/ShowStopData';

const Stops = () => {
  const [busStops, setBusStops] = useState([]);
  const { stopId } = useParams()

  useEffect(() => {
    setBusStops(busStopsData);
  }, []);

  const handleSelect = stop => {
    console.log('Parada selecionada:', stop);
  };

  return (
    <div>
      <div className='h-100 w-100'>
        <MapComponent busStops={busStops} />
      </div>
      <div className='fixed-top p-2'>
        <Col xs='12' md='5'>
        <Card>
          <CardBody>
            Indo para
            <BusStopList busStops={busStops} onSelect={handleSelect} />
          </CardBody>
        </Card>
        </Col>
      </div>
      <div className='fixed-bottom p-2'>
        <ShowStopData />
      </div>
    </div>
  );
};

export default Stops;
