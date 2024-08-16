import { useSearchParams } from "react-router-dom";
import { Badge, Card, CardBody } from "reactstrap";
import { ArrowRight, MapPinLine } from "@phosphor-icons/react";
import useCurrentBusStop from "../hooks/useCurrentBusStop";
import { useBusTimes } from "../hooks/useBusTimes";
import { isEmpty } from "lodash";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const ShowStopData = () => {
  const { currentBusStop } = useCurrentBusStop();

  const [searchParams] = useSearchParams();
  const stopId = searchParams.get("bus-stop");
  const times = useBusTimes(stopId);
  console.log(times);

  const pred = {
    m: "do",
    f: "da",
    n: "de",
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2 mb-lg-4">
        <p className="d-flex align-items-center fw-bold">
          <MapPinLine className="me-2" size={22} />
          Partindo {pred[currentBusStop.gender]} {currentBusStop.name}
        </p>
      </div>
      <div>
        <Splide options={{
          perPage: 3,
          type: 'loop',
          focus: 'center',
          gap: '1rem',
          arrows: false,
          pagination: false,
          autoWidth: true,
          breakpoints: {
            768: {
              perPage: 1
            },
            998: {
              perPage: 2
            }
          }
        }}>
          {!isEmpty(times) &&
            times.map((time, key) => (
              <SplideSlide key={key}>
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <b>{key + 1} - {currentBusStop.name}</b>
                          <ArrowRight className="mx-2" />
                          <b>{time.itinerary.toStop.name}</b>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center mt-2">
                      {time.hours.map((h, key) => (
                        <Badge className="me-1 mt-2" key={key}>{h}</Badge>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </SplideSlide>
            ))}
        </Splide>
      </div>
    </div>
  );
};

export default ShowStopData;
