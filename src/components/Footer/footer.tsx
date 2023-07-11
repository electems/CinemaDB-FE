/* eslint-disable no-undef */
import React from 'react'
import { Img, Text } from '../Elements/index'
import './footer.css'
import { useNavigate } from 'react-router-dom';
type Footerhome = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const Footer: React.FC<Footerhome> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1 , shrink-to-fit=no"
          name="viewport"
        />
        <link rel="manifest" href="manifest.json" />
      </head>
      <footer className={props.className}>
        <div className="flex items-center justify-center mt-1.5 w-full">
          <div className="flex flex-col items-center justify-center w-full md:justify-center">
            <Img
              src="/images/cinemadblogo.png"
              className="h-[93px] md:h-auto  md:ml-[0] ml-[630px] mr-[662px] object-cover sm:ml-[660px] md:ml-[665px]  flex flex-wrap justify-center items-center"
              alt="/images/sixteen_One"
            />
            <div className="flex flex-col gap-[23px] justify-start md:ml-[0] ml-[316px] mr-[290px] mt-[31px] w-[77%] md:w-full sm:ml-[289px]">
              <div className="flex flex-wrap sm:flex-col md:flex-row-3 md:justify-center md:gap-6 sm:gap-10 items-center justify-between w-full">
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Home
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Career{' '}
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                  onClick={() => navigate('/film/public/PrivacyAndPolicyPage')}
                >
                  Privacy policy
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                  onClick={() => navigate('/film/public/termsconditionspage')}
                >
                  Teams & Conditions{' '}
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                  onClick={() => navigate('/film/public/aboutus')}
                >
                  About Us{' '}
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                  onClick={() => navigate('/film/public/QandAPage')}
                >
                  Q&A
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                  onClick={() => navigate('/film/public/disclaimerpage')}
                >
                  Disclaimer{' '}
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                  onClick={() => navigate('/film/public/copyrightpage')}
                >
                  Copyright
                </Text>
                <Text
                  className="cursor-pointer font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                  onClick={() => navigate('/film/public/promotiontermsconditionspage')}
                >
                  Social media Promotion - Teams & Conditions{' '}
                </Text>
              </div>
              <Text
                className="flex justify-center items-center font-roboto leading-[25.00px] md:ml-[0] ml-[67px] not-italic text-center text-gray_300 w-[79%] sm:w-full"
                variant="body30"
              >
                CinemaDBS.com is the website catering to every individuals
                belonging to the Indian Film Industry to use and explore the
                content and features of this website. For any more information,
                please contact with the options given under contact us.
              </Text>
            </div>
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[45px] w-full">
              <div className="bg-gray_800 border border-solid border-white_A700 h-[54px] rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-[105px] w-[38%]"></div>
              <div className="flex md:flex-1 flex-row items-start justify-center md:mt-0 mt-3 w-auto md:w-full">
                <Img
                  src="/images/img_facebook.svg"
                  className="h-[18px] mt-[4px] w-auto"
                  alt="facebook"
                />
                <Img
                    src="/images/img_twitter.svg"
                    className="h-[17px] w-auto ml-7 mt-[4px]"
                    alt="twitter"
                  />
                <Img
                  src="/images/img_linkedin.svg"
                  className="h-[17px] ml-6 mt-1 w-4"
                  alt="linkedin"
                />
                <Img
                  src="/images/img_instagram.svg"
                  className="h-[22px] ml-[19px] w-[25px]"
                  alt="instagram"
                />
              </div>
              <div className="bg-gray_800 border border-solid border-white_A700 h-[54px] rotate-[180deg] rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-[105px] w-[38%]"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer
