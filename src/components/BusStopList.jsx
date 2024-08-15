import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Input } from 'reactstrap';

const BusStopList = ({ busStops }) => {
  const navigate = useNavigate()
  const onChangeOrigin = (e) => console.log(e.target.value)
  const onChangeDestination = (e) => navigate(`/bus-stops/${e.target.value}`)

  return (
    <div>
      {/* <div className='mb-3'>
        <label className='mb-2' htmlFor="">
          De
        </label>
        <Input type='select' onChange={onChangeDestination} className='list-unstyled overflow-auto cursor-pointer'>
          {busStops.map((stop, key) => (
            <option key={key} value={stop.id}>
              {stop.name}
            </option>
          ))}
        </Input>
      </div> */}
      <div>
        {/* <label className='mb-2' htmlFor="">
          Para
        </label> */}
        <Input type='select' onChange={onChangeDestination} className='list-unstyled overflow-auto cursor-pointer'>
          {busStops.map((stop, key) => (
            <option key={key} value={stop.id}>
              {stop.name}
            </option>
          ))}
        </Input>
      </div>
    </div>
  );
};

export default BusStopList;
