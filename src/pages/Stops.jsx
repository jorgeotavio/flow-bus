import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import BusStopList from '../components/BusStopList';
import busStopsData from '../data/busStops.json';
import { Card, CardBody, Col, Container } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ShowStopData from '../components/ShowStopData';
import { ArrowLeft } from '@phosphor-icons/react';

const Stops = () => {
  const navigate = useNavigate()

  const handleSelect = stop => {
    console.log('Parada selecionada:', stop);
  };

  return (
    <div>
      <div className='h-100 w-100'>
        <MapComponent />
      </div>
      <Col className='fixed-top p-2' xs='12' md='5'>
        <Card>
          <CardBody>
            <div className='mb-4 d-flex align-items-center'>
              <span className='me-2 cursor-pointer' onClick={() => navigate('/')}>
                <ArrowLeft size={16} />
              </span>
              Tela Inicial
            </div>
            <BusStopList onSelect={handleSelect} />
          </CardBody>
        </Card>
      </Col>
      <div className='fixed-bottom p-2'>
        <ShowStopData />
      </div>
    </div>
  );
};

export default Stops;
