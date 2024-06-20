import React from 'react';
import './style.css';

const EventDetails = ({ data }) => {
  return (
    <div className="event-details">
      <p className="event-title">
        Bengaluru International Film Festival - 14th Edition
      </p>
      <div className="event-info">
        <p className="event-date">{data.dateandtime}</p>
        <p className="event-location">
          <img
            src="https://cdn.icon-icons.com/icons2/1358/PNG/512/if-advantage-nearby-1034361_88844.png"
            alt="Location icon"
            height="20px"
            width="20px"
          />
          {data.location}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
