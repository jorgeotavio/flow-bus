import { useState, useEffect } from "react";
import useItineraries from "./useItineraries";
import { useSearchParams } from "react-router-dom";

function useNextItinerary() {
  const { itineraries } = useItineraries();
  const [nextItinerary, setNextItinerary] = useState(null);
  const [searchParams] = useSearchParams();
  const toValue = searchParams.get("to");

  useEffect(() => {
    if (!itineraries || itineraries.length === 0) return;

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    let closestItinerary = null;
    let closestTimeDifference = Infinity;
    const itFiltreds = itineraries.filter((i) =>
      toValue == "Uast" ? i.toStop.name == "UAST" : i.toStop.name != "UAST"
    );
    itFiltreds.forEach((itinerary) => {
      itinerary.hours.forEach((hour) => {
        const [hourPart, minutePart] = hour.split(":").map(Number);
        const itineraryMinutes = hourPart * 60 + minutePart;

        const timeDifference = itineraryMinutes - nowMinutes;

        if (timeDifference >= 0 && timeDifference < closestTimeDifference) {
          closestTimeDifference = timeDifference;
          closestItinerary = itinerary;
        }
      });
    });

    setNextItinerary(closestItinerary);
  }, [toValue]);

  return nextItinerary;
}

export default useNextItinerary;
