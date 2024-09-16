import { useCallback, useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import useNearestBusStop from "../hooks/useNearestBusStop";
import { MapPin, MapPinArea } from "@phosphor-icons/react";
import { useSearchParams } from "react-router-dom";
import usePersistentState from "../hooks/usePersistentState";
import useUserCurrentPosition from "../hooks/useUserCurrentPosition";

const ShowNearestBusStop = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams()
  const nearestBusStop = useNearestBusStop();
  const { hasGeoPermission } = useUserCurrentPosition()
  const [showTips, setShowTips] = usePersistentState('show-bus-stop-tips', true)

  const toggle = () => {
    setIsOpen(!isOpen)
  };

  const goToNearestBusStop = useCallback(() => {
    searchParams.set('bus-stop', nearestBusStop.id)
    setSearchParams(searchParams)
    toggle()
  }, [nearestBusStop])

  return (
    <Modal isOpen={isOpen && showTips && hasGeoPermission} centered={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <p className="fs-5 mb-0">
          <MapPin className="mb-1" size={22} />
          Ponto próximo
        </p>
      </ModalHeader>
      <ModalBody className="text">
        <p className="fs-7">
          Esse é o ponto de ônibus mais próximo a você, veja os próximos
          horários que um ônibus irá passar nele.
        </p>
        <h3 className="my-3 mb-5 py-3 border border-radius-3 text-center rounded-3">
          <MapPinArea className="mb-1 me-2" />
          {nearestBusStop && nearestBusStop.name}
        </h3>
        <div className="d-flex gap-4 justify-content-end align-content-center">
          <label className="text-dark text-decoration-underline" size="sm" onClick={() => {
            setShowTips(false)
            setIsOpen(!false)
          }}>
            Não mostrar novamente
          </label>
          <Button size="sm" color="success" onClick={goToNearestBusStop}>
            Ver próximos horários
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShowNearestBusStop;
