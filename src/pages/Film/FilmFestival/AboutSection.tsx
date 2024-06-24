import React, { useState } from 'react';
import './style.css'

const AboutSection = ({ data }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="about-section">
      <div className="abouthead">About</div>
      <div className="para">
        {showFullText ? data.about : `${data.about.slice(0, 500)}...`}
        {!showFullText && (
          <button className="read-more" onClick={toggleShowFullText}>
            Read more
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
