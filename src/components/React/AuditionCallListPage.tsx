import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

const AuditionCallListPage = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const responseofAudition = await api.get('/auditioncall/audtions');
      setData(responseofAudition.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/auditioncall/deleteAuditionCall/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting audition call:', error);
    }
  };

  return (
    <div className="userlist">
      <h2>Submitted Audition Call Details:</h2>
      {data.map((audition, index) => (
        <div key={index}>
          <h3>Audition {index + 1}</h3>
          <ul>
            <li>
              <strong>Audition Category:</strong> {audition.auditionCategory}
            </li>
            <li>
              <strong>Audition Description:</strong>
              {''}
              {audition.auditionDescription}
            </li>
            <li>
              <strong>Gender:</strong> {audition.gender}
            </li>
          </ul>
          <div className="action-buttons">
            <button type="button" onClick={() => handleDelete(audition.id)}>
              Delete
            </button>
            <button type="button">
              <Link to={`/audition/${audition.id}`}>Edit</Link>
            </button>
          </div>
          <hr />
        </div>
      ))}
      <button type="submit">
        <Link to="/audition">Create Form</Link>
      </button>
    </div>
  );
};

export default AuditionCallListPage;
