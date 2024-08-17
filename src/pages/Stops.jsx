import React from "react";
import MapComponent from "../components/MapComponent";
import BusStopList from "../components/BusStopList";
import { Card, CardBody, Col } from "reactstrap";
import ShowStopData from "../components/ShowStopData";
import useItineraries from "../hooks/useItineraries";
import ShowItineraries from "../components/ShowItineraries";
import useCurrentBusStop from "../hooks/useCurrentBusStop";

const Stops = () => {
  const { currentItinerary } = useItineraries();
  const { currentBusStop } = useCurrentBusStop();

  return (
    <div>
      <div className="h-100 w-100">
        <MapComponent />
      </div>
      <Col className="fixed-top p-2" xs="12" md="5">
        <Card>
          <CardBody>
            <BusStopList />
          </CardBody>
        </Card>
      </Col>
      {(currentItinerary || currentBusStop) && (
          <div className="fixed-bottom p-2">
            <Card>
              <CardBody>
                {currentItinerary ? (
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
