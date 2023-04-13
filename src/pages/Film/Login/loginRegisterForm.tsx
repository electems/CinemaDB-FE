import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user.types";
import { Login } from "../../../types/login.types";
import { storage } from "../../../storage/storage";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { Formulario, Background } from "./style";
import image from "../../../assets/logoimage.svg";
import Header from "../../../components/Header";
import { Context } from "../../../contexts/contextLogin";
import { Img, Text, Input, Button, Line } from "../../../components/Elements";
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
        <div className="container">
          <div className="bg-gray_800 font-montserrat h-[982px] mx-auto relative w-full">
            <div className="absolute bg-bluegray_101 flex h-full inset-y-[0] items-end justify-start my-auto p-[114px] md:px-5 right-[0] w-[55%]">
              <Img src={image} alt="authenticationr" />
            </div>
            <div className="absolute bg-white_A700 flex flex-col md:gap-10 gap-[65px] h-full inset-y-[0] items-center justify-center left-[0] my-auto p-[140px] md:px-5 rounded-bl-none rounded-br-[30px] rounded-tl-none rounded-tr-[30px] w-1/2">
              <Text
                className="font-semibold mt-[67px] text-gray_900 text-left w-auto"
                variant="body3"
              >
                Login / Register
              </Text>
              <div className="flex flex-col items-center justify-start mb-[5px] w-full">
                <div className="md:h-[282px] h-[311px] relative w-full">
                  <div className="absolute border border-solid border-white_A700 flex inset-x-[0] items-start justify-end mx-auto p-[21px] sm:px-5 rounded-[10px] top-[0] w-full">
                    <Text
                      className="font-normal ml-2 md:ml-[0] not-italic text-gray_900 text-left w-auto"
                      variant="body26"
                    >
                      Email or Mobile Number
                    </Text>
                  </div>
                  <Input
                    wrapClassName="absolute border border-solid border-white_A700 mt-[100px] mx-auto pl-[30px] pr-3 py-[21px] rounded-[10px] w-full"
                    className="font-normal leading-[normal] not-italic p-0 placeholder:text-gray_900 sm:pl-5 text-base text-gray_900 text-left w-full"
                    name="language"
                    placeholder="Enter  OTP"
                  ></Input>
                  <div className="absolute bottom-[0] flex flex-col inset-x-[0] justify-start mx-auto w-full">
                    <Text
                      className="font-medium md:ml-[0] ml-[401px] text-left text-red_A700 w-auto"
                      variant="body41"
                    >
                      Get OTP
                    </Text>
                    <div className="flex flex-col items-start justify-start md:ml-[0] ml-[7px] mt-[138px] w-[46%] md:w-full">
                      <div className="flex flex-row gap-2 items-start justify-start w-[91%] md:w-full">
                        <div className="border border-gray_400 border-solid h-[15px] rounded-[7px] w-[15px]"></div>
                        <Text
                          className="font-light mt-0.5 text-black_900 text-center w-auto"
                          variant="body41"
                        >
                          I am 18 or Above and I agree to the{" "}
                        </Text>
                      </div>
                      <div className="flex flex-row gap-2 items-start justify-start mt-[13px] w-full">
                        <div className="border border-gray_400 border-solid h-[15px] rounded-[7px] w-[15px]"></div>
                        <Text
                          className="font-light mt-0.5 text-black_900 text-center w-auto"
                          variant="body41"
                        >
                          I am Not 18 or Above and I agree to the{" "}
                        </Text>
                      </div>
                      <Text
                        className="md:ml-[0] ml-[22px] mt-[7px] text-center text-red_A700 w-auto"
                        as="h2"
                        variant="h2"
                      >
                        Terms & Conditions and Privacy Policy.{" "}
                      </Text>
                    </div>
                    <div className="flex items-center justify-start mt-[11px] w-full">
                      <Button
                        className="common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[472px] sm:min-w-full py-[15px] rounded-[12px] text-2xl md:text-[22px] text-center text-white_A700 sm:text-xl w-auto"
                        onClick={() =>
                          navigate("/loginregisterindustryselection")
                        }
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col flex-row gap-[26px] items-start justify-between mt-[47px] w-[98%] md:w-full">
                  <Line className="bg-gray_900 h-px sm:mt-0 my-3.5 w-[42%]" />
                  <Text
                    className="font-normal not-italic text-gray_900 text-left w-auto"
                    variant="body11"
                  >
                    Or
                  </Text>
                  <Line className="bg-gray_900 h-px sm:mt-0 my-3.5 w-[42%]" />
                </div>
                <div className="flex flex-row items-center justify-between mt-[51px] w-full">
                  <div className="bg-white_A700 flex h-20 items-center justify-start p-[15px] rounded-[50%] shadow-bs2 w-20">
                    <Img
                      src="images/img_image2.png"
                      className="h-[50px] md:h-auto object-cover w-[50px]"
                      alt="imageTwo"
                    />
                  </div>
                  <div className="bg-white_A700 flex h-20 items-center justify-start p-2.5 rounded-[50%] shadow-bs2 w-20">
                    <Img
                      src="images/img_image3.png"
                      className="h-[60px] md:h-auto object-cover w-[60px]"
                      alt="imageThree"
                    />
                  </div>
                  <div className="bg-white_A700 flex h-20 items-center justify-start p-[15px] rounded-[50%] shadow-bs2 w-20">
                    <Img
                      src="images/img_image14.png"
                      className="h-[50px] md:h-auto object-cover w-[50px]"
                      alt="imageFourteen"
                    />
                  </div>
                  <div className="bg-white_A700 flex h-20 items-center justify-start p-2.5 rounded-[50%] shadow-bs2 w-20">
                    <Img
                      src="images/img_image15.png"
                      className="h-[60px] md:h-auto object-cover w-[60px]"
                      alt="imageFifteen"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
};
