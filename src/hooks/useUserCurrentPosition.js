import { useEffect, useState } from "react"
import usePersistentState from "./usePersistentState"

const useUserCurrentPosition = () => {
  const [position, setPosition] = useState(null)
  const [hasGeoPermission, setHasGeoPermission] = usePersistentState('has-geo-permission', false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          setPosition(position.coords)
          setHasGeoPermission(true)
      }, () => {
          console.error('Geolocation not supported or permission denied');
      });
    } else {
        console.error('Geolocation not supported');
    }
  }, [])

  return { position, hasGeoPermission }
}

export default useUserCurrentPosition
