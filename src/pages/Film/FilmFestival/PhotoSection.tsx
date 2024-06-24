import React from 'react';
import './style.css'

const PhotoSection = ({ data }) => {
  return (
    <div>
      <h5 className="photohead">Photos</h5>
      <div className="photos-section">
        {data.photos.map((img, index) => (
          <div className="photos" key={index}>
            <img
              src={img.photo}
              height="300px"
              width="300px"
              className="mb-4 mr-4"
              alt={`Photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSection;
