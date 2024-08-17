import { useState, useEffect } from 'react';
import useItineraries from './useItineraries';

const addMinutes = (time, minutes) => {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute + minutes);
  return date.toTimeString().slice(0, 5);
};

export const useBusTimes = (busStopId) => {
  const [times, setTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const { itineraries } = useItineraries()

  useEffect(() => {
    if (!busStopId || !itineraries) return;

    const stopTimes = itineraries.filter(itinerary => {
      const { toStop } = itinerary
      return busStopId != toStop.id
    }).reduce((acc, itinerary) => {
      const stopIndex = itinerary.waypointsIds.indexOf(parseInt(busStopId));

      if (stopIndex !== -1) {
        const timeOffset = stopIndex * 5;
        const calculatedTimes = itinerary.hours.map(time => addMinutes(time, timeOffset));

        const data = {
          itinerary,
          hours: [...calculatedTimes]
        }

        setCurrentTime(calculatedTimes[0])

        acc.push(data);
      }

      return acc;
    }, []);

    setTimes(stopTimes);
  }, [busStopId]);

  return { times, currentTime };
};
