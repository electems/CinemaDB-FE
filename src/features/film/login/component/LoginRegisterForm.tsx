/* eslint-disable react/no-unknown-property */
/* eslint-disable no-dupe-else-if */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './index.css';
import LoginService from '@/Service/login.service';
import { Login } from '@/types/login.types';
import { User } from '@/types/user.types';
import storage from '@/utils/storage';

let errorMessage = {
  error: '',
  message: '',
  statusCode: 0,
};
export const LoginRegisterForm: React.FC = () => {
  const user = storage.getUser();
  const aboutUs: User = {
    id: 0,
    email: '',
    industrySelection: [],
  };
  const [userObject, setUserObject] = React.useState(aboutUs);
  const [verifyUser, setVerifyUser] = React.useState(aboutUs);
  const [namePhoneNumber, setNamePhoneNumber] = React.useState('');
  const [otpNumber, setOTPNumber] = React.useState('');
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNamePhoneNumber(e.target.value);
  };
  const handleInputChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOTPNumber(e.target.value);
  };
  const generateOTP = () => {
    const userNamePhoneNumber = namePhoneNumber;
    LoginService.getUserObjectByEmailOrName(userNamePhoneNumber)
      .then((response) => {
        setUserObject(response.data);
        if (userObject) {
          if (user.type === 'PERSON') {
            //Yet to implement
          }
          //TODO: Yet to implement successful login navigation
        }
      })
      .catch((e) => {
        if (e?.response?.data) {
          errorMessage = e.response.data;
        }
        if (errorMessage?.message === 'MISSING_USER' && user.type === 'PERSON') {
          navigate('/cinema/film/film');
        }

        if (
          e?.response?.data?.message &&
          e?.response?.data?.message === 'MISSING_USER' &&
          user.type === 'LOVER'
        ) {
          errorMessage = e.response.data.error;
        }
      });
  };
  const verify = () => {
    const data: Login = {
      username: namePhoneNumber,
      password: otpNumber,
    };
    LoginService.getUserAndPassword(data)
      .then((response) => {
        setVerifyUser(response.data);
        const data = response.data;
        if (data) {
          if (user.type === 'PERSON') {
            navigate(`/film/${data.step}`);
          }
          //TODO: Yet to implement successful login navigation
        }
      })
      .catch((e) => {
        if (e?.response?.data) {
          errorMessage = e.response.data;
        }
        if (errorMessage?.message === 'MISSING_USER' && user.type === 'PERSON') {
          navigate('/cinema/film/film');
        }

        if (
          e?.response?.data?.message &&
          e?.response?.data?.message === 'MISSING_USER' &&
          user.type === 'LOVER'
        ) {
          errorMessage = e.response.data.error;
        }
      });
  };
  return (
    <>
      <div>
        <h1>Enter email/password</h1>
        <p style={{ color: 'red' }}> {errorMessage.message} </p>
        <input type="text" onChange={handleInputChange} placeholder="Enter email/password"></input>

        <input type="text" onChange={handleInputChangeOtp} placeholder="OTP"></input>

        <button className="bg-sky-500/100" onClick={generateOTP}>
          Get Otp
        </button>
        <button className="btn-btn primary btn-space " onClick={verify}>
          Verify
        </button>
      </div>
    </>
  );
};
