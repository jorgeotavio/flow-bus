import React from 'react';

const BusStopList = ({ busStops, onSelect }) => {
  return (
    <ul className='list-unstyled d-flex'>
      {busStops.map((stop, key) => (
        <li className='me-3' key={key} onClick={() => onSelect(stop)}>
          {stop.name}
        </li>
      ))}
    </ul>
  );
};

export default BusStopList;
