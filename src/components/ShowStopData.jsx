import { useNavigate } from "react-router-dom"
import { Card, CardBody } from "reactstrap"
import { X } from "@phosphor-icons/react";
import useCurrentBusStop from "../hooks/useCurrentBusStop";

const ShowStopData = () => {
  const { busStop } = useCurrentBusStop()
  const navigate = useNavigate()

  return (
    busStop ?
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
