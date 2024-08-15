import React, { useCallback } from 'react';
import { Card, CardBody, Col, Input, Row } from 'reactstrap';
import useItineraries from '../hooks/useItineraries';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Buildings, GraduationCap } from '@phosphor-icons/react';

const BusStopList = () => {
  const { itineraries, setItineraryParam } = useItineraries()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const toValue = searchParams.get('to') || 'uast'
  const itineraryValue = searchParams.get('itinerary')

  const onChangeTo = useCallback((value) => {
    searchParams.set('to', value)
    setSearchParams(searchParams)
  }, [location, toValue])

  const onChangeDestination = (e) => setItineraryParam(e.target.value)

  return (
    <div>
      <div className='mb-3'>
        <label className='mb-2' htmlFor="">
          Para onde você vai?
        </label>
        <Row>
          <Col className='cursor-pointer'>
            <Card className={toValue == 'uast' && 'border-dark fw-bold'} onClick={() => onChangeTo('uast')}>
              <CardBody className='text-center py-1 d-flex align-items-center justify-content-center'>
                <GraduationCap className='me-2' size={16} weight={toValue == 'uast' ? 'fill' : 'regular'} /> Uast
              </CardBody>
            </Card>
          </Col>
          <Col className='cursor-pointer'>
            <Card className={toValue == 'city' && 'border-dark fw-bold'} onClick={() => onChangeTo('city')}>
              <CardBody className='text-center py-1 d-flex align-items-center justify-content-center'>
                <Buildings className='me-2' size={16} weight={toValue == 'city' ? 'fill' : 'regular'} /> Cidade
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
       <div className='mt-3'>
        <label className='mb-2' htmlFor="">
          Itinerário
        </label>
        <Input type='select' value={itineraryValue} onChange={onChangeDestination} className='cursor-pointer'>
          <option value="">Selecione o Itinerário</option>
          {itineraries.filter(i => toValue == 'uast' ? i.to == 'uast' : i.to != 'uast').map((iti, key) => (
            <option key={key} value={iti.id}>
              {iti.name}
            </option>
          ))}
        </Input>
      </div>
    </div>
  );
};

export default BusStopList;
