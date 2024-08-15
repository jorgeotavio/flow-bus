import { useEffect, useState } from "react"

const useUserCurrentPosition = () => {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          setPosition(position.coords)
      }, () => {
          console.error('Geolocation not supported or permission denied');
      });
    } else {
        console.error('Geolocation not supported');
    }
  }, [])

  return position
}

export default useUserCurrentPosition
