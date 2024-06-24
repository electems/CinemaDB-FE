import React from 'react';
import './style.css';

const NavigationButtons = ({ scrollToPhoto, scrollToAbout, scrollToticket }) => {
  return (
    <div className="button-container">
      <div className="bg-yellow-300 rounded">
        <button className="button" onClick={scrollToticket} >Tickets</button>
      </div>
      <div className="bg-yellow-300 rounded">
        <button className="button" onClick={scrollToAbout} >About</button>
      </div>
      <div className="bg-yellow-300 rounded">
        <button className="button" onClick={scrollToPhoto} >Photos</button>
      </div>
      <div className="bg-yellow-300 rounded">
        <button className="button" >Public Voting</button>
      </div>
    </div>
  );
};

export default NavigationButtons;
