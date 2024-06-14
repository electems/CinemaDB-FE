import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewData = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3600/sandalwood`);
      setData(response.data.sandalwood);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="viewitem">
      <h1>Data from JSON Server:</h1> 
       {data.map((industry, index) => (
          <li key={index}>
            <h2>{industry.industryName}</h2>
            <ul>
              {industry.categories.map((category, index) => (
                <li key={index}>
                  <h3>{category.categoryName}</h3>
                  <ul>
                    {category.items.map((item, index) => (
                      <li key={index}>
                        <p>Name: {item.name}</p>
                        <p>Age: {item.age}</p>
                        <p>Location: {item.location}</p>
                        <p>Email: {item.email}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
    </div>
  );
};

export default ViewData;
