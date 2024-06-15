import React, { useState } from 'react';
import axios from 'axios';
import './AuditionCallForm.css';

const AuditionCallForm = () => {
  const [formData, setFormData] = useState({
    auditionCategory: '',
    auditionDescription: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { auditionCategory, auditionDescription, gender } = formData;
    console.log(JSON.stringify(formData))

    if (auditionCategory && auditionDescription && gender) {
      try {
        const response = await axios.post('http://localhost:3001/auditioncall/createAuditionCall', formData);
        console.log('Response:', response.data);
        alert('Data submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
        <div className="form-container">
            <form className="form-content" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="auditionCategory">Audition Category</label>
                    <select
                        id="auditionCategory"
                        name="auditionCategory"
                        value={formData.auditionCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Theater">Theater</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Film">Film</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="auditionDescription">Audition Description</label>
                    <input
                        type="text"
                        id="auditionDescription"
                        name="auditionDescription"
                        value={formData.auditionDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <fieldset>
                        <legend>Gender</legend>
                        <div className="radio-group">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="radio-group">
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div className="radio-group">
                            <input
                                type="radio"
                                id="other"
                                name="gender"
                                value="other"
                                checked={formData.gender === 'other'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="other">Other</label>
                        </div>
                    </fieldset>
                </div>

                <div className="form-group">
                    <label htmlFor="aboutUs">About Us</label>
                    <textarea
                        id="aboutUs"
                        name="aboutUs"
                        rows="4"
                        cols="50"
                        required
                        style={{ resize: 'none', outline: 'none' }}
                    ></textarea>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
  );
};

export default AuditionCallForm;
