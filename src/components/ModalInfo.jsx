import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Info } from "@phosphor-icons/react";

const ModalInfo = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return [
    <span className="cursor-pointer mx-2 text-muted" onClick={toggle} key={'1'}>
      <Info className="mb-1" />
    </span>,
    <Modal
      isOpen={isOpen}
      centered={true}
      toggle={toggle}
      key={'2'}
    >
      <ModalHeader toggle={toggle}>
        <p className="fs-5 mb-0">
          <Info className="mb-1 me-2 text-primary" size={18} />
          Ajuda
        </p>
      </ModalHeader>
      <ModalBody className="text">
        <p className="fs-7">
          {description}
        </p>
      </ModalBody>
    </Modal>,
  ];
};

export default ModalInfo;
