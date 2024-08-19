import { useState, useEffect } from 'react';
import useItineraries from './useItineraries';
import useNextBusTime from './useNextBusTime';
import { addMinutes, compareTimes } from '../utils';

export const useBusTimes = (busStopId) => {
  const [times, setTimes] = useState([]);
  const { itineraries } = useItineraries();
  const { getNextBusTime } = useNextBusTime()

  useEffect(() => {
    if (!busStopId || !itineraries) return;

    const now = new Date();
    const currentFormattedTime = now.toTimeString().slice(0, 5);
    console.log(currentFormattedTime);

    const stopTimes = itineraries.filter(itinerary => {
      const { toStop } = itinerary;
      return busStopId != toStop.id;
    }).reduce((acc, itinerary) => {
      const stopIndex = itinerary.waypointsIds.indexOf(parseInt(busStopId));

      if (stopIndex !== -1) {
        const timeOffset = stopIndex * 5;
        const calculatedTimes = itinerary.hours.map(time => addMinutes(time, timeOffset));

        const data = {
          itinerary,
          hours: [...calculatedTimes]
        };

        acc.push(data);
      }

      return acc;
    }, [])

    const futureTimes = [];
    const pastTimes = [];

    stopTimes.forEach(item => {
      const future = item.hours.filter(time => compareTimes(time, currentFormattedTime) > 0);
      const past = item.hours.filter(time => compareTimes(time, currentFormattedTime) <= 0);

      if (future.length > 0) {
        futureTimes.push({ ...item, hours: future });
      }

      if (past.length > 0) {
        pastTimes.push({ ...item, hours: past });
      }
    });

    futureTimes.sort((time1, time2) => {
      const hour1 = getNextBusTime(time1.hours)
      const hour2 = getNextBusTime(time2.hours)
      return compareTimes(hour1, hour2)
    });

    pastTimes.forEach(item => {
      item.hours.sort(compareTimes);
    });

    const orderedTimes = [...futureTimes, ...pastTimes];
    setTimes(orderedTimes);
  }, [busStopId]);

  return { times };
};
