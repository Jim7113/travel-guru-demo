import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const DestinationCard = ({ destination, handleMouseOver }) => {
  let history = useHistory();

  function handleClick() {
    history.push(`/destination/${destination.name}`);
  }
  return (
    <div className="col-md-2 mx-auto">
      <Card
        style={{
          height: "100%",
          borderRadius: 15,
          border: "3px solid yellow",
        }}
        onClick={handleClick}
        onMouseOver={() => {
          handleMouseOver(destination.id);
        }}
      >
        <Card.Img
          style={{ width: "100%", cursor: "pointer" }}
          src={destination.imgUrl}
        />
      </Card>
    </div>
  );
};

export default DestinationCard;
