import React from 'react';

const BusStopList = ({ busStops, onSelect }) => {
  return (
    <ul className='list-unstyled d-flex'>
      {busStops.map(stop => (
        <li className='me-3' key={stop.id} onClick={() => onSelect(stop)}>
          {stop.name}
        </li>
      ))}
    </ul>
  );
};

export default BusStopList;
