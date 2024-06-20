import React from 'react';
import './style.css';

const NavigationButtons = ({ scrollToPhoto, scrollToAbout, scrollToticket }) => {
  return (
    <div className="flex gap-10 ml-20 mb-4">
      <div className="bg-yellow-300 text-black rounded p-2">
        <button className="button" onClick={scrollToticket} >Tickets</button>
      </div>
      <div className="bg-yellow-300 text-black rounded p-2">
        <button className="button" onClick={scrollToAbout} >About</button>
      </div>
      <div className="bg-yellow-300 text-black rounded p-2">
        <button className="button" onClick={scrollToPhoto} >Photos</button>
      </div>
      <div className="bg-yellow-300 text-black rounded p-2">
        <button className="button" >Public Voting</button>
      </div>
    </div>
  );
};

export default NavigationButtons;
