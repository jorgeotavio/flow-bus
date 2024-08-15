import React from 'react';
import { Input } from 'reactstrap';
import useItineraries from '../hooks/useItineraries';
import { useSearchParams } from 'react-router-dom';

const BusStopList = () => {
  const { itineraries, setItineraryParam } = useItineraries()
  const onChangeDestination = (e) => setItineraryParam(e.target.value)
  const [searchParams] = useSearchParams()
  const itineraryValue = searchParams.get('itinerary')
  return (
    <div>
      {/* <div className='mb-3'>
        <label className='mb-2' htmlFor="">
          De
        </label>
        <Input type='select' onChange={onChangeDestination} className='cursor-pointer'>
          {busStops.map((stop, key) => (
            <option key={key} value={stop.id}>
              {stop.name}
            </option>
          ))}
        </Input>
      </div> */}
       <div className='mt-3'>
        <label className='mb-2' htmlFor="">
          Itinerário
        </label>
        <Input type='select' value={itineraryValue} onChange={onChangeDestination} className='cursor-pointer'>
          <option value="">Selecione o Itinerário</option>
          {itineraries.map((iti, key) => (
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
