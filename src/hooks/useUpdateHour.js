function useUpdateHour() {
  function upadeMinutes(time, minsToAdd) {
    let [hours, minutes] = time.split(':');

    let date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes) + minsToAdd);

    let newHours = String(date.getHours()).padStart(2, '0');
    let newMinutes = String(date.getMinutes()).padStart(2, '0');

    return `${newHours}:${newMinutes}`;
  }

  return {
    upadeMinutes
  }
}

export default useUpdateHour
