import React from 'react'

import { Img, Text, List, Line } from '../../../../components/Elements'
import { useNavigate } from 'react-router-dom'

const PlansOnePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-white_A700 flex flex-col font-montserrat mx-auto pb-[106px] relative w-full">
        <div className="h-[205px] mx-auto md:px-5 w-full">
          <Img
            src="images/img_ellipse24.png"
            className="h-[205px] m-auto object-cover w-full"
            alt="ellipseTwentyFour"
          />
          <div className="absolute flex md:flex-col flex-row md:gap-10 items-center justify-between left-[7%] top-[19%] w-[69%]">
            <div className="flex flex-row gap-7 items-center justify-start w-auto md:w-full">
              <Img
                src="images/img_arrowleft_white_a700.svg"
                className="common-pointer h-[30px] w-[30px]"
                onClick={() => navigate(-1)}
                alt="arrowleft"
              />
              <Text
                className="font-medium text-left text-white_A700 w-auto"
                variant="body11"
              >
                Back
              </Text>
            </div>
            <Text
              className="font-bold text-left text-white_A700 w-auto"
              variant="body3"
            >
              CinemaDBS Passport Membership Plans
            </Text>
          </div>
        </div>
        <div className="flex md:flex-col flex-row gap-3.5 items-center justify-center mb-[77px] ml-auto mr-[350px] mt-[-NaNpx] md:px-5 w-[46%] z-[1]">
          <List
            className="sm:flex-col flex-row md:gap-10 gap-[372px] grid grid-cols-2 overflow-auto w-[49%] md:w-full"
            orientation="horizontal"
          >
            <div className="bg-white_A700 flex flex-col items-center justify-start sm:ml-[0] py-6 rounded-[3px] shadow-bs4 w-full">
              <div className="flex flex-col gap-[13px] items-center justify-start w-[57%] md:w-full">
                <Text
                  className="text-gray_900 text-left w-auto"
                  variant="body15"
                >
                  CDBS Production
                </Text>
                <Line className="bg-red_A700 h-1 rounded-sm w-[38%]" />
              </div>
              <Line className="bg-gray_400 h-px w-full" />
              <div className="flex flex-row font-roboto items-start justify-center mt-7 w-[33%] md:w-full">
                <Img
                  src="images/img_cut.svg"
                  className="h-[23px] mt-1 w-[23px]"
                  alt="cut"
                />
                <Text
                  className="ml-1 text-black_900 text-left w-auto"
                  variant="body5"
                >
                  9,999
                </Text>
              </div>
              {/* <div className="flex flex-col font-roboto items-center justify-start mt-[54px] w-[79%] md:w-full">
                <CheckBox
                  className="font-normal leading-[normal] not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_One"
                  id="loremipsumdolor_One"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Three"
                  id="loremipsumdolor_Three"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Five"
                  id="loremipsumdolor_Five"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Seven"
                  id="loremipsumdolor_Seven"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Nine"
                  id="loremipsumdolor_Nine"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
              </div> */}
              <Text
                className="border border-red_A700 border-solid mb-2 mt-[132px] sm:px-5 px-[35px] py-[15px] rounded-[3px] text-left text-red_A700 w-auto"
                variant="body20"
              >
                Buy Now
              </Text>
            </div>
            <div className="bg-white_A700 flex flex-col justify-start sm:ml-[0] py-6 rounded-[3px] shadow-bs4 w-full">
              <Text
                className="md:ml-[0] ml-[83px] text-gray_900 text-left w-auto"
                variant="body15"
              >
                CDBS Technicians
              </Text>
              <Line className="bg-red_A700 h-1 mt-[13px] mx-auto rounded-sm w-[21%]" />
              <Line className="bg-gray_400 h-px w-full" />
              <div className="flex flex-row font-roboto items-start justify-start md:ml-[0] ml-[77px] mt-7 w-[33%] md:w-full">
                <Img
                  src="images/img_cut.svg"
                  className="h-[23px] mt-1 w-[23px]"
                  alt="cut"
                />
                <Text
                  className="ml-1 text-black_900 text-left w-auto"
                  variant="body5"
                >
                  4,999
                </Text>
              </div>
              {/* <div className="flex flex-col font-roboto items-center justify-start md:ml-[0] ml-[29px] mt-[54px] w-[79%] md:w-full">
                <CheckBox
                  className="font-normal leading-[normal] not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_One"
                  id="loremipsumdolor_One2"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Three"
                  id="loremipsumdolor_Three2"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Five"
                  id="loremipsumdolor_Five2"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Seven"
                  id="loremipsumdolor_Seven2"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
                <CheckBox
                  className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                  inputClassName="mr-[5px]"
                  name="loremipsumdolor_Nine"
                  id="loremipsumdolor_Nine2"
                  label="Lorem ipsum dolor sit amet consectetur."
                ></CheckBox>
              </div> */}
              <Text
                className="border border-red_A700 border-solid mb-2 md:ml-[0] ml-[69px] mt-[132px] sm:px-5 px-[35px] py-[15px] rounded-[3px] text-left text-red_A700 w-auto"
                variant="body20"
              >
                Buy Now
              </Text>
            </div>
          </List>
          <div
            className="common-pointer bg-white_A700 flex flex-col items-center justify-start py-6 rounded-[3px] shadow-bs4 w-[49%] md:w-full"
            onClick={() => navigate('/planstwo')}
          >
            <Text className="text-gray_900 text-left w-auto" variant="body15">
              CDBS Lifetime{' '}
            </Text>
            <Line className="bg-red_A700 h-1 mt-[13px] rounded-sm w-[21%]" />
            <Line className="bg-gray_400 h-px w-full" />
            <div className="flex flex-row font-roboto items-center justify-center mt-7 w-[39%] md:w-full">
              <Img
                src="images/img_cut.svg"
                className="h-[23px] w-[23px]"
                alt="cut"
              />
              <Text
                className="ml-[3px] text-black_900 text-left w-auto"
                variant="body5"
              >
                39,999
              </Text>
            </div>
            {/* <div className="flex flex-col font-roboto items-center justify-start mt-[55px] w-[79%] md:w-full">
              <CheckBox
                className="font-normal leading-[normal] not-italic text-[12.29px] text-black_900 text-left"
                inputClassName="mr-[5px]"
                name="loremipsumdolor_One"
                id="loremipsumdolor_One3"
                label="Lorem ipsum dolor sit amet consectetur."
              ></CheckBox>
              <CheckBox
                className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                inputClassName="mr-[5px]"
                name="loremipsumdolor_Three"
                id="loremipsumdolor_Three3"
                label="Lorem ipsum dolor sit amet consectetur."
              ></CheckBox>
              <CheckBox
                className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                inputClassName="mr-[5px]"
                name="loremipsumdolor_Five"
                id="loremipsumdolor_Five3"
                label="Lorem ipsum dolor sit amet consectetur."
              ></CheckBox>
              <CheckBox
                className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                inputClassName="mr-[5px]"
                name="loremipsumdolor_Seven"
                id="loremipsumdolor_Seven3"
                label="Lorem ipsum dolor sit amet consectetur."
              ></CheckBox>
              <CheckBox
                className="font-normal leading-[normal] mt-3 not-italic text-[12.29px] text-black_900 text-left"
                inputClassName="mr-[5px]"
                name="loremipsumdolor_Nine"
                id="loremipsumdolor_Nine3"
                label="Lorem ipsum dolor sit amet consectetur."
              ></CheckBox>
            </div> */}
            <Text
              className="border border-red_A700 border-solid mb-2 mt-[132px] sm:px-5 px-[35px] py-[15px] rounded-[3px] text-left text-red_A700 w-auto"
              variant="body20"
            >
              Buy Now
            </Text>
          </div>
        </div>
        <div className="bg-white_A700 flex flex-col items-center justify-start mb-auto ml-[26px] mt-[-75px] md:px-5 py-8 rounded shadow-bs5 w-[29%] z-[1]">
          <Text className="text-gray_900 text-left w-auto" variant="body8">
            CDBS Actor{' '}
          </Text>
          <Line className="bg-red_A700 h-1.5 mt-4 rounded-[3px] w-[22%]" />
          <Line className="bg-gray_400 h-px w-full" />
          <div className="flex flex-row font-roboto items-center justify-center mt-9 w-[33%] md:w-full">
            <Img
              src="images/img_cut.svg"
              className="h-[30px] w-[30px]"
              alt="cut_One"
            />
            <Text
              className="ml-1 text-black_900 text-left w-auto"
              as="h6"
              variant="h6"
            >
              2,999
            </Text>
          </div>
          <div className="flex flex-col font-roboto gap-4 items-center justify-start mt-[71px] w-[79%] md:w-full">
            <div className="flex flex-row gap-6 items-end justify-start w-full">
              <Img
                src="images/img_checkmark_indigo_a700.svg"
                className="h-[30px] w-[30px]"
                alt="checkmark"
              />
              <Text
                className="font-normal my-[5px] not-italic text-black_900 text-left w-auto"
                variant="body26"
              >
                Lorem ipsum dolor sit amet consectetur.
              </Text>
            </div>
            <div className="flex flex-row gap-6 items-end justify-start w-full">
              <Img
                src="images/img_checkmark_indigo_a700.svg"
                className="h-[30px] w-[30px]"
                alt="checkmark_One"
              />
              <Text
                className="font-normal my-[5px] not-italic text-black_900 text-left w-auto"
                variant="body26"
              >
                Lorem ipsum dolor sit amet consectetur.
              </Text>
            </div>
            <div className="flex flex-row gap-6 items-end justify-start w-full">
              <Img
                src="images/img_checkmark_indigo_a700.svg"
                className="h-[30px] w-[30px]"
                alt="checkmark_Two"
              />
              <Text
                className="font-normal my-[5px] not-italic text-black_900 text-left w-auto"
                variant="body26"
              >
                Lorem ipsum dolor sit amet consectetur.
              </Text>
            </div>
            <div className="flex flex-row gap-6 items-end justify-start w-full">
              <Img
                src="images/img_checkmark_indigo_a700.svg"
                className="h-[30px] w-[30px]"
                alt="checkmark_Three"
              />
              <Text
                className="font-normal my-[5px] not-italic text-black_900 text-left w-auto"
                variant="body26"
              >
                Lorem ipsum dolor sit amet consectetur.
              </Text>
            </div>
            <div className="flex flex-row gap-6 items-end justify-start w-full">
              <Img
                src="images/img_checkmark_indigo_a700.svg"
                className="h-[30px] w-[30px]"
                alt="checkmark_Four"
              />
              <Text
                className="font-normal my-[5px] not-italic text-black_900 text-left w-auto"
                variant="body26"
              >
                Lorem ipsum dolor sit amet consectetur.
              </Text>
            </div>
          </div>
          <Text
            className="border border-red_A700 border-solid font-bold mb-2.5 mt-[172px] sm:px-5 px-[35px] py-5 rounded text-left text-red_A700 w-auto"
            variant="body11"
          >
            Buy Now
          </Text>
        </div>
      </div>
    </>
  )
}

export default PlansOnePage
