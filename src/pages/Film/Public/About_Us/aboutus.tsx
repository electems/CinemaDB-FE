import React, { useEffect } from 'react'
import { api } from '../../../../services/api'
import { Img, Text } from '../../../../components/Elements'
import Footer from '../../../../components/Footer/footer';

interface Iaboutus {
  header?: string;
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
  const aboutUs: Iaboutus = {
    headerImg2: '',
    headerTitle: ''
  }

  const [about, setAbout] = React.useState(aboutUs)
  useEffect(() => {
    retrieveAbouts('EN', 'aboutus')
  }, [])

  const retrieveAbouts = async (language: string, formLayout: string) => {
    await api
      .get(`auth/${language}/${formLayout}`)
      .then((response) => {
        setAbout(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div className="bg-gray_900 flex flex-col font-roboto justify-start mx-auto w-full">
        <div className="rounded-2xl flex flex-shrink shadow-md sm:flex-row flex-col  absolute bg-gray_800 font-montserrat h-[578px] md:h-[611px] md:ml-[0] ml-[60px] mt-[30px] md:px-5 relative w-[90%] md:w-full  ">
        <Text
              className="mt-[26px] text-center text-white_A700 w-auto"
              variant="body6"
            >
               {about.header}
            </Text>
        <Img
          src={about.headerImg}
          className="overflow-hidden h-auto max-w-full rounded-tl-2xl rounded-bl-2xl absolute bottom-[0] h-[358px] object-cover right-[0] w-[60%]"
          alt="imageTwentyTwo"
        />
         <Img
          src={about.headerImg2}
          className="overflow-hidden h-auto max-w-full rounded-tl-2xl rounded-bl-2xl  absolute bottom-[3%] h-[470px]  object-cover left-[0] w-[35%]"
          alt="imageTwentyThree"
        />
        </div>
      <div className="flex flex-col font-montserrat items-center mt-[35px] w-full">
        <div className="flex items-center justify-start max-w-[1100px] mx-auto md:px-5 w-full">
          <div className="flex flex-col gap-3.5 items-start justify-start w-full">
            <Text
              className="font-bold text-left text-white_A700 w-auto"
              variant="body22"
            >
              {about.headerTitle}
            </Text>
          </div>
        </div>
        <div className="flex sm:flex-col flex-row gap-[30px] items-start justify-start max-w-[1100px] mt-[63px] mx-auto md:px-5 w-full">
              <Text
                className="font-medium sm:mt-0 mt-[7px] text-justify text-white_A700 w-auto"
                variant="body26"
              >
                {about.paragraph1}
              </Text>
              <Img
                src={about.paragraph1Image}
                className="sm:h-auto max-w-full flex-1 h-[210px] md:h-auto object-cover rounded w-[44%] sm:w-full"
                alt="rectangle740"
              />
            </div>
        <div className="flex sm:flex-col flex-row gap-[30px] items-start justify-start max-w-[1100px] mt-[63px] mx-auto md:px-5 w-full">
        <Img
            src={about.paragraph2Image}
            className="sm:h-auto max-w-full flex-1 h-[210px] md:h-auto object-cover rounded w-[44%]"
            alt="rectangle740_One"
          />
          <Text
           className="sm:flex-1 font-medium sm:mt-0 mt-[7px] text-justify text-white_A700 w-[54%] sm:w-full"
            variant="body26"
          >
            {about.paragraph2}
          </Text>
        </div>
        <div className="flex sm:flex-col flex-row gap-[30px] items-start justify-start max-w-[1100px] mt-[63px] mx-auto md:px-5 w-full">
          <Text
            className="sm:flex-1 font-medium sm:mt-0 mt-[7px] text-justify text-white_A700 w-[54%] sm:w-full"
            variant="body26"
          >
            {about.paragraph3}
          </Text>
          <Img
            src={about.paragraph3Image}
            className="sm:h-auto max-w-full flex-1 h-[210px] md:h-auto object-cover rounded w-[44%] sm:w-full"
            alt="rectangle740_Two"
          />
        </div>
      </div>
      <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[72px] md:px-5 w-full" />
    </div>
  )
}

export default AboutusPage
