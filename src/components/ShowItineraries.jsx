import { Badge } from "reactstrap";
import useItineraries from "../hooks/useItineraries";
import { useEffect, useState } from "react";
import useUpdateHour from "../hooks/useUpdateHour";
import { ArrowRight, MapPin } from "@phosphor-icons/react";
import CloseDataShow from "./CloseDataShow";
import useNextBusTime from "../hooks/useNextBusTime";
import ListHours from "./ListHours";

function ShowItineraries() {
  const { currentItinerary } = useItineraries();
  const { getNextBusTime } = useNextBusTime();
  const [hour, setHour] = useState();
  const { upadeMinutes } = useUpdateHour();

  useEffect(() => {
    setHour(getNextBusTime(currentItinerary.hours));
  }, [currentItinerary]);

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
              {key < currentItinerary.waypoints.length - 1 &&
                <ArrowRight className="mx-2" />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowItineraries;
