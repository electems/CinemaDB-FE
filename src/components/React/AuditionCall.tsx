import React, { useEffect, useState } from 'react';
import './audition.css';
import { api } from '../../services/api';
import { IAuditionCall } from '../../types/auditioncall.type';
import { Link, useParams } from 'react-router-dom';

const initialAuditionCallState = {
  id: null,
  auditionCategory: '',
  auditionDescription: '',
  gender: ''
};

const AuditionCall: React.FC = () => {
  const [auditionCall, setAuditionCall] = React.useState(
    initialAuditionCallState
  );

  const saveAuditionCallDetails = async (e) => {
    e.preventDefault();
    const auditionCallObject: IAuditionCall = {
      auditionCategory: auditionCall.auditionCategory,
      auditionDescription: auditionCall.auditionDescription,
      gender: auditionCall.gender,
      duration: ''
    };
    const auditionCallResponse = await api.post(
      '/auditioncall/createAuditionCall',
      auditionCallObject
    );
    const filmInstituteTraining = await auditionCallResponse.data;
    const file = {
      tableName: 'AuditionCall',
      tableId: filmInstituteTraining.id
    };
    await api.post('/fileupload/createfile', file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuditionCall({ ...auditionCall, [name]: value });
  };

  const handleCancle = () => {
    setAuditionCall(initialAuditionCallState);
  };

  const param = useParams();
  const fetchDataForUpdate = async () => {
    try {
      const response = await api.get(`/auditioncall/audtions/${param.id}`);
      setAuditionCall(response.data);
    } catch (error) {
      console.log('Cannot fetch the data', error);
      alert('Failed to fetch data for update. Please try again later.');
    }
  };

  useEffect(() => {
    fetchDataForUpdate();
  }, []);

  const updateAudition = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/auditioncall/UpdateAuditionCallById/${param.id}`,
        auditionCall
      );
      alert('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:');
      alert('Failed to update data. Please try again later.');
    }
  };

  return (
    <form onSubmit={saveAuditionCallDetails}>
      <div className="form-group">
        <label htmlFor="auditionCategory">Audition Category:</label>
        <select
          id="auditionCategory"
          name="auditionCategory"
          value={auditionCall.auditionCategory}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="actor">Actor</option>
          <option value="actress">Actress</option>
          <option value="singer">Singer</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="auditionDescription">Audition Description:</label>
        <textarea
          id="auditionDescription"
          name="auditionDescription"
          value={auditionCall.auditionDescription}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
      <button type="submit">Submit</button>
      <button type="submit" onClick={handleCancle}>
        Cancel
      </button>
      <button type="submit" onClick={updateAudition}>
        Update
      </button>
      <button type="submit">
        <Link to="/userlist">Get All Audition</Link>
      </button>
    </form>
  );
};

export default AuditionCall;
