import { X } from "@phosphor-icons/react";
import { useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const CloseDataShow = ( ) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()

  const close = useCallback(() => {
    searchParams.delete('bus-stop')
    searchParams.delete('itinerary')
    setSearchParams(searchParams)
  }, [location])

  return (
    <div className="d-flex alig-items-center cursor-pointer" onClick={close}>
      <X size={24} weight="bold" color="var(--bs-danger)" />
    </div>
  )
}

export default CloseDataShow
