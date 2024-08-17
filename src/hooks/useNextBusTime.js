import { useState, useEffect } from'react';

const useNextBusTime = () => {
  const getNextBusTime = (busTimes) => {
    const getCurrentTimeInMinutes = () => {
      const now = new Date();
      return now.getHours() * 60 + now.getMinutes();
    };

    const convertTimeStringToMinutes = (timeString) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const currentTimeInMinutes = getCurrentTimeInMinutes();
    const nextBus = busTimes.find((time) =>convertTimeStringToMinutes(time) > currentTimeInMinutes);

    return nextBus || null;
  };

  return {
    getNextBusTime
  }
};

export default useNextBusTime;
