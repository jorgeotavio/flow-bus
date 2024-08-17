import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ArrowRight, Info, Van } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='d-flex align-items-center'>
      <Col xs='12' md='5'>
        <div className='py-5 px-2 px-md-5'>
          <h1>Flow Bus</h1>
          <p>Nesse app você terá acesso a localização dos pontos de ônibus e os horários dos itinerários da UAST-UFRPE.</p>
          <ul className='list-unstyled'>
            <li>
              <Card className='cursor-pointer' onClick={() => navigate('/bus-stops')}>
                <CardBody className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Van size={24} />
                    <div className='ms-4'>
                      Mostrar os pontos
                    </div>
                  </div>
                  <ArrowRight size={24} />
                </CardBody>
              </Card>
            </li>
            <li className='mt-3'>
              <Card className='cursor-pointer' onClick={() => navigate('/bus-stops')}>
                <CardBody className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Info size={24} />
                    <div className='ms-4'>
                      Sobre o app
                    </div>
                  </div>
                  <ArrowRight size={24} />
                </CardBody>
              </Card>
            </li>
          </ul>
        </div>
      </Col>
      <Col xs='12' md='7' className='d-none d-md-flex bus-home-image'>
        <a className='text-decoration-none text-white mt-auto ms-2' href="https://br.freepik.com/fotos-gratis/jovem-mulher-usando-seu-smartphone-na-cidade_25272341.htm#fromView=search&page=1&position=8&uuid=dae650fa-6efa-4b06-aaf1-a7be2adf354d">Imagem de freepik</a>
      </Col>
    </div>
  );
};

export default Home;
