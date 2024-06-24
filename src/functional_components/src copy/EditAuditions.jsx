import axios from 'axios';
import { useState, useEffect } from 'react';
import './AuditionCallForm.css';
import { useParams } from 'react-router-dom';

const EditAuditions = () => {
  const [users, setUsers] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auditioncall/${id}`);
        setUsers(response.data);
        setAuditionCategory(response.data.auditionCategory);
        setAuditionDescription(response.data.auditionDescription);
        setGender(response.data.gender);
        setAboutUs(response.data.aboutUs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      auditionCategory,
      auditionDescription,
      gender,
      aboutUs
    };

    if (formData.auditionCategory && formData.auditionDescription && formData.gender) {
      try {
        const response = await axios.put(`http://localhost:3001/auditioncall/${id}`, formData);
        console.log('Response:', response.data);
        document.alert('Data submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
        document.alert('Error submitting form');
      }
    } else {
      document.alert('Please fill in all fields');
    }
  };

  const [auditionCategory, setAuditionCategory] = useState('');
  const [auditionDescription, setAuditionDescription] = useState('');
  const [gender, setGender] = useState('');
  const [aboutUs, setAboutUs] = useState('');

  return (
        <div className="form-container">
            <form className="form-content" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="auditionCategory">Audition Category</label>
                    <select
                        id="auditionCategory"
                        name="auditionCategory"
                        value={auditionCategory}
                        onChange={(e) => setAuditionCategory(e.target.value)}
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
                        value={auditionDescription}
                        onChange={(e) => setAuditionDescription(e.target.value)}
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
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
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
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
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
                                checked={gender === 'other'}
                                onChange={(e) => setGender(e.target.value)}
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
                        value={aboutUs}
                        onChange={(e) => setAboutUs(e.target.value)}
                        required
                        style={{ resize: 'none', outline: 'none' }}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
  );
};

export default EditAuditions;
