import { useSearchParams } from "react-router-dom";
import { Badge, Card, CardBody } from "reactstrap";
import { ArrowRight, Clock, MapPinLine, Star, X } from "@phosphor-icons/react";
import useCurrentBusStop from "../hooks/useCurrentBusStop";
import { useBusTimes } from "../hooks/useBusTimes";
import { isEmpty } from "lodash";
import CloseDataShow from "./CloseDataShow";
import useNextBusTime from "../hooks/useNextBusTime";

const ShowStopData = () => {
  const { currentBusStop } = useCurrentBusStop();
  const [searchParams] = useSearchParams();
  const stopId = searchParams.get("bus-stop");
  const { times } = useBusTimes(stopId);
  const { getNextBusTime } = useNextBusTime();
  console.log(times);

  const pred = {
    m: "do",
    f: "da",
    n: "de",
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4 mb-lg-4">
        <p className="d-flex align-items-center fw-bold mb-0">
          <MapPinLine className="me-2" size={22} />
          Partindo {pred[currentBusStop.gender]} {currentBusStop.name}
        </p>
        <CloseDataShow />
      </div>
      <div>
        <ul
          className="list-unstyled overflow-auto row"
          style={{ maxHeight: "150px" }}
        >
          {!isEmpty(times) &&
            times.map((time, key) => (
              <li className="mb-2 col-12 col-lg-4" key={key}>
                <Card>
                  <CardBody className="p-2">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <b>
                            {key + 1} - {currentBusStop.name}
                          </b>
                          <ArrowRight className="mx-2" />
                          <b>{time.itinerary.toStop.name}</b>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center mt-2">
                      {time.hours.map((h) => (
                        <div key={h}>
                          <Badge
                            className="me-2 d-flex align-items-center mb-2"
                            color={getNextBusTime(time.hours) == h ? "success" : "secondary"}
                          >
                            {getNextBusTime(time.hours) == h ? (
                              <Star className="me-1" weight="fill" size={16} />
                            ) : (
                              <Clock className="me-1" weight="fill" size={16} />
                            )}
                            {h}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowStopData;
