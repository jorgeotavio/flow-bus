import { Badge, Card, CardBody } from "reactstrap";
import useItineraries from "../hooks/useItineraries";
import { useEffect, useState } from "react";
import useUpdateHour from "../hooks/useUpdateHour";
import { ArrowRight, Clock, Info, MapPin, Star } from "@phosphor-icons/react";
import CloseDataShow from "./CloseDataShow";
import useNextBusTime from "../hooks/useNextBusTime";
import ListHours from "./ListHours";
import FinishedItineraryMessage from "./FinishedItineraryMessage";

function ShowItineraries() {
  const { currentItinerary } = useItineraries();
  console.log(currentItinerary.hours[0]);
  const { getNextBusTime } = useNextBusTime();
  const [hour, setHour] = useState(currentItinerary.hours[0]);
  const { upadeMinutes } = useUpdateHour();

  useEffect(() => {
    setHour(currentItinerary.hours[0]);
  }, [currentItinerary]);

  const hours = currentItinerary.hours.filter((h, i) => {
    const currentIdenx = currentItinerary.hours.indexOf(
      getNextBusTime(currentItinerary.hours)
    );
    return currentIdenx > -1 && currentIdenx <= i;
  });

  return (
    <div>
      <div className="d-flex justify-content-between mb-2 mb-lg-4 align-items-center border-bottom pb-2">
        <p className="d-flex align-items-center mb-0">
          <MapPin className="me-1" />
          {currentItinerary.fromStop.name}{" "}
          <ArrowRight className="mx-3" size={16} /> <MapPin className="me-1" />
          {currentItinerary.toStop.name}
        </p>
        <CloseDataShow />
      </div>
      <div>
        <ListHours hours={currentItinerary.hours} />
      </div>
      <div className="overflow-auto py-2">
        <div
          className="d-flex align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          {currentItinerary.waypoints.map((w, key) => (
            <div key={w.id}>
              <Badge
                className="d-inline-block text-dark border border-dark"
                color="white"
              >
                {hour && upadeMinutes(hour, key * 5)} - {w.name}
              </Badge>
              <ArrowRight className="mx-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowItineraries;
