import React from "react";
import MapComponent from "../components/MapComponent";
import BusStopList from "../components/BusStopList";
import { Card, CardBody, Col } from "reactstrap";
import ShowStopData from "../components/ShowStopData";
import useItineraries from "../hooks/useItineraries";
import ShowItineraries from "../components/ShowItineraries";
import useCurrentBusStop from "../hooks/useCurrentBusStop";
import ShowNearestBusStop from "../components/ShowNearestBusStop";

const Stops = () => {
  const { currentItinerary } = useItineraries();
  const { currentBusStop } = useCurrentBusStop();

  return (
    <div>
      <div className="h-100 w-100">
        <MapComponent />
      </div>
      <Col className="fixed-top p-2 mx-auto" xs="12" md="7">
        <Card>
          <CardBody>
            <BusStopList />
          </CardBody>
        </Card>
      </Col>
      {(currentItinerary || currentBusStop) && (
        <Col className="fixed-bottom p-2 mx-auto" xs="12" md="7">
          <Card>
            <CardBody>
              {currentBusStop ? (
                 <ShowStopData />
              ) : (
                currentItinerary && <ShowItineraries />
              )}
            </CardBody>
          </Card>
        </Col>
      )}
      <ShowNearestBusStop />
    </div>
  );
};

export default Stops;
