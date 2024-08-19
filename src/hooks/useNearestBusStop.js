import { useState, useEffect } from 'react';
import useBusStops from './useBusStops';
import useUserCurrentPosition from './useUserCurrentPosition';

function haversineDistance(coords1, coords2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(coords2[0] - coords1.latitude);
  const dLon = toRad(coords2[1] - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2[0]);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function useNearestBusStop() {
  const [nearestBusStop, setNearestBusStop] = useState(null);
  const userPosition = useUserCurrentPosition()
  const { busStops } = useBusStops()

  useEffect(() => {
    if (!userPosition) {
      setNearestBusStop(null);
      return;
    }

    let closestStop = null;
    let minDistance = Infinity;

    busStops.forEach((stop) => {
      if(stop.coordenates != null) {
        const distance = haversineDistance(userPosition, stop.coordenates);
        if (distance < minDistance) {
          minDistance = distance;
          closestStop = stop;
        }
      }
    });

    setNearestBusStop(closestStop);
  }, [userPosition, busStops]);

  return nearestBusStop;
}

export default useNearestBusStop;
