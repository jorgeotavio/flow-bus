import { Badge } from "reactstrap";
import useItineraries from "../hooks/useItineraries";
import { useState } from "react";
import useUpdateHour from "../hooks/useUpdateHour";
import { ArrowRight } from "@phosphor-icons/react";

function ShowItineraries() {
  const { currentItinerary } = useItineraries();
  console.log(currentItinerary.hours[0]);

  const [hour, setHour] = useState(currentItinerary.hours[0]);
  const { upadeMinutes } = useUpdateHour();

  return (
    <div>
      <div className="d-flex justify-content-between mb-2 mb-lg-4 align-items-center">
        <h5 className="d-flex align-items-center">
          {currentItinerary.fromStop.name} <ArrowRight className="mx-3" size={16} /> {currentItinerary.toStop.name}
        </h5>
      </div>
      <div className="overflow-auto py-2">
        <div className="d-flex" style={{ whiteSpace: "nowrap" }}>
          {currentItinerary.hours.map((h) => (
            <div key={h}>
              <Badge
                className="me-2 d-inline-block"
                onClick={() => setHour(h)}
                color={hour == h ? "success" : "secondary"}
              >
                {h}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-auto py-2 mb-4">
        <div className="d-flex" style={{ whiteSpace: "nowrap" }}>
          {currentItinerary.waypoints.map((w, key) => (
            <div key={w.id}>
              <Badge
                className="me-2 d-inline-block text-dark border border-dark"
                color="white"
              >
                {hour && upadeMinutes(hour, key * 5)} - {w.name}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowItineraries;
