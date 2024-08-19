import { useSearchParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { ArrowRight, Info, MapPinLine } from "@phosphor-icons/react";
import useCurrentBusStop from "../hooks/useCurrentBusStop";
import { useBusTimes } from "../hooks/useBusTimes";
import { isEmpty } from "lodash";
import CloseDataShow from "./CloseDataShow";
import ListHours from "./ListHours";
import ModalInfo from "./ModalInfo";

const ShowStopData = () => {
  const { currentBusStop } = useCurrentBusStop();
  const [searchParams] = useSearchParams();
  const stopId = searchParams.get("bus-stop");
  const toValue = searchParams.get("to");
  const { times } = useBusTimes(stopId);

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
          <ModalInfo
            description={
              "Nessa listagem estão todos as próximas saídas de ônibus no ponto " +
              currentBusStop.name
            }
          />
        </p>
        <CloseDataShow />
      </div>
      <div>
        <ul
          className="list-unstyled overflow-auto row"
          style={{ maxHeight: "150px" }}
        >
          {!isEmpty(times) ? (
            times.map((time, key) => (
              <li className="mb-2 col-12 col-lg-6" key={key}>
                <Card>
                  <CardBody className="p-2 d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <h6 className="mb-2">
                          {currentBusStop.name}
                          <ArrowRight className="mx-2" />
                          {time.itinerary.toStop.name}
                        </h6>
                      </div>
                    </div>
                    <small className="d-flex align-items-center mb-1 fs-7">
                      {time.itinerary.name}{" "}
                    </small>
                    <div className="d-flex flex-column mt-2">
                      <ListHours hours={time.hours} />
                    </div>
                  </CardBody>
                </Card>
              </li>
            ))
          ) : (
            <div className="fs-7">
              <Info className="me-2 text-danger" size={16} />
              Nenhum dos ônibus que passarão aqui vão para a <b>{toValue}</b>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ShowStopData;
