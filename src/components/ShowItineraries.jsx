import { Badge, Card, CardBody } from "reactstrap";
import useItineraries from "../hooks/useItineraries";
import { useEffect, useState } from "react";
import useUpdateHour from "../hooks/useUpdateHour";
import { ArrowRight, Clock, Info, MapPin, Star } from "@phosphor-icons/react";
import CloseDataShow from "./CloseDataShow";
import useNextBusTime from "../hooks/useNextBusTime";

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
      {hours.length === 0 && (
          <Card className="border-warning my-3">
            <CardBody className="py-2">
              <div className="d-flex align-items-center">
                <Info className="me-2 text-danger" />
                Esse itinerário finalizou por hoje
              </div>
            </CardBody>
          </Card>
        )}
      <div className="overflow-auto py-2">
       <div>
          <div className="d-flex" style={{ whiteSpace: "nowrap" }}>
            {currentItinerary.hours.map((h, key) => (
              <div key={h}>
                <Badge
                  className="me-2 d-flex align-items-center mb-2"
                  color={getNextBusTime(currentItinerary.hours) == h ? "success" : "secondary"}
                >
                  {getNextBusTime(currentItinerary.hours) == h ? (
                    <Star className="me-1" weight="fill" size={16} />
                  ) : (
                    <Clock className="me-1" weight="fill" size={16} />
                  )}
                  {h}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-auto py-2">
        <div className="d-flex" style={{ whiteSpace: "nowrap" }}>
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
