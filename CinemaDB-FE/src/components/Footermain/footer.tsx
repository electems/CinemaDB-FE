import React from "react";
import { Img, Text } from "components";
type Footerhome = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{}>;

const Footerhome: React.FC<Footerhome> = (props) => {
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
          <div className="flex flex-col items-center justify-center w-full">
            <Img
              src="images/img_image16_93x228.png"
              className="h-[93px] md:h-auto  md:ml-[0] ml-[621px] mr-[662px] object-cover w-[16%]"
              alt="imageSixteen_One"
            />
            <div className="flex flex-col gap-[23px] justify-start md:ml-[0] ml-[316px] mr-[178px] mt-[31px] w-[68%] md:w-full">
              <div className="flex sm:flex-col flex-row sm:gap-10 items-start justify-between w-full">
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Home
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Career{" "}
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Privacy policy
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Teams & Conditions{" "}
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  About Us{" "}
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Q&A
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Disclaimer{" "}
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Copyright
                </Text>
                <Text
                  className="font-roboto not-italic text-left text-white_A700 w-auto"
                  variant="body30"
                >
                  Social media Promotion - Teams & Conditions{" "}
                </Text>
              </div>
              <Text
                className="font-roboto leading-[25.00px] md:ml-[0] ml-[27px] not-italic text-center text-gray_300 w-[82%] sm:w-full"
                variant="body30"
              >
                CinemaDBS.com is the website catering to every individuals
                belonging to the Indian Film Industry to use and explore the
                content and features of this website. For any more information,
                please contact with the options given under contact us.
              </Text>
            </div>
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[45px] w-full">
              <div className="bg-gray_800 border border-solid border-white_A700 h-[54px] rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-[105px] w-[41%]"></div>
              <div className="flex md:flex-1 flex-row items-start justify-center md:mt-0 mt-3 w-auto md:w-full">
                <Img
                  src="images/img_facebook.svg"
                  className="h-3.5 mt-[5px] w-auto"
                  alt="facebook"
                />
                <div className="flex items-center justify-start ml-7 mt-[5px] w-[13%]">
                  <Img
                    src="images/img_twitter.svg"
                    className="h-3.5 w-auto"
                    alt="twitter"
                  />
                </div>
                <Img
                  src="images/img_linkedin.svg"
                  className="h-[15px] ml-6 mt-1 w-4"
                  alt="linkedin"
                />
                <Img
                  src="images/img_instagram.svg"
                  className="h-[25px] ml-[19px] w-[25px]"
                  alt="instagram"
                />
              </div>
              <div className="bg-gray_800 border border-solid border-white_A700 h-[54px] rotate-[180deg] rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-[105px] w-[41%]"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footerhome.defaultProps = {};

export default Footerhome;
