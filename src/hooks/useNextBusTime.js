import { convertTimeStringToMinutes, getCurrentTimeInMinutes } from '../utils';

const useNextBusTime = () => {
  const getNextBusTime = (busTimes) => {
    const currentTimeInMinutes = getCurrentTimeInMinutes();
    const nextBus = busTimes.find((time) =>convertTimeStringToMinutes(time) > currentTimeInMinutes);

    return nextBus || null;
  };

  return {
    getNextBusTime
  }
};

export default useNextBusTime;
