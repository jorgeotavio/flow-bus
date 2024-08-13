import { useNavigate, useParams } from "react-router-dom"
import { Card, CardBody, CardHeader } from "reactstrap"
import busStopsData from '../data/busStops.json';
import { X } from "@phosphor-icons/react";

const ShowStopData = () => {
  const { stopId } = useParams()
  const busStopFiltreds = busStopsData.filter(b => b.id == stopId)
  const busStop = busStopFiltreds.length > 0 ? busStopFiltreds[0] : null
  const navigate = useNavigate()

  return (
    stopId ?
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between">
        <h3>
          {busStop.name}
        </h3>
        <div onClick={() => navigate('/bus-stops')}>
          <X size={24} ></X>
        </div>
        </div>
        <div>
          Aqui irão aparecer os horários em que o ônibus irá passar, de acordo com os filtros feitos.
        </div>
      </CardBody>
    </Card>
    : <></>
  )
}

export default ShowStopData
