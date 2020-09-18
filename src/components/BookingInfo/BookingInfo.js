import React from "react";
import { useParams, useHistory } from "react-router-dom";
import destinationInfo from "../../fakeData/fakeData";

const BookingInfo = () => {
  let { destination_name } = useParams();

  let destination = destinationInfo.find(
    (item) => destination_name === item.name
  );

  let defaultDate = new Date().toLocaleDateString();

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/hotels/${destination_name}`);
  };

  return (
    <div className="container row mt-5 mx-auto">
      <div className="col-md-6 mt-5">
        <h1>{destination.name.toUpperCase()}</h1>
        <p style={{ color: "lightgray" }}>{destination.description}</p>
      </div>
      <div className="col-md-5 m-auto bg-light border rounded d-flex flex-column align-items-center">
        <form
          style={{
            color: "gray",
            textAlign: "left",
            height: 325,
            marginTop: 35,
          }}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="form-group mx-2">
            <label htmlFor="Origin">Origin</label>
            <input
              type="text"
              className="form-control bg-"
              placeholder="Origin"
              required
            ></input>
          </div>
          <div className="form-group mx-2">
            <label htmlFor="Destination">Destination</label>
            <input
              type="text"
              className="form-control"
              value={destination_name}
              required
            ></input>
          </div>
          <div className="form-row mx-2">
            <div className="form-group col-md-6">
              <label htmlFor="From">From</label>
              <input
                type="date"
                className="form-control"
                defaultValue={defaultDate}
                required
              ></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="To">To</label>
              <input
                type="date"
                className="form-control"
                defaultValue={defaultDate}
                required
              ></input>
            </div>
          </div>
          <button type="submit" className="btn btn-block btn-warning">
            Start Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingInfo;
