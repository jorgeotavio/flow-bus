import React, { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col, Input, Row, Collapse } from "reactstrap";
import useItineraries from "../hooks/useItineraries";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Buildings,
  CaretDown,
  GraduationCap,
  MapPin,
} from "@phosphor-icons/react";
import useCurrentBusStop from "../hooks/useCurrentBusStop";
import { isEmpty } from "lodash";
import ModalInfo from "./ModalInfo";

const BusStopList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itineraries, setItineraryParam } = useItineraries();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentBusStop } = useCurrentBusStop();
  const { currentItinerary } = useItineraries();
  const location = useLocation();
  const navigate = useNavigate();
  const toValue = searchParams.get("to");
  const itineraryValue = searchParams.get("itinerary");

  const onChangeTo = useCallback(
    (value) => {
      searchParams.set("to", value);
      setSearchParams(searchParams);
    },
    [location]
  );

  const onChangeDestination = (e) => setItineraryParam(e.target.value);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isEmpty(currentBusStop)) {
      setIsOpen(false);
    } else if (!isEmpty(currentItinerary)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [currentItinerary, currentBusStop]);

  useEffect(() => {
    if (isEmpty(toValue)) {
      onChangeTo("Uast");
    }
  }, [location]);

  return (
    <div className="">
      <div className="d-flex align-items-center justify-content-between">
        <Col>
          <span className="me-2 cursor-pointer" onClick={() => navigate("/")}>
            <ArrowLeft className="me-2" size={16} />
            Início
          </span>
        </Col>
        <Col>
          {!isOpen && (
            <div className="d-flex align-items-center justify-content-center">
              <MapPin />
              {toValue}
            </div>
          )}
        </Col>
        <Col className="text-end">
          <div className="cursor-pointer">
            <CaretDown size={24} onClick={toggle} />
          </div>
        </Col>
      </div>
      <Collapse isOpen={isOpen} toggle={toggle}>
        <div className="my-3">
          <label className="mb-2" htmlFor="">
            Para onde você vai?
            <ModalInfo
              description={
                "Selecione a direção que você pretende ir, caso selecione Uast os itinerários serão direcionados para lá."
              }
            />
          </label>
          <Row>
            <Col className="cursor-pointer">
              <Card
                className={toValue == "Uast" ? "border-dark fw-bold" : ""}
                onClick={() => onChangeTo("Uast")}
              >
                <CardBody className="text-center py-1 d-flex align-items-center justify-content-center">
                  <GraduationCap
                    className="me-2"
                    size={16}
                    weight={toValue == "Uast" ? "fill" : "regular"}
                  />{" "}
                  Uast
                </CardBody>
              </Card>
            </Col>
            <Col className="cursor-pointer">
              <Card
                className={toValue == "Cidade" ? "border-dark fw-bold" : ""}
                onClick={() => onChangeTo("Cidade")}
              >
                <CardBody className="text-center py-1 d-flex align-items-center justify-content-center">
                  <Buildings
                    className="me-2"
                    size={16}
                    weight={toValue == "Cidade" ? "fill" : "regular"}
                  />{" "}
                  Cidade
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="mt-3">
          <label className="mb-2" htmlFor="">
            Itinerário
            <ModalInfo
              description={
                "Um itinerário é um plano que mostra a ordem dos lugares ou atividades que você vai visitar ou fazer durante uma viagem, incluindo os horários e paradas no caminho."
              }
            />
          </label>
          <Input
            type="select"
            value={itineraryValue || ""}
            onChange={onChangeDestination}
            className="cursor-pointer"
          >
            <option value="">Selecione o Itinerário</option>
            {itineraries
              .filter((i) =>
                toValue == "Uast" ? i.to == "uast" : i.to != "uast"
              )
              .map((iti, key) => (
                <option key={key} value={iti.id}>
                  {iti.fromStop.name} -- {iti.toStop.name}
                </option>
              ))}
          </Input>
        </div>
      </Collapse>
    </div>
  );
};

export default BusStopList;
