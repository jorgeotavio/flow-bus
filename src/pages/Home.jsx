import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import BusStopList from '../components/BusStopList';
import RouteFinder from '../components/RouteFinder';
import busStopsData from '../data/busStops.json';
import { Card, CardBody, Container } from 'reactstrap';
import { ArrowRight, Info, Van } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='py-5'>
      <Container>
      <ul className='list-unstyled'>
        <li>
          <Card className='cursor-pointer' onClick={() => navigate('bus-stops')}>
            <CardBody className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <Van size={24} />
                <div className='ms-4'>
                  Mostrar os pontos
                </div>
              </div>
              <ArrowRight size={24} />
            </CardBody>
          </Card>
        </li>
        <li className='mt-3'>
          <Card className='cursor-pointer' onClick={() => navigate('bus-stops')}>
            <CardBody className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center'>
                <Info size={24} />
                <div className='ms-4'>
                  Sobre o app
                </div>
              </div>
              <ArrowRight size={24} />
            </CardBody>
          </Card>
        </li>
      </ul>
      </Container>

    </div>
  );
};

export default Home;
