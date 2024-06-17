import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetAllAuditions () {
  const [auditions, setAuditions] = useState([]);
  const [hasDeleted, setHasDeleted] = useState(false)

  useEffect(() => {
    fetchAuditions();
  }, [hasDeleted]);

  const deleteAuditions = async (id) => {
    await axios.delete(`http://localhost:3001/auditioncall/${id}`)
      .then(() => {
        document.alert('deleted successfully')
        setHasDeleted(true)
      })
  }

  const fetchAuditions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auditioncall/audtions');
      setAuditions(response.data);
      setHasDeleted(false)
    } catch (error) {
      console.error('Error fetching auditions:', error);
    }
  };

  return (
        <div>
            <h1>All Auditions</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Audition Category</th>
                        <th>Audition Description</th>
                        <th>Gender</th>
                        <th>About Us</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {auditions.map((audition) => (
                        <tr key={audition.id}>
                            <td>{audition.id}</td>
                            <td>{audition.auditionCategory}</td>
                            <td>{audition.auditionDescription}</td>
                            <td>{audition.gender}</td>
                            <td>{audition.aboutUs}</td>
                            <td>
                                <button style={{ margin: '10px' }} >Edit</button>
                                <button onClick={() => { deleteAuditions(audition.id) }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}

export default GetAllAuditions;
