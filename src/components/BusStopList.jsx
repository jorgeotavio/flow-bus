import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'reactstrap';

const BusStopList = ({ busStops }) => {
  const navigate = useNavigate()
  return (
    <ul className='list-unstyled overflow-auto'>
      {busStops.map((stop, key) => (
        <li className='me-3 cursor-pointer d-inline' key={key} onClick={() => navigate(`/bus-stops/${stop.id}`)}>
          <Badge>
            {stop.name}
          </Badge>
        </li>
      ))}
    </ul>
  );
};

export default BusStopList;
