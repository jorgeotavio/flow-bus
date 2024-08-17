import { X } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const CloseDataShow = ( ) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex alig-items-center cursor-pointer" onClick={() => navigate("/bus-stops")}>
      <X size={16} />
    </div>
  )
}

export default CloseDataShow
