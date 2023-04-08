/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { List, Img, Text } from '@/components/Elements/index';

export const SelectPreferenceForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white_A700 font-montserrat h-[1012px] mx-auto p-10 sm:px-5 relative w-full">
        <List
          className="sm:flex-col flex-row md:gap-10 gap-[92px] grid md:grid-cols-1 grid-cols-2 justify-center m-auto md:px-5 w-[59%]"
          orientation="horizontal"
        >
          <div
            className="common-pointer bg-bluegray_101 flex flex-col gap-[39px] items-center justify-start p-[34px] sm:px-5 rounded-bl-none rounded-br-[50px] rounded-tl-[50px] rounded-tr-none w-full"
            onClick={() => navigate('/loginregisterfilmperson')}
          >
            <Img
              src="images/img_ellipse18.png"
              className="h-20 md:h-auto object-cover w-[42%]"
              alt="ellipseEighteen"
            />
            <div className="flex items-center justify-start mb-2.5 w-3/4 md:w-full">
              <div className="flex items-center justify-start w-full">
                <Text className="font-semibold text-gray_900 text-left w-auto" variant="body2">
                  Film Person
                </Text>
              </div>
            </div>
          </div>
        </List>
      </div>
    </>
  );
};
