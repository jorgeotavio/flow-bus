import React, { useCallback, useEffect } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { ArrowRight, HandPeace, Info, MapPin, Van } from "@phosphor-icons/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TipModal from "../components/TipModal";
import usePersistentState from "../hooks/usePersistentState";

const Home = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstAccess, setIsFirstAccess] = usePersistentState('is-first-access', true)
  const navigate = useNavigate();

  const openModalTips = useCallback(
    () => {
      searchParams.set("open-modal-tips", '1');
      setSearchParams(searchParams);
    },
    [location]
  );

  useEffect(() => {
    if(firstAccess === true) {
      openModalTips()
      setIsFirstAccess(false)
    }
  }, [firstAccess])

  return (
    <div className="d-flex align-items-center bg-girl">
      <Col className="d-flex align-items-center px-2 px-lg-5" xs="12" md="5" style={{ height: '100vh' }}>
        <Card className="w-100">
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
                        <div className="ms-4">Pontos e Itinerários</div>
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
                <li className="mt-3">
                  <Card
                    className="cursor-pointer"
                    onClick={() => openModalTips()}
                  >
                    <CardBody className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <HandPeace size={24} />
                        <div className="ms-4">Abrir as dicas!</div>
                      </div>
                      {/* <ArrowRight size={24} /> */}
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
      <TipModal />
    </div>
  );
};

export default Home;
