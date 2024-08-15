import { useSearchParams } from 'react-router-dom'
import itinerariesData from '../data/itineraries.json'
import useBusStops from './useBusStops'
import { useMemo } from 'react'
import lodash, { isEmpty } from 'lodash'

const useItineraries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { busStops } = useBusStops()
  const itineraryId = searchParams.get('itinerary')
  const itineraries = lodash.map(itinerariesData, itinerary => ({
    ...itinerary,
    waypoints: lodash.map(itinerary.waypoints, waypoint => ({
        ...lodash.find(busStops, { id: waypoint })
      }))
  }));

  const setItineraryParam = (id) => {
    if(!isEmpty(id)){
      searchParams.set('itinerary', id);
    } else {
      searchParams.delete('itinerary');
    }
    setSearchParams(searchParams);
  }

  // const itis = lodash.filter(itinerariesData, itinerary => lodash.find(itinerary.destinations, destination => lodash.some(destination.waypoints, waypoint => waypoint.stop === 10)));

  const currentItinerary = useMemo(() => {
    const [filtred] = lodash.filter(itineraries, iti => iti.id == itineraryId)
    return filtred
  }, [itineraryId])

  const currentWaypoints = useMemo(() => {
    if (currentItinerary) {
      return currentItinerary.waypoints.map(w => w.coordenates)
    } return null
  }, [itineraryId])

  return {
    itineraries,
    setItineraryParam,
    currentItinerary,
    currentWaypoints
  }
}

export default useItineraries
