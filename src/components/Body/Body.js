import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import destinationInfo from "../../fakeData/fakeData";
import DestinationCard from "../DestinationCard/DestinationCard";

const Body = () => {
  let history = useHistory();

  function onClick() {
    history.push(`/destination/${location.name}`);
  }

  let [location, setLocation] = useState(destinationInfo[0]);

  const handleMouseOver = (id) => {
    setLocation(destinationInfo[id - 1]);
  };
  return (
    <div className="row" style={{ margin: "100px 35px" }}>
      <div className="col-md-5">
        <div className="ml-ato">
          <h1 style={{ fontSize: 60 }}>{location.name.toUpperCase()}</h1>
          <p style={{ opacity: 0.8 }}>{location.description}</p>
          <Button variant="warning" onClick={onClick}>
            {"Booking ->"}
          </Button>
        </div>
      </div>
      <div className="col-md-1"></div>
      {destinationInfo.map((item) => (
        <DestinationCard
          key={item.id}
          destination={item}
          handleMouseOver={handleMouseOver}
        />
      ))}
    </div>
  );
};

export default Body;
