import React, { useEffect } from 'react'
import { api } from '../../../../services/api'
import { Img, Text } from '../../../../components/Elements'
import Header from '../../../../components/Header/header';
import Footer from '../../../../components/Footer/footer';

interface Disclaimer{
    headerTitle: string;
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    paragraph4?: string;
    paragraph5?: string;
    paragraph6?: string;
    paragraph7?: string;
    paragraph8?: string;
}

const DisclaimerPage: React.FC = () => {
const disclaimer:Disclaimer = {
    headerTitle: ''
}

const[disclaimerpage, setDisclaimer] =React.useState(disclaimer)
useEffect(()=>{
retriveDisclaimer('EN','disclaimer')
},[])

const retriveDisclaimer = async (language: string, formLayout: string) => {
    const response = await api.get(`auth/${language}/${formLayout}`)
    setDisclaimer(response.data)
  }

  return (
    <>
    <div className="bg-gray_900 flex flex-col items-center justify-start mx-auto w-full">
    <Header className="bg-gray_800 flex flex-row font-roboto items-center justify-center md:px-5 w-full" />
    <div className="flex font-montserrat items-start mt-[39px] md:px-10 sm:px-5 px-[123px] w-full">
      <Text
        className="capitalize font-bold text-amber_A400 text-left w-auto"
        variant="body11"
      >
       {disclaimerpage.headerTitle}
      </Text>
    </div>
    <Text
      className="font-medium font-montserrat mt-[15px] text-justify text-white_A700 w-[84%] sm:w-full"
      variant="body26"
    >
      {disclaimerpage.paragraph1}
    </Text>
    <Text
      className="font-medium font-montserrat mt-4 text-justify text-white_A700 w-[84%] sm:w-full"
      variant="body26"
    >
     {disclaimerpage.paragraph2}
    </Text>
    <Text
      className="font-medium font-montserrat mt-4 text-justify text-white_A700 w-[84%] sm:w-full"
      variant="body26"
    >
     {disclaimerpage.paragraph3}
    </Text>
    <Text
      className="font-medium font-montserrat mt-4 text-justify text-white_A700 w-[84%] sm:w-full"
      variant="body26"
    >
      {disclaimerpage.paragraph4}
    </Text>
    <Text
      className="font-medium font-montserrat mt-3 text-justify text-white_A700 w-[84%] sm:w-full"
      variant="body26"
    >
     {disclaimerpage.paragraph5}
    </Text>
    <Text
      className="font-medium font-montserrat mt-4 text-justify text-white_A700 w-[84%] sm:w-full"
      variant="body26"
    >
     {disclaimerpage.paragraph6}
    </Text>
    <Text
      className="font-medium font-montserrat mt-4 text-justify text-white_A700 w-[84%] sm:w-full"
      variant="body26"
    >
     {disclaimerpage.paragraph7}
    </Text>
    <div className="font-montserrat md:h-[342px] h-[368px] mb-0.5 mt-4 md:px-5 relative w-full">
      <Text
        className="absolute font-medium inset-x-[0] mx-auto text-justify text-white_A700 top-[0] w-[84%] sm:w-full"
        variant="body26"
      >
        {disclaimerpage.paragraph8}
      </Text>
      <Footer className="absolute bg-gray_800 bottom-[0] flex font-roboto inset-x-[0] items-center justify-center mx-auto w-full" />
    </div>
  </div>
  </>

  )
}

export default DisclaimerPage

