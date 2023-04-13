import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user.types";
import { Login } from "../../../types/login.types";
import { storage } from "../../../storage/storage";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { Formulario, Background } from "./style";
import image from "../../../assets/login.svg";
import Header from "../../../components/Header";
import { Context } from "../../../contexts/contextLogin";
let errorMessage = {
  error: "",
  message: "",
  statusCode: 0,
};
let user: User = {} as User;
export const LoginRegisterForm: React.FC = () => {
  const [userObject, setUserObject] = React.useState(user);
  const [namePhoneNumber, setNamePhoneNumber] = React.useState("");
  const [verifyUser, setVerifyUser] = React.useState(user);
  const [otpNumber, setOTPNumber] = React.useState("");
  const userObj = storage.getUser();
  const navigate = useNavigate();

  const { onUserLoginSubmit } = useContext(Context);
  const { register, handleSubmit } = useForm();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePhoneNumber(event.target.value);
  };

  const handleInputChangeOtp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTPNumber(event.target.value);
  };
  const buttonClick = (data: string) => {
    console.log(data);
  };
  const generateOTP = async () => {
    const userNamePhoneNumber = namePhoneNumber;
    await api
      .get(`/auth/otp/${userNamePhoneNumber}`)
      .then((response) => {
        setUserObject(response.data);
        const data = response.data;
        console.log(data);
      })
      .catch((err) => {
        if (err?.response?.data) {
          errorMessage = err.response.data;
        }
        if (
          errorMessage?.message === "MISSING_USER" &&
          userObj.type === "PERSON"
        ) {
          navigate("/cinema/film/film");
        }

        if (
          err?.response?.data?.message &&
          err?.response?.data?.message === "MISSING_USER" &&
          userObj.type === "LOVER"
        ) {
          errorMessage = err.response.data.error;
        }
      });
  };
  const verify = () => {
    const data: Login = {
      username: namePhoneNumber,
      password: otpNumber,
    };
    api
      .post(`/auth/login/`, data)
      .then((response) => {
        setVerifyUser(response.data);
        if (verifyUser) {
          if (userObj.type === "PERSON") {
            navigate(`/film/${verifyUser.step}`);
            //Yet to implement
          }
          //TODO: Yet to implement successful login navigation
        }
      })
      .catch((err) => {
        if (err?.response?.data) {
          errorMessage = err.response.data;
        }
        if (
          errorMessage?.message === "MISSING_USER" &&
          userObj.type === "PERSON"
        ) {
          navigate("/cinema/film/film");
        }

        if (
          err?.response?.data?.message &&
          err?.response?.data?.message === "MISSING_USER" &&
          userObj.type === "LOVER"
        ) {
          errorMessage = err.response.data.error;
        }
      });
  };
  return (
    <>
      <Header />
      <Background>
        <div className="botao-voltar"></div>
        <h1 className="title">
          Welcome To <span>CinemaDB!</span>
        </h1>
        <div className="container">
          <Formulario>
            <form onSubmit={handleSubmit(generateOTP)}>
              <label>Email/Phone:</label>
              <input
                type="text"
                placeholder="Email/Phone"
                onChange={handleInputChange}
              ></input>
              <button type="submit">Otp</button>
              <label>otp:</label>
              <input
                type="text"
                placeholder="otp"
                onChange={handleInputChangeOtp}
              ></input>
            </form>
            <button onClick={() => verify()} type="submit">
              Verify
            </button>
          </Formulario>

          <img className="images" src={image} alt="" />
        </div>
      </Background>
    </>
  );
};
