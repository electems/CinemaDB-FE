/* eslint-disable no-mixed-operators */
/* eslint-disable key-spacing */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Login } from '../../../types/login.types'
import { storage } from '../../../storage/storage'
import { api } from '../../../services/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { Img, Text, Input, Button, Line } from '../../../components/Elements'
import { toastify, errorToastify } from '../../../services/filmservices'
import { Radio, Space } from 'antd'

interface types {
  preference
}
export const LoginRegisterForm: React.FC = () => {
  const [namePhoneNumber, setNamePhoneNumber] = React.useState('')
  const [seconds, setSeconds] = useState(15)
  const [otpNumber, setOTPNumber] = React.useState('')
  const [activateTimer, setActivateTimer] = React.useState(false)
  const preference = useLocation().state as types
  const navigate = useNavigate()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePhoneNumber(event.target.value)
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  const handleInputChangeOtp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTPNumber(event.target.value)
  }
  const interval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1)
    }

    if (seconds === 0) {
      setActivateTimer(false)
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
      setActivateTimer(false)
    }
  }, 1000)

  const generateOTP = async () => {
    const userNamePhoneNumber = namePhoneNumber
    if (userNamePhoneNumber.length === 0) {
      await errorToastify('Please Enter Email Or Phone Number')
    } else {
      const response = await api.get(`/auth/otp/${userNamePhoneNumber}`)
      if (response === undefined) {
        await errorToastify('Please Enter Correct Email Or Phone Number')
      } else {
        const userObject = response.data
        if (userObject.role === null || userObject.role === '') {
          await api.put(`/auth/updateuser/${userObject.id}`, {
            role: preference.preference,
            status: 'ACTIVE'
          })
          await toastify('OTP Sent Successfully')
        } else {
          await toastify('OTP Sent Successfully')
        }
      }
    }
  }
  const verify = async () => {
    if (namePhoneNumber.length === 0) {
      await errorToastify('Please Enter Email Or Phone Number')
    } else if (otpNumber.length === 0) {
      await errorToastify('Please Enter OTP To Continue')
    } else {
      const data: Login = {
        username: namePhoneNumber,
        password: otpNumber
      }
      const response = await api.post('/auth/login', data)
      const userResponse = response.data
      if (userResponse.status === 'Invalid_Password') {
        await errorToastify('Enter Correct OTP')
      } else if (userResponse.status === 'Expired_OTP') {
        await errorToastify('Your OTP Is Expired')
      } else {
        storage.setUserLoggedUser(response.data)
        const loggedUser = storage.getLoggedUser()
        localStorage.setItem('@cinimaDb:Token', response.data.token)
        if (loggedUser.planId != null) {
          navigate('/film/public/mainscreenafterlogin')
        } else if (loggedUser.role === 'PERSON') {
          if (loggedUser.step === '/film/register/filmpersonregister' ||
              !loggedUser.step) {
            // step2
            navigate('/film/register/filmpersonregister')
          }
          const keys: number[] = []
          if (loggedUser.step === '/film/register/selectedindustry') {
            // step3
            for (let i = 0; i <= loggedUser.industrySelection.length - 1; i++) {
              keys.push(loggedUser.industrySelection[i].key as number)
            }
            navigate(loggedUser.step, {
              state: {
                selectedNodes: loggedUser.industrySelection
              }
            })
          }
        } else if (loggedUser.role === 'LOVER') {
          navigate('/film/register/cinemafansform', { state:  { loggedUser } })
        }
      }
    }
  }

  return (
    <>
      <div className="bg-gray_800 font-montserrat h-screen">
        <div className="absolute bg-bluegray_101 flex h-full items-end justify-start p-[114px] md:px-5 right-[0]">
          <Img
            src="/images/img_authenticationrafiki.svg"
            className=""
          />
        </div>
        <div className="absolute bg-white_A700 flex flex-col md:gap-10 gap-[68px] h-full inset-y-[0] items-center justify-center left-[0] my-auto p-[140px] md:px-5 rounded-bl-none rounded-br-[30px] rounded-tl-none rounded-tr-[30px] w-1/2">
          <div className="mt-30">
          <Text
            className="font-semibold text-gray_900 text-left w-auto "
            variant="body3"
          >
            Login / Register
          </Text>
          <div className="countdown-text">
          {seconds > 0 && activateTimer === true
            ? <p>
          Time Remaining:
          {seconds < 10 ? `0${seconds}` : seconds }
        </p>
            : ''}
                  </div>
                  </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className=" h-[311px] relative w-full">
              <input onChange={handleInputChange} placeholder="Enter Number Or Email" className="absolute border placeholder:text-gray_900 pl-[30px] border-solid border-white_A700 flex inset-x-[0] items-start justify-end mx-auto p-[10px] sm:px-5 rounded-[10px] top-[0] w-full">
              </input>
                <div className="absolute top-2 right-2 ">
                   <button
                    onClick={generateOTP}
                    className="cursor-pointer text-left text-red_A700 get-otp"
                     >
                     Get OTP
                   </button>
                </div>
              <div>
              <Input
                wrapClassName="absolute border border-solid border-white_A700 mt-[100px] mx-auto pl-[30px] pr-3 py-[10px] rounded-[10px] w-full"
                className="font-normal leading-[normal] not-italic p-0 placeholder:text-gray_900 sm:pl-5 text-base text-gray_900 text-left w-full"
                name="language"
                onChange={handleInputChangeOtp}
                placeholder="Enter  OTP"
              ></Input>
              </div>
              <div className="absolute bottom-[0] flex flex-col inset-x-[0] justify-start mx-auto w-full">
                <div>
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio className="text-base" value={1}>I am 18 or Above and I agree to the </Radio>
                      <Radio className="text-base" value={2}>I am Not 18 or Above and I agree to the </Radio>
                    </Space>
                  </Radio.Group>
                </div>
                  <p className="text-red_A700 text-sm pl-6 pt-1">Terms & Conditions and Privacy Policy. </p>
                <div className="flex items-center justify-start mt-[11px] w-full">
                  <Button
                    onClick={verify}
                    className="common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[400px] sm:min-w-full py-[15px] rounded-[12px] text-2xl md:text-[22px] text-center text-white_A700 sm:text-xl w-auto"
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
