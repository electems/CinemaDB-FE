import React, { useEffect } from "react";
import { api } from "../../../../services/api";
import { Img, Text } from "../../../../components/Elements";

interface Iaboutus {
  headerImg?: string;
  headerImg2: string;
  headerTitle: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph1Image?: string;
  paragraph2Image?: string;
  paragraph3Image?: string;
}

const AboutusPage: React.FC = () => {
  let aboutUs: Iaboutus = {
    headerImg2: "",
    headerTitle: "",
  };

  const token = localStorage.getItem("cinimaDb:Token");
  const [about, setAbout] = React.useState(aboutUs);
  useEffect(() => {
    retrieveAbouts("EN", "aboutus");
  }, []);

  const retrieveAbouts = async (language: string, formLayout: string) => {
    await api
      .get(`form/${language}/${formLayout}`)
      .then((response) => {
        setAbout(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return ( 
      <div className="bg-gray_900 flex flex-col font-roboto justify-start mx-auto w-full">
        <div className="flex items-center w-full"></div>
        <div className="font-montserrat h-[578px] md:h-[611px] md:ml-[0] ml-[21px] mt-[50px] md:px-5 relative w-[93%] md:w-full">
          <div className="absolute bg-gray_800 flex h-max inset-y-[0] items-center justify-start my-auto p-32 md:px-10 sm:px-5 right-[0] w-auto">
            <Text
              className="mb-[264px] text-left text-white_A700 w-auto"
              variant="body6"
            ></Text>
          </div>
          <Img
            src={about.headerImg}
            className="absolute bottom-[0] h-[517px] left-[0] object-cover w-[44%]"
            alt="imageTwentyTwo"
          />
          <Img
            src={about.headerImg2}
            className="absolute bottom-[3%] h-[358px] object-cover right-[0] w-[54%]"
            alt="imageTwentyThree"
          />
        </div>
        <div className="flex flex-col font-montserrat items-center mt-[35px] w-full">
          <div className="flex items-center justify-start max-w-[1260px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-3.5 items-start justify-start w-full">
              <Text
                className="font-bold text-left text-white_A700 w-auto"
                variant="body22"
              >
                {about.headerTitle}
              </Text>
              <div className="flex sm:flex-col flex-row gap-[30px] items-start justify-between w-full">
                <Text
                  className="font-medium sm:mt-0 mt-[7px] text-justify text-white_A700 w-auto"
                  variant="body26"
                >
                  {about.paragraph1}
                </Text>
                <Img
                  src={about.paragraph1Image}
                  className="md:flex-1 h-[190px] sm:h-auto object-cover rounded w-auto md:w-full"
                  alt="rectangle740"
                />
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col flex-row gap-[30px] items-start justify-start max-w-[1260px] mt-[63px] mx-auto md:px-5 rotate-[180deg] w-full">
            <Img
              src={about.paragraph2Image}
              className="sm:flex-1 h-[190px] md:h-auto object-cover rounded w-[44%] sm:w-full"
              alt="rectangle740_One"
            />
            <Text
              className="sm:flex-1 font-medium sm:mt-0 mt-[7px] rotate-[180deg] text-justify text-white_A700 w-[54%] sm:w-full"
              variant="body26"
            >
              {about.paragraph2}
            </Text>
          </div>
          <div className="flex sm:flex-col flex-row gap-[30px] items-start justify-start max-w-[1260px] mt-[63px] mx-auto md:px-5 w-full">
            <Text
              className="sm:flex-1 font-medium sm:mt-0 mt-[7px] text-justify text-white_A700 w-[54%] sm:w-full"
              variant="body26"
            >
              {about.paragraph3}
            </Text>
            <Img
              src={about.paragraph3Image}
              className="sm:flex-1 h-[190px] md:h-auto object-cover rounded w-[44%] sm:w-full"
              alt="rectangle740_Two"
            />
          </div>
        </div>
      </div>
  );
};

export default AboutusPage;
