import React from 'react'
import { Button, Img, Text } from '../../../../components/Elements'
import Header from '../../../../components/Header/header'
import Footer from '../../../../components/Footer/footer'

const ContactusPage: React.FC = () => {
  return (
      <div className="bg-gray_900 flex flex-col items-center justify-start mx-auto w-full">
      <Header className="bg-gray_800 flex flex-row font-roboto items-center justify-center md:px-5 w-full" />
        <Text
          className="font-bold font-montserrat mt-[49px] text-amber_A400 text-left w-auto"
          variant="body11"
        >
          Contact Us
        </Text>
        <Text
          className="font-bold font-montserrat mt-[17px] text-left text-white_A700 w-auto"
          variant="body26"
        >
          If you have you any query, please fill in the form below
        </Text>
        <div className="bg-gray_800 flex font-montserrat items-center justify-start max-w-[1312px] mt-[30px] mx-auto p-16 md:px-5 rounded w-full">
          <div className="flex flex-col items-center justify-start mb-[15px] w-[94%] md:w-full">
            <div className="flex md:flex-col flex-row gap-5 items-center justify-between w-full">
              <Text
                className="bg-gray_900 font-medium h-[90px] sm:px-5 px-[35px] py-[34px] rounded text-left text-white_A700 w-[535px]"
              >
                Your Name
              </Text>
              <Text
                className="bg-gray_900 font-medium h-[90px] sm:px-5 px-[35px] py-[34px] rounded text-left text-white_A700 w-[555px]"

              >
                Email{''}
              </Text>
            </div>
            <Text
              className="bg-gray_900 font-medium h-[90px] max-w-[1110px] md:max-w-full mt-[50px] pb-8 pt-[35px] sm:px-5 px-[35px] rounded text-left text-white_A700 w-full"
              variant="body26"
            >
              Contact Number
            </Text>
            <div className="bg-gray_900 flex items-start justify-start mt-[30px] p-10 sm:px-5 rounded w-full">
              <Text
                className="font-medium mb-[166px] text-left text-white_A700 w-auto"
                variant="body26"
              >
                Message{''}
              </Text>
            </div>
            <Button className="bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[1110px] md:min-w-full mt-8 py-[33px] rounded text-center text-lg text-white_A700 w-auto">
              Send Message
            </Button>
          </div>
        </div>
        <div className="bg-gray_800 flex md:flex-col flex-row font-montserrat md:gap-5 items-center justify-start max-w-[1312px] mt-10 mx-auto p-[41px] md:px-5 rounded shadow-bs w-full">
          <div className="bg-gray_900 flex md:flex-1 items-center justify-start md:mt-0 my-3 p-[47px] md:px-10 sm:px-5 rounded shadow-bs1 w-[30%] md:w-full">
            <div className="flex flex-col gap-2 justify-start mb-[3px] w-[49%] md:w-full">
              <div className="flex flex-col gap-5 items-center justify-start md:ml-[0] ml-[22px] w-[76%] md:w-full">
                <Img
                  src="/images/img_group2101.svg"
                  className="h-[94px] w-auto"
                  alt="group2101"
                />
                <Text
                  className="font-bold text-left text-white_A700 w-auto"
                  variant="body17"
                >
                  Call Us
                </Text>
              </div>
              <Text
                className="font-normal not-italic text-left text-white_A700 w-auto"
                variant="body26"
              >
                + 91 9980021200
              </Text>
            </div>
          </div>
          <div className="bg-gray_900 flex md:flex-1 items-start justify-start ml-16 md:ml-[0] md:mt-0 my-3 p-[47px] md:px-10 sm:px-5 rounded shadow-bs1 w-[30%] md:w-full">
            <div className="flex items-center justify-start mb-[29px] ml-8 md:ml-[0] w-[61%] md:w-full">
              <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                <Img
                  src="/images/img_group2101_white_a700.svg"
                  className="h-[94px] w-auto"
                  alt="group2101_One"
                />
                <Text
                  className="font-bold text-left text-white_A700 w-auto"
                  variant="body17"
                >
                  Whatsapp Chat
                </Text>
              </div>
            </div>
          </div>
          <div className="bg-gray_900 flex md:flex-1 items-center justify-start md:ml-[0] ml-[62px] md:mt-0 my-3 p-[47px] md:px-10 sm:px-5 rounded shadow-bs1 w-[30%] md:w-full">
            <div className="flex flex-col gap-2.5 items-center justify-start mb-0.5 w-[69%] md:w-full">
              <div className="flex flex-col gap-[19px] items-center justify-start w-[55%] md:w-full">
                <div className="border border-solid border-white_A700 flex items-center justify-start p-[17px] rounded w-full">
                  <Img
                    src="/images/img_mail.svg"
                    className="h-[60px] w-[60px]"
                    alt="mail"
                  />
                </div>
                <Text
                  className="font-bold text-left text-white_A700 w-auto"
                  variant="body17"
                >
                  Email Us
                </Text>
              </div>
              <Text
                className="font-normal not-italic text-left text-white_A700 w-auto"
                variant="body26"
              >
                smt.sales21@gmail.com
              </Text>
            </div>
          </div>
        </div>
        <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[50px] md:px-5 w-full" />
      </div>
  );
};

export default ContactusPage;
