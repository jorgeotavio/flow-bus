import { Info } from "@phosphor-icons/react";
import { Card, CardBody } from "reactstrap";

const FinishedItineraryMessage = () => {
  return (
    <div className="d-flex align-items-center text-danger fs-7">
      <Info className="me-1 text-danger" />
      Itinerário finalizado por hoje
    </div>
  );
};

export default FinishedItineraryMessage;
