import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import useNextBusTime from "../hooks/useNextBusTime";
import { Clock, Star, XCircle } from "@phosphor-icons/react";
import { useState } from "react";
import FinishedItineraryMessage from "./FinishedItineraryMessage";

const ListHours = ({ hours }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getNextBusTime } = useNextBusTime();
  const nextTime = getNextBusTime(hours);
  const indexNextTime = hours.indexOf(nextTime);

  const toggle = () => setIsOpen(!isOpen);

  const getHourColor = (key) => {
    if (indexNextTime > -1 && indexNextTime < key) {
      return "text-primary";
    } else if (indexNextTime == key) {
      return "text-success";
    }
    return "text-muted";
  };

  const getHourIcon = (key) => {
    if (indexNextTime > -1 && indexNextTime < key) {
      return <Clock className="me-1 mb-1" size={18} />;
    } else if (indexNextTime == key) {
      return <Star className="me-1 mb-1" weight="fill" size={18} />;
    }
    return <XCircle className="me-1 mb-1" size={18} />;
  };

  return (
    <div>
      {nextTime && (
      <p className="mb-0">
        Próxima saída às{" "}
        <b className="text-success">{getNextBusTime(hours)}h</b>
      </p>
      )}
      {!nextTime && (
        <FinishedItineraryMessage />
      )}
      <Button className="mt-2 mb-3 fs-7 cursor-pointer" onClick={toggle} color="primary" size='sm'>
        <Clock className="mb-1 me-1" />
        Mostrar horários
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Horários</ModalHeader>
        <ModalBody>
          <p>Abaixo estão listados todos os horários de saída.</p>
          {hours &&
            hours.map((h, key) => (
              <p className={getHourColor(key)} key={h}>
                {getHourIcon(key)}
                {h}
                {getNextBusTime(hours) == h && " - Próximo"}
              </p>
            ))}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ListHours;
