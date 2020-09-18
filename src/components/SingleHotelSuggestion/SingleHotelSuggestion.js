import React from "react";

const SingleHotelSuggestion = ({ hotel, handleClick }) => {
  return (
    <div
      className="row border rounded bg-light my-3"
      onClick={() => {
        handleClick(hotel.id);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="col-md-4 d-flex align-items-center">
        <img
          src={hotel.roomImgUrl}
          alt={hotel.name}
          style={{ width: "85%", borderRadius: 8 }}
        />
      </div>
      <div className="col-md-7 my-1" style={{ color: "black" }}>
        <h5>{hotel.name}</h5>
        <p className="text-muted">
          <small>{hotel.description}</small>
        </p>
        <div className="row">
          <div className="col-md-6">
            <p>
              <img
                src="https://i.ibb.co/vV2Z8w8/star-1.png"
                alt="rating"
                style={{ width: 25 }}
              />
              {hotel.rating}
            </p>
          </div>
          <div className="col-md-6">
            <p>Avg.price/night : ৳{hotel.avg_price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotelSuggestion;
