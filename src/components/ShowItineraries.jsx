import { Badge, Card, CardBody } from "reactstrap";
import useItineraries from "../hooks/useItineraries";
import { useState } from "react";
import useUpdateHour from "../hooks/useUpdateHour";
import { X } from "@phosphor-icons/react";

function ShowItineraries() {
  const { currentItinerary, setItineraryParam } = useItineraries();
  const [hour, setHour] = useState(currentItinerary.hours[0]);
  const { upadeMinutes } = useUpdateHour();

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-end">
          <X size={24} onClick={() => setItineraryParam('')} />
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
        <div className="overflow-auto py-2">
          <div className="d-flex" style={{ whiteSpace: "nowrap" }}>
            {currentItinerary.waypoints.map((w, key) => (
              <div key={w.id}>
                <Badge className="me-2 d-inline-block text-dark border border-dark" color="white">
                  {" "}
                  {hour && upadeMinutes(hour, key * 5)} - {w.name}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default ShowItineraries;
