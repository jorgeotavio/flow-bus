import { HandWaving, Warning } from "@phosphor-icons/react";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const TipModal = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => setIsOpen(!isOpen)

  const tips = [
    {
      Icon: <HandWaving color="var(--bs-primary)" size={86} />,
      title: "Olá, bem-vindo!",
      Text: <p>Sou o <b> Flow Bus </b>, estou aqui para facilitar sua vida quando precisar saber os horários e pontos dos ônibus da UAST.</p>
    },
    // {
    //   Icon: <Warning size={86} />,
    //   title: "Dica 1",
    //   Text: <p> Sou o Flow Bus, estou aqui para facilitar sua vida quando precisar saber os horários e pontos dos ônibus da UAST.</p>
    // },
    // {
    //   Icon: <Warning size={86} />,
    //   title: "Dica 1",
    //   Text: <p> Sou o Flow Bus, estou aqui para facilitar sua vida quando precisar saber os horários e pontos dos ônibus da UAST.</p>
    // }
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    if (currentTipIndex < tips.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    } else {
      toggle()
    }
  };

  const prevTip = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex(currentTipIndex - 1);
    }
  };

  const currentTip = tips[currentTipIndex]

  return (
    <Modal centered fullscreen="sm" backdrop='static' isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="border-0">
        Se liga nas dicas!
      </ModalHeader>
      <ModalBody className="text-center d-flex flex-column align-items-center justify-content-center">
        {currentTip.Icon && (
          currentTip.Icon
        )}
        {currentTip.image && (
          <img
          src={currentTip.image}
          alt={currentTip.title}
          style={{ width: "100%" }}
          />
        )}
        <h4 className="mt-4 mb-2">{currentTip.title}</h4>
        {currentTip.Text}
      </ModalBody>
      <ModalFooter className="text-center d-flex border-0 flex-column">
        <small className="">
          {currentTipIndex+1} de {tips.length}
        </small>
        <div className="w-100 d-flex justify-content-between border-0">
          {currentTipIndex !==
            0 && (
              <Button color="secondary" onClick={prevTip}>
                Voltar
              </Button>
            )}
            <span></span>
          <Button color="primary" onClick={nextTip}>
            {currentTipIndex === tips.length - 1 ? "Concluir" : "Próxima"}
          </Button>
        </div>
        </ModalFooter>
    </Modal>
  );
};

export default TipModal;
