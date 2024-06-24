import React from 'react';
import './style.css';

const TicketDetails = ({ data }) => {
  return (
    <div className="movie-details">
      <img
        src={data.image}
        alt="Movie"
        style={{ height: '250px', width: '400px' }}
      />
      <div className="movie-venue">
        <span className="venue">
          Bengaluru International Film Festival
        </span>
        <p>
          <span className="venue">Venue:</span> {data.venue}
        </p>
        <div className="price-section">
          <p className="price-label">Price:</p>
          <p className="price-value">{data.price}</p>
        </div>
        <div className="quantity-section">
          <p className="quantity-label">Qty</p>
          <input type="number" className="quantity-input" min={1} />
        </div>
      </div>
      <div className="button-section">
        <button className="buttons">Buy Tickets</button> <br />
        <button className="buttons">Submit the Movie</button>
      </div>
    </div>
  );
};

export default TicketDetails;
