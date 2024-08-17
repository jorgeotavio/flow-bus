import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import { ArrowRight, Info, MapPin, Van } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center bg-girl">
      <Col className="d-flex align-items-center px-2" xs="12" md="5" style={{ height: '100vh' }}>
        <Card className="border border-lg-none">
          <CardBody>
            <div className="px-0 text-center">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <MapPin className="text-danger" weight="fill" size={24} />
                <h1 className="mb-0 fw-bold">Flow Bus</h1>
              </div>
              <small>
                Tenha acesso a localização dos pontos de ônibus da UAST-UFRPE.
              </small>
              <ul className="list-unstyled mt-3">
                <li>
                  <Card
                    className="cursor-pointer"
                    onClick={() => navigate("/bus-stops")}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Van size={24} />
                        <div className="ms-4">Mostrar os pontos</div>
                      </div>
                      <ArrowRight size={24} />
                    </CardBody>
                  </Card>
                </li>
                <li className="mt-3">
                  <Card
                    className="cursor-pointer"
                    onClick={() => navigate("/about")}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Info size={24} />
                        <div className="ms-4">Sobre o app</div>
                      </div>
                      <ArrowRight size={24} />
                    </CardBody>
                  </Card>
                </li>
              </ul>
              <a href="https://www.uast.ufrpe.br/br/onibus-itinerario-23" target="_blank">
                Dados dos itinerários oficiais
              </a>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xs="12" md="7" className="d-none d-md-flex bus-home-image">
        <a
          className="text-decoration-none text-white mt-auto ms-2"
          href="https://br.freepik.com/fotos-gratis/jovem-mulher-usando-seu-smartphone-na-cidade_25272341.htm#fromView=search&page=1&position=8&uuid=dae650fa-6efa-4b06-aaf1-a7be2adf354d"
        >
          Imagem de freepik
        </a>
      </Col>
    </div>
  );
};

export default Home;
