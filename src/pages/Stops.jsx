import React from "react";
import MapComponent from "../components/MapComponent";
import BusStopList from "../components/BusStopList";
import { Card, CardBody, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ShowStopData from "../components/ShowStopData";
import { ArrowLeft, CaretDown, X } from "@phosphor-icons/react";
import useItineraries from "../hooks/useItineraries";
import ShowItineraries from "../components/ShowItineraries";
import useCurrentBusStop from "../hooks/useCurrentBusStop";

const Stops = () => {
  const navigate = useNavigate();
  const { currentItinerary } = useItineraries();
  const { currentBusStop } = useCurrentBusStop();

  const handleSelect = (stop) => {
    console.log("Parada selecionada:", stop);
  };

  return (
    <div>
      <div className="h-100 w-100">
        <MapComponent />
      </div>
      <Col className="fixed-top p-2" xs="12" md="5">
        <Card>
          <CardBody>
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <div>
                <span
                  className="me-2 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft size={16} />
                </span>
                Tela Inicial
              </div>
              <div className="cursor-pointer">
                <CaretDown size={24} id="toggler" />
              </div>
            </div>
            <BusStopList onSelect={handleSelect} />
          </CardBody>
        </Card>
      </Col>
      {(currentItinerary || currentBusStop) && (
          <div className="fixed-bottom p-2">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-end cursor-pointer">
                  <X size={24} onClick={() => navigate("/bus-stops")} />
                </div>
                {
                 currentItinerary ? (
                   <ShowItineraries />
                 ) : (
                  currentBusStop && <ShowStopData />
                 )
                }
              </CardBody>
            </Card>
          </div>
        )}
    </div>
  );
};

export default Stops;
