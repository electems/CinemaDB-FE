/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import LoginService from '@/Service/login.service';
import storage from '@/utils/storage';

export const LoginRegisterForm: React.FC = () => {
  const user = storage.getUser();
  const [userObject, setUserObject] = React.useState({});
  const [namePhoneNumber, setNamePhoneNumber] = React.useState('');
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNamePhoneNumber(e.target.value);
  };
  const generateOTP = () => {
    const userNamePhoneNumber = namePhoneNumber;

    LoginService.getUserObjectByEmailOrName(userNamePhoneNumber)
      .then((response) => {
        setUserObject(response.data);
        if (userObject === undefined) {
          alert('user not found');
        }
        if (user.type === 'PERSON') {
          navigate('/login/step1'); //for testing purpose navigation to exisitng component
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div>
        <h1>Enter email/password</h1>
        <input type="text" onChange={handleInputChange} placeholder="Enter email/password"></input>
        <button className="btn-btn primary" onClick={generateOTP}>
          Get Otp
        </button>
      </div>
    </>
  );
};
