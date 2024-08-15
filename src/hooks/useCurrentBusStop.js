import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom"
import useBusStops from "./useBusStops"
import lodash, { isEmpty } from 'lodash'

const useCurrentBusStop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const stopId = searchParams.get('bus-stop')
  const { busStops } = useBusStops()

  const setBusStopParam = useCallback((id) => {
    if (isEmpty(id)) {
      searchParams.set('bus-stop', id);
    } else {
      searchParams.delete('bus-stop');
    }
    setSearchParams(searchParams);
  }, [stopId])

  const currentBusStop = useMemo(() => {
    const [filtred] = lodash.filter(busStops, stop => stop.id == stopId)
    return filtred
  }, [stopId])

  return {
    stopId,
    currentBusStop,
    setBusStopParam
  }
}

export default useCurrentBusStop
