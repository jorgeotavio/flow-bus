import itinerariesData from '../data/itineraries.json'
import useBusStops from './useBusStops'

const useItineraries = () => {
  const { busStops } = useBusStops()
  const itineraries = itinerariesData.map(i => ({...i, destinations: i.destinations.map(d => ({...d, waypoints: d.waypoints.map(w => ({...w, ...busStops.filter(stop => w.stop == stop.id )[0]}))}))}))
  console.log(itineraries);

  const filterById = (id) => {
    return itineraries.filter(stop => stop.id == id)[0]
  }

  return {
    itineraries,
    filterById
  }
}

export default useItineraries
