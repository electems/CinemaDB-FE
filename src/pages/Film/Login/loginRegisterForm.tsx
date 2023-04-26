import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Login } from '../../../types/login.types'
import { storage } from '../../../storage/storage'
import { api } from '../../../services/api'
import { Img, Text, Input, Button, Line } from '../../../components/Elements'
let error = new Error()
export const LoginRegisterForm: React.FC = () => {
  const [namePhoneNumber, setNamePhoneNumber] = React.useState('')
  const [otpNumber, setOTPNumber] = React.useState('')
  const userObj = storage.getUser()
  const navigate = useNavigate()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePhoneNumber(event.target.value)
  }

  const handleInputChangeOtp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTPNumber(event.target.value)
  }

  const generateOTP = async () => {
    const userNamePhoneNumber = namePhoneNumber
    try {
      return await api.get(`/auth/otp/${userNamePhoneNumber}`)
    } catch (err: any) {
      if (err?.response?.data) {
        error = err.response.data
      }
      if (error?.message === 'MISSING_USER' && userObj.type === 'PERSON') {
        navigate('/film/register/filmpersonregister', {state: namePhoneNumber})
      }
      if (
        err?.response?.data?.message &&
        err?.response?.data?.message === 'MISSING_USER' &&
        userObj.type === 'LOVER'
      ) {
        error = err.response.data.error
      }
    }
  }
  const verify = async () => {
    const data: Login = {
      username: namePhoneNumber,
      password: otpNumber
    }
    const response = await api.post('/auth/login/', data)
    storage.setUserLoggedUser(response.data)
    localStorage.setItem('@cinimaDb:Token', response.data.token)
    try {
      if (userObj.type === 'PERSON') {
        navigate('/film/register/filmpersonregister')
        // Yet to implement
      }
    } catch (err: any) {
      if (err?.response?.data) {
        error = err?.response?.data
        console.log(error.message)
      }
      if (error?.message === 'MISSING_USER' && userObj.type === 'PERSON') {
        navigate('/cinema/film/film')
      }
      if (
        err?.response?.data?.message &&
        err?.response?.data?.message === 'MISSING_USER' &&
        userObj.type === 'LOVER'
      ) {
        error = err.response.data.error
      }
    }
  }
  return (
    <>
<div className="bg-gray_800 font-montserrat h-[700px] mx-auto relative">
        <div className="absolute bg-bluegray_101 flex h-full items-end justify-start p-[114px] md:px-5 right-[0]">
          <Img
            src="/images/img_authenticationrafiki.svg"
            className=" mb-[220px] mt-[54px] w-[500px]"
          />
        </div>
        <div className="absolute bg-white_A700 flex flex-col md:gap-10 gap-[68px] h-full inset-y-[0] items-center justify-center left-[0] my-auto p-[140px] md:px-5 rounded-bl-none rounded-br-[30px] rounded-tl-none rounded-tr-[30px] w-1/2">
          <Text
            className="font-semibold mt-16 text-gray_900 text-left w-auto"
            variant="body3"
          >
            Login / Register
          </Text>
          <div className="flex flex-col items-center justify-start mb-[5px] w-full">
            <div className="md:h-[282px] h-[311px] relative w-full">
              <input onChange={handleInputChange} placeholder = "Enter Number Or Email"className="absolute border placeholder:text-gray_900 pl-[30px] `border-solid border-white_A700 flex inset-x-[0] items-start justify-end mx-auto p-[10px] sm:px-5 rounded-[10px] top-[0] w-full">
              </input>
              <div className="absolute top-2 right-2">
              <Text
              onClick={generateOTP}
                  className="font-medium md:ml-[0]  text-left text-red_A700"
                  variant="body41"
                >
                  Get OTP
                </Text>
              </div>
              <Input
                wrapClassName="absolute border border-solid border-white_A700 mt-[100px] mx-auto pl-[30px] pr-3 py-[10px] rounded-[10px] w-full"
                className="font-normal leading-[normal] not-italic p-0 placeholder:text-gray_900 sm:pl-5 text-base text-gray_900 text-left w-full"
                name="language"
                onChange={handleInputChangeOtp}
                placeholder="Enter  OTP"
              ></Input>
              <div className="absolute bottom-[0] flex flex-col inset-x-[0] justify-start mx-auto w-full">
                <div className="flex items-center justify-start mt-[11px] w-full">
                  <Button
                  onClick={verify}
                    className="common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[350px] sm:min-w-full py-[15px] rounded-[12px] text-2xl md:text-[22px] text-center text-white_A700 sm:text-xl w-auto"
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
                  src="/images/img_image2.png"
                  className="h-[50px] md:h-auto object-cover w-[50px]"
                  alt="imageTwo"
                />
              </div>
              <div className="bg-white_A700 flex h-20 items-center justify-start p-2.5 rounded-[50%] shadow-bs2 w-20">
                <Img
                  src="/images/img_image3.png"
                  className="h-[60px] md:h-auto object-cover w-[60px]"
                  alt="imageThree"
                />
              </div>
              <div className="bg-white_A700 flex h-20 items-center justify-start p-[15px] rounded-[50%] shadow-bs2 w-20">
                <Img
                  src="/images/img_image14.png"
                  className="h-[50px] md:h-auto object-cover w-[50px]"
                  alt="imageFourteen"
                />
              </div>
              <div className="bg-white_A700 flex h-20 items-center justify-start p-2.5 rounded-[50%] shadow-bs2 w-20">
                <Img
                  src="/images/img_image15.png"
                  className="h-[60px] md:h-auto object-cover w-[60px]"
                  alt="imageFifteen"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
