import React, { useState } from "react";
import { useParams } from "react-router-dom";
import destinationInfo from "../../fakeData/fakeData";
import SingleHotelSuggestion from "../SingleHotelSuggestion/SingleHotelSuggestion";

const Suggestion = () => {
  let { destination_name } = useParams();
  let { hotels } = destinationInfo.find(
    (placeInfo) => placeInfo.name === destination_name
  );
  let [currentMap, setCurrentMap] = useState(hotels[0].mapUrl);

  const handleClick = (id) => {
    setCurrentMap(hotels[id - 1].mapUrl);
  };

  return (
    <>
      <h3 style={{ textAlign: "center", color: "goldenrod" }}>BEST STAYS</h3>
      <div className="row d-flex justify-content-center align-items-center mx-auto">
        <div className="col-md-7 mx-auto">
          {hotels.map((hotel) => (
            <SingleHotelSuggestion
              key={hotel.id}
              hotel={hotel}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="col-md-4 mx-auto">
          <iframe
            src={currentMap}
            width="450"
            height="600"
            frameBorder="0"
            style={{ border: 0, borderRadius: 8 }}
            aria-hidden="false"
            tabIndex="0"
            title="hotelMap"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Suggestion;
