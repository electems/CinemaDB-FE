/* eslint-disable import/no-unresolved */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { InputField, Form } from '@/components/Form';
import LoginService from '@/Service/login.service';

import { Img, Text, Input, Button, Line } from '../../../../components/Elements/index';
export const LoginRegisterForm: React.FC = () => {
  const [about, setAbout] = React.useState({});
  const [name, setName] = React.useState('');
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const saveTutorial = () => {
    const data = name;

    LoginService.getUserObjectByEmailOrName(data)
      .then((response) => {
        setAbout(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div>
        <h1>Enter email/password</h1>
        <input
          type="text"
          name="fname"
          onChange={handleInputChange}
          placeholder="Enter email/password"
        ></input>
        <button className="btn-btn primary" onClick={saveTutorial}>
          Get Otp
        </button>
      </div>
    </>
  );
};
