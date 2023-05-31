/* eslint-disable no-undef */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { List, Img, Text } from '../../../components/Elements'
export const SelectPreferenceForm: React.FC = () => {
  const navigate = useNavigate()

  const storeUserPreference = (type: string) => {
    navigate('/film/login/loginregister', { state: { preference: type } })
  }

  return (
    <>
      <div className="bg-white_A700 font-montserrat mx-auto p-10 sm:px-5 relative w-full">
        <div className=" flex h-max inset-[0] items-center justify-center m-auto max-w-[1382px] md:px-5 rounded w-full">
          <Text
            className="font-semibold mb-[32px] text-gray_900 text-left w-auto"
            variant="body2"
          >
            Click your preference
          </Text>
        </div>

        <List
          className="sm:flex-col flex-row gap-[92px] grid md:grid-cols-1 grid-cols-2 justify-center m-auto w-[59%]"
          orientation="horizontal"
        >
          <div
            className="common-pointer bg-bluegray_101 flex flex-col gap-[39px] items-center justify-start pt-[34px] sm:px-5 rounded-bl-none rounded-br-[50px] rounded-tl-[50px] rounded-tr-none w-full"
            onClick={() => storeUserPreference('PERSON')}
          >
            <Img
              src="/images/img_ellipse18.png"
              className="h-20 md:h-auto object-cover w-[42%]"
              alt="ellipseEighteen"
            />
            <div className="flex items-center">
              <Text variant="body2">Film Person</Text>
            </div>
          </div>
          <div
            className="common-pointer bg-bluegray_101 flex flex-col gap-[39px] items-center justify-start pt-[34px] sm:px-5 rounded-bl-none rounded-br-[50px] rounded-tl-[50px] rounded-tr-none w-full"
            onClick={() => storeUserPreference('LOVER')}
          >
            <Img
              src="/images/img_ellipse19.png"
              className="h-18 md:h-auto object-cover w-[42%]"
            />
            <div className="flex items-center">
              <Text variant="body2">Film Lover</Text>
            </div>
          </div>
        </List>
      </div>
    </>
  )
}
