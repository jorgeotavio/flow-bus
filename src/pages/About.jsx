import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import { ArrowLeft, ArrowRight, House, Info, MapPin, Van } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center bg-girl">
      <Col
        className="d-flex align-items-center px-2 px-lg-5"
        xs="12"
        md="5"
        style={{ height: "100vh" }}
      >
        <Card className="w-100">
          <CardBody>
            <div className="mb-3">
            <span className="me-2 cursor-pointer" onClick={() => navigate("/")}>
              <ArrowLeft className="me-2" size={16} />
              Tela inicial
            </span>
            </div>
            <h1>Sobre o Flow Bus</h1>
            <p className="fs-7">
              Essa aplicação pretende simplificar a busca pelos
              pontos de ônibus da UAST-UFRPE. Você consegue selecionar um
              ponto ou os itinerários e saber dos horários que os
              coletivos irão passar.
            </p>
            <p className="text-align-justify fs-7">
              Este app foi desenvolvido para a matéria de <b> IHM </b>
              (Interfaces Homem Máquina), do curso de BSI (Bacharelado de
              Sistemas de Informação), pelo aluno{" "}
              <b> Jorge Luiz Otávio da Silva Brito</b>.
            </p>
            <p className="fs-7">
              Se você tem ideias ou observações para melhoria desse projeto, mande um
              e-mail para{" "}
              <a href="mailto:jorge.otavio@ufrpe.br">jorge.otavio@ufrpe.br</a>.
            </p>
            <p className="fs-7">
              Caso precise acessar os dados de itinerários oficiais da UAST,
              acesse <a href="https://www.uast.ufrpe.br/br/onibus-itinerario-23" target="_blank">
                Dados dos itinerários oficiais
              </a>.
            </p>
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

export default About;
