import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge, Card, CardBody } from "reactstrap";
import { ArrowRight, Bus, MapPinLine, X } from "@phosphor-icons/react";
import useCurrentBusStop from "../hooks/useCurrentBusStop";
import { useBusTimes } from "../hooks/useBusTimes";
import { isEmpty } from "lodash";

const ShowStopData = () => {
  const { currentBusStop } = useCurrentBusStop();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const stopId = searchParams.get("bus-stop");
  const times = useBusTimes(stopId);

  return currentBusStop ? (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-2 mb-lg-4">
          <h3 className="d-flex align-items-center">
            <MapPinLine className="me-3" size={24} />
            Partindo de {currentBusStop.name}
          </h3>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/bus-stops")}
          >
            <X size={24}></X>
          </div>
        </div>
        <div>
          <ul
            className="list-unstyled row"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {!isEmpty(times) &&
              times.map((time, key) => (
                <li key={key} className="col-12 col-lg-3 mb-3">
                  <Card>
                    <CardBody>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <p className="mb-0">
                            <b>
                              {currentBusStop.name}
                            </b>
                            <ArrowRight className="mx-2" />
                            <b>
                              {time.itinerary.toStop.name}
                            </b>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <span className="mb-0">
                          {time.hours.map((h) => (
                            <Badge className="me-1">{h}</Badge>
                          ))}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </li>
              ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  ) : (
    <></>
  );
};

export default ShowStopData;
