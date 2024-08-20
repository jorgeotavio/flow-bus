import { useLocation, useSearchParams } from 'react-router-dom'
import itinerariesData from '../data/itineraries.json'
import useBusStops from './useBusStops'
import { useCallback, useMemo } from 'react'
import lodash from 'lodash'

const useItineraries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { busStops } = useBusStops()
  const itineraryId = searchParams.get('itinerary')
  const location = useLocation()

  const itineraries = lodash.map(itinerariesData, itinerary => ({
    ...itinerary,
    fromStop: {
      ...lodash.find(busStops, { id: itinerary.waypointsIds[0]})
    },
    toStop: {
      ...lodash.find(busStops, { id: itinerary.waypointsIds[itinerary.waypointsIds.length - 1] })
    },
    waypoints: lodash.map(itinerary.waypointsIds, waypoint => ({
        ...lodash.find(busStops, { id: waypoint })
      }))
  }));

  const setItineraryParam = useCallback((id) => {
    if(id){
      searchParams.delete('bus-stop');
      searchParams.set('itinerary', id);
    } else {
      searchParams.delete('itinerary');
    }
    setSearchParams(searchParams);
  }, [location])

  const currentItinerary = useMemo(() => {
    const [filtred] = lodash.filter(itineraries, iti => iti.id == itineraryId)
    return filtred
  }, [itineraryId])

  return {
    itineraries,
    setItineraryParam,
    currentItinerary
  }
}

export default useItineraries
