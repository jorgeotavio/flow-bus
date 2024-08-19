import { useLocation, useSearchParams } from 'react-router-dom'
import itinerariesData from '../data/itineraries.json'
import useBusStops from './useBusStops'
import { useCallback, useMemo } from 'react'
import lodash, { isEmpty } from 'lodash'

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
    if(!isEmpty(id)){
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

  const currentWaypoints = useMemo(() => {
    if (currentItinerary) {
      return currentItinerary.waypoints.map(w => ({...w}))
    } return null
  }, [itineraryId])
  console.log(currentWaypoints);


  return {
    itineraries,
    setItineraryParam,
    currentItinerary,
    currentWaypoints
  }
}

export default useItineraries
