import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewData = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const fetchData = async () => {
    try {
      const responseSandalwood = await axios.get(
        'http://localhost:3600/sandalwood'
      );
      setData1(responseSandalwood.data);
      const responseTollywood = await axios.get(
        'http://localhost:3600/tollywood'
      );
      setData2(responseTollywood.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="viewitem">
      <h1>Data from JSON Server:</h1>
      <h2>Sandalwood</h2>
      {Object.keys(data1).map((category, index) => (
  <div key={index}>
    <h2>{category}</h2>
    <ul>
      {data1[category].map((person, idx) => (
        <li key={idx}>
          Name: {person.name}, Age: {person.age}, Location: {person.location}, Email: {person.email}
        </li>
      ))}
    </ul>
  </div>
      ))}

      <h2>Tollywood</h2>
      {Object.keys(data2).map((category, index) => (
  <div key={index}>
    <h2>{category}</h2>
    <ul>
      {data2[category].map((person, idx) => (
        <li key={idx}>
          Name: {person.name}, Age: {person.age}, Location: {person.location}, Email: {person.email}
        </li>
      ))}
    </ul>
  </div>
      ))}

    </div>
  );
};

export default ViewData;
