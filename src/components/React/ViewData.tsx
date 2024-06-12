import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewData = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3600/sandalwood`);
            setData(response.data.actor);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);

  return (
    <div className="viewitem">
  <h1>Data from JSON Server:</h1>
  {data.map((item, index) => (
        <div key={index}>
          <h2>Name: {item.name}</h2>
          <p>Age: {item.age}</p>
          <p>Location: {item.location}</p>
          <p>Email: {item.email}</p>
        </div>
      ))}
</div>

  )
}

export default ViewData
