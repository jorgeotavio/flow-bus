import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { MapPinLine, X } from "@phosphor-icons/react";
import useCurrentBusStop from "../hooks/useCurrentBusStop";

const ShowStopData = () => {
  const { busStop } = useCurrentBusStop();
  const navigate = useNavigate();

  return busStop ? (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-2 mb-lg-4">
          <h3 className="d-flex align-items-center"><MapPinLine className="me-3" size={24} />{busStop.name}</h3>
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
            {/* {busStop.destinations.map((destination, key) => (
              <li key={key} className="col-12 col-lg-3 mb-3">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <div>
                          <Clock size={16} />
                        </div>
                        <h5 className="ms-2 mb-0">{destination.hour}</h5>
                      </div>
                      {key === 0 && <Badge color="success"> <Star weight="fill" size={12} /> Próximo</Badge>}
                    </div>
                    <div className="d-flex align-items-center mt-2">
                      <span className="mb-0">{busStop.name}</span>
                      <div className="mx-3">
                        <ArrowRight size={16} />
                      </div>
                      <span className="mb-0">
                        {filterById(destination.to).name}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </li>
            ))} */}
          </ul>
        </div>
      </CardBody>
    </Card>
  ) : (
    <></>
  );
};

export default ShowStopData;
