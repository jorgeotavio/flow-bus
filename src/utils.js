export const convertTimeStringToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

export const compareTimes = (time1, time2) => {
  const hour1 = convertTimeStringToMinutes(time1)
  const hour2 = convertTimeStringToMinutes(time2)

  return hour1 - hour2;
};

export const addMinutes = (time, minutes) => {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute + minutes);
  return date.toTimeString().slice(0, 5);
};
