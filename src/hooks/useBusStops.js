import busStops from '../data/busStops.json'

const useBusStops = () => {

  const filterById = (id) => {
    return busStops.filter(stop => stop.id == id)[0]
  }

  return {
    busStops,
    filterById
  }
}

export default useBusStops
