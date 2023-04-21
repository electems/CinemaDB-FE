
import React from "react";
import {
  Text,
  Img,
  Slider,
  Button,
} from "../../../../components/Elements/index";

export const OTT: React.FC = () => {
  const sliderRef = React.useRef(null);
  const [sliderState, setsliderState] = React.useState(0);
  const sliderRef1 = React.useRef(null);
  const [sliderState1, setsliderState1] = React.useState(0);
  /*This has to be come from backend for now testing purpose i build json like this but the images are from the public api */
  const FilmIndustry = [
    {
      id: "0",
      title: "Exclusive movies curated for you",
      url: "https://unsplash.com/photos/yC-Yzbqy7PY",
      download_url: "https://picsum.photos/id/0/5000/3333",
      download_url2: "https://picsum.photos/id/0/5000/3333",
    },
    {
      id: "1",
      title: "New Uploads",
      url: "https://unsplash.com/photos/yC-Yzbqy7PY",
      download_url: "https://picsum.photos/id/1/5000/3333",
      download_url2: "https://picsum.photos/id/1/5000/3333",
    },
  ];
  return (
    <>
      <div className="bg-gray_900 flex items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Text
            className="font-bold font-montserrat mt-[30px] text-left text-white_A700 w-auto"
            variant="body22"
          ></Text>
          <div className="h-[578px] md:h-[609px] max-w-[1312px] mt-[31px] mx-auto md:px-5 relative w-full">
            <div className="flex flex-row md:gap-10 h-full items-center justify-between mt-[248px] mx-auto w-[97%]">
              {/* <Img
                src="images/img_arrowleft.svg"
                className="cursor-pointer h-8 w-8"
                onClick={() => sliderRef.current?.slidePrev?.()}
                alt="arrowleft"
              />
              <Img
                src="images/img_arrowright.svg"
                className="cursor-pointer h-8 w-8"
                onClick={() => sliderRef.current?.slideNext?.()}
                alt="arrowright"
              /> */}
            </div>
            <Slider
              activeIndex={sliderState}
              responsive={{
                0: { items: 1 },
                550: { items: 1 },
                1050: { items: 1 },
              }}
              onSlideChanged={(e: { item: React.SetStateAction<number>; }) => {
                setsliderState(e?.item);
              }}
              ref={sliderRef}
              className="absolute inset-[0] justify-center m-auto w-full"
              items={[...Array(10)].map(() => (
                <React.Fragment key={Math.random()}>
                  <div className="h-[578px] mx-2.5 relative">
                    <Slider
                      autoPlay
                      autoPlayInterval={2000}
                      activeIndex={sliderState1}
                      responsive={{
                        0: { items: 1 },
                        550: { items: 1 },
                        1050: { items: 1 },
                      }}
                      onSlideChanged={(e: { item: React.SetStateAction<number>; }) => {
                        setsliderState1(e?.item);
                      }}
                      ref={sliderRef1}
                      className="m-auto w-full"
                      items={[...Array(3)].map(() => (
                        <React.Fragment key={Math.random()}>
                          <div className="flex items-center justify-start mx-2.5">
                            <div className="flex items-center justify-start w-full">
                              <Img
                                src="images/img_rectangle546.png"
                                className="h-[578px] md:h-auto object-cover w-full"
                                alt="rectangle546"
                              />
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    />
                  </div>
                </React.Fragment>
              ))}
              renderDotsItem={({ isActive }) => {
                if (isActive) {
                  return (
                    <div className="inline-block cursor-pointer rounded-[50%] h-[21px] bg-indigo_100 w-[21px] relative" />
                  );
                }
                return (
                  <div
                    className="inline-block cursor-pointer rounded-[50%] h-[21px] bg-white_A700 w-[21px] relative"
                    role="button"
                    tabIndex={0}
                  />
                );
              }}
            />
          </div>
          <div className="font-montserrat gap-6 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-6 items-center justify-start mt-[35px] md:px-5 w-[53%] md:w-full">
            <Button className="bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Kannada
            </Button>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Tulu
            </Button>
            <Text
              className="bg-gray_800 font-bold h-[35px] pb-[5px] pl-[35px] pr-[23px] pt-[9px] sm:px-5 rounded text-left text-white_A700 w-full"
              variant="body26"
            >
              Coorgi
            </Text>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Telugu
            </Button>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Tamil
            </Button>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Malayalam
            </Button>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1303px] mt-[51px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              {FilmIndustry &&
                FilmIndustry.map((item) => {
                  return (
                    <div className="flex flex-col gap-[22px] justify-start w-full">
                      <Text
                        className="font-bold text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        {item.title}
                      </Text>
                      {FilmIndustry.map((image) => {
                        return (
                          <div className="">
                            <div className="gap-[26px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between md:ml-[0] ml-[21px] w-[99%] md:w-full">
                              <Img
                                src={(image.download_url, image.download_url2)}
                                className="h-[168px] md:h-auto object-cover w-full"
                                alt="React Image"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

              <Text
                className="font-bold text-left text-white_A700 w-auto"
                variant="body26"
              >
                Exclusive movies curated for you
              </Text>

              <div className="gap-[26px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between md:ml-[0] ml-[21px] w-[99%] md:w-full">
                <Img
                  src="images/img_rectangle521.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle521"
                />
                <Img
                  src="images/img_rectangle522.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle522"
                />
                <Img
                  src="images/img_rectangle523.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle523"
                />
                <Img
                  src="images/img_rectangle524.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle524"
                />
              </div>
            </div>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1303px] mt-[41px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              <Text
                className="font-bold text-left text-white_A700 w-auto"
                variant="body26"
              >
                New Uploads
              </Text>
              <div className="gap-[26px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between md:ml-[0] ml-[21px] w-[99%] md:w-full">
                <Img
                  src="images/img_rectangle521.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle521_One"
                />
                <Img
                  src="images/img_rectangle522.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle522_One"
                />
                <Img
                  src="images/img_rectangle523.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle523_One"
                />
                <Img
                  src="images/img_rectangle524.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle524_One"
                />
              </div>
            </div>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1303px] mt-[41px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              <Text
                className="font-bold text-left text-white_A700 w-auto"
                variant="body26"
              >
                Continue Watching
              </Text>
              <div className="gap-[26px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between md:ml-[0] ml-[21px] w-[99%] md:w-full">
                <Img
                  src="images/img_rectangle521.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle521_Two"
                />
                <Img
                  src="images/img_rectangle522.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle522_Two"
                />
                <Img
                  src="images/img_rectangle523.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle523_Two"
                />
                <Img
                  src="images/img_rectangle524.png"
                  className="h-[168px] md:h-auto object-cover w-full"
                  alt="rectangle524_Two"
                />
              </div>
            </div>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1312px] mt-[41px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              <Text
                className="font-bold text-justify text-white_A700 w-auto"
                variant="body26"
              >
                Latest Top 20 most watched movies
              </Text>
              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between md:ml-[0] ml-[30px] w-[98%] md:w-full">
                <Img
                  src="images/img_rectangle533.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle533"
                />
                <Img
                  src="images/img_rectangle534.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle534"
                />
                <Img
                  src="images/img_rectangle535.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle535"
                />
                <Img
                  src="images/img_rectangle536.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle536"
                />
              </div>
            </div>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1312px] mt-[41px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              <Text
                className="font-bold text-justify text-white_A700 w-auto"
                variant="body26"
              >
                Latest and Trending Trailers
              </Text>
              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between md:ml-[0] ml-[30px] w-[98%] md:w-full">
                <Img
                  src="images/img_rectangle533.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle533_One"
                />
                <Img
                  src="images/img_rectangle534.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle534_One"
                />
                <Img
                  src="images/img_rectangle535.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle535_One"
                />
                <Img
                  src="images/img_rectangle536.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle536_One"
                />
              </div>
            </div>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1312px] mt-[41px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              <Text
                className="font-bold text-justify text-white_A700 w-auto"
                variant="body26"
              >
                Top Pics for you
              </Text>
              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between md:ml-[0] ml-[30px] w-[98%] md:w-full">
                <Img
                  src="images/img_rectangle533.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle533_Two"
                />
                <Img
                  src="images/img_rectangle534.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle534_Two"
                />
                <Img
                  src="images/img_rectangle535.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle535_Two"
                />
                <Img
                  src="images/img_rectangle536.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle536_Two"
                />
              </div>
            </div>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1312px] mt-[41px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              <Text
                className="font-bold text-justify text-white_A700 w-auto"
                variant="body26"
              >
                Upcoming Movies
              </Text>
              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between md:ml-[0] ml-[30px] w-[98%] md:w-full">
                <Img
                  src="images/img_rectangle533.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle533_Three"
                />
                <Img
                  src="images/img_rectangle534.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle534_Three"
                />
                <Img
                  src="images/img_rectangle535.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle535_Three"
                />
                <Img
                  src="images/img_rectangle536.png"
                  className="h-[169px] sm:h-auto object-cover w-auto md:w-full"
                  alt="rectangle536_Three"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
