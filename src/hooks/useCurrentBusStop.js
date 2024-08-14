import { useParams } from "react-router-dom"
import useBusStops from "./useBusStops"

const useCurrentBusStop = () => {
  const { stopId } = useParams()
  const { busStops } = useBusStops()
  const busStopFiltreds = busStops.filter(b => b.id == stopId)
  const busStop = busStopFiltreds.length > 0 ? busStopFiltreds[0] : null

  return {
    stopId,
    busStop
  }
}

export default useCurrentBusStop
