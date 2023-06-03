import React from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Img, Line, Button } from '../../../components/Elements/index';
import Footer from '../../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';

const FilmFestival: React.FC = () => {
  const navigate = useNavigate();

  const navigateToFilmFestivalRegistation = () => {
    navigate('/film/filmfestival/filmfestivalregistration')
  }

  return (
    <>
      <div className="bg-gray_900 flex items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex flex-row font-roboto items-center justify-center md:px-5 w-full" />
          <Text
            className="font-bold font-montserrat mt-[57px] text-amber_A400 text-left w-auto"
            variant="body11"
          >
            Film Festivals
          </Text>
          <div className="flex md:flex-col flex-row font-montserrat md:gap-5 items-end justify-start max-w-[1267px] mt-[9px] mx-auto md:px-5 w-full">
            <Text
              className="font-bold md:mt-0 mt-3 text-amber_A400 text-left w-auto"
              variant="body26"
            >
              Filters:
            </Text>
            <div className="flex md:flex-1 flex-row gap-[11px] items-end justify-center ml-2.5 md:ml-[0] md:mt-0 mt-1.5 w-[6%] md:w-full">
              <Text
                className="font-medium mt-[7px] text-left text-white_A700 w-auto"
                variant="body26"
              >
                Year
              </Text>
              <Img
                src="/images/img_arrowdown.svg"
                className="h-6 mb-[3px] w-6"
                alt="arrowdown_Two"
              />
            </div>
            <div className="flex md:flex-1 flex-row gap-2 items-end justify-center md:ml-[0] ml-[18px] md:mt-0 mt-[7px] w-[7%] md:w-full">
              <Text
                className="font-medium mt-1.5 text-left text-white_A700 w-auto"
                variant="body26"
              >
                Month
              </Text>
              <Img
                src="/images/img_arrowdown.svg"
                className="h-6 mb-0.5 w-6"
                alt="arrowdown_Three"
              />
            </div>
            <div className="flex md:flex-1 sm:flex-col flex-row gap-6 items-center justify-between mb-1 md:ml-[0] ml-[541px] w-[39%] md:w-full">
              <div className="flex flex-row gap-6 items-start justify-between w-[68%] sm:w-full">
                <div className="flex flex-row gap-[27px] items-end justify-between w-[53%]">
                  <Text
                    className="font-medium mt-1.5 text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Call For Entries
                  </Text>
                  <Img
                    src="/images/img_arrowdown.svg"
                    className="h-6 mb-0.5 w-6"
                    alt="arrowdown_Four"
                  />
                </div>
                <div className="flex flex-row items-end justify-between w-[41%]">
                  <Text
                    className=" text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Event Type
                  </Text>
                  <Img
                    src="/images/img_arrowdown.svg"
                    className="h-6 mb-[5px] w-6"
                    alt="arrowdown_Five"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-[22px] items-end justify-between w-[28%] sm:w-full">
                <Text
                  className="mt-2 text-left text-white_A700 w-auto"
                  variant="body26"
                >
                  Categories
                </Text>
                <Img
                  src="/images/img_arrowdown.svg"
                  className="h-6 mb-1 w-6"
                  alt="arrowdown_Six"
                />
              </div>
            </div>
          </div>
          <Line className="bg-white_A700 h-px max-w-[1312px] mt-[39px] mx-auto w-full" />
          <div className="font-montserrat h-[855px] md:h-[868px] max-w-[1287px] mt-[13px] mx-auto md:px-5 relative w-full">
            <div className="absolute flex inset-x-[0] items-center justify-start mx-auto top-[8%] w-full">
              <div className="flex flex-col gap-[34px] items-start justify-start w-full">
                <div className="gap-[33px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 items-center justify-between w-full">
                  <Img
                    src="/images/img_rectangle590.png"
                    className="flex-1 h-[236px] md:h-auto object-cover rounded w-full"
                    alt="rectangle590"
                  />
                  <Img
                    src="/images/img_rectangle591.png"
                    className="flex-1 h-[236px] md:h-auto object-cover rounded w-full"
                    alt="rectangle591"
                  />
                  <Img
                    src="/images/img_rectangle592.png"
                    className="flex-1 h-[236px] md:h-auto object-cover rounded w-full"
                    alt="rectangle592"
                  />
                </div>
                <div className="flex md:flex-col flex-row gap-[33px] items-center justify-start w-[66%] md:w-full">
                  <Img
                    src="/images/img_rectangle593.png"
                    className="h-[236px] sm:h-auto object-cover rounded w-[49%] md:w-full"
                    alt="rectangle593"
                  />
                  <Img
                    src="/images/img_rectangle594.png"
                    className="h-[236px] sm:h-auto object-cover rounded w-[49%] md:w-full"
                    alt="rectangle594"
                  />
                </div>
              </div>
            </div>
            <Img
              src="/images/img_rectangle595_229x404.png"
              className="common-pointer absolute bottom-[33%] h-[229px] object-cover right-[0] rounded w-[32%]"
              onClick={() => navigate('/filimfestival')}
              alt="rectangle595"
            />
            <div className="absolute flex h-full inset-[0] items-center justify-center m-auto w-full">
              <div className="flex flex-col md:gap-10 gap-[565px] justify-start w-full">
                <div className="flex flex-row gap-6 items-center justify-end ml-auto w-[26%] md:w-full">
                  <Img
                    src="/images/img_calendar.svg"
                    className="h-6 w-auto"
                    alt="calendar"
                  />
                  <Button
                    className="common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[207px] py-[13px] rounded text-base text-center text-white_A700 w-auto"
                    onClick={navigateToFilmFestivalRegistation}
                  >
                    Add a Film Festival
                  </Button>
                </div>
                <div className="bg-gray_800 flex items-center justify-end p-4 rounded w-full">
                  <div className="flex md:flex-col flex-row gap-[30px] items-start justify-between w-[98%] md:w-full">
                    <Img
                      src="/images/img_rectangle595_199x368.png"
                      className="h-[199px] sm:h-auto md:mt-0 mt-2.5 object-cover rounded-[3px] w-auto md:w-full"
                      alt="rectangle595_One"
                    />
                    <div className="flex flex-col items-start justify-start w-auto md:w-full">
                      <div className="flex sm:flex-col flex-row sm:gap-10 items-start justify-between w-full">
                        <Text
                          className="font-bold sm:mt-0 mt-[15px] text-left text-white_A700 w-auto"
                          variant="body22"
                        >
                          Bengaluru International Film Festival{' '}
                        </Text>
                        <Img
                          src="/images/img_iconparkoutlinelike.svg"
                          className="h-[30px] mb-[7px] w-[30px]"
                          alt="iconparkoutline"
                        />
                      </div>
                      <div className="flex md:flex-col flex-row md:gap-10 items-end justify-between mt-[19px] w-[99%] md:w-full">
                        <Text
                          className="font-bold md:mt-0 mt-1.5 text-left text-white_A700"
                          variant="body11"
                        ></Text>
                        <Text
                          className="common-pointer bg-gray_900 font-bold h-[62px] mb-0.5 pb-[22px] pt-[19px] sm:px-5 px-[35px] rounded text-left text-white_A700 w-[218px]"
                          variant="body26"
                          onClick={() => navigate('/filimfestival')}
                        >
                          Get Tickets
                        </Text>
                      </div>
                      <Button className="bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[218px] md:ml-[0] ml-[584px] mt-[22px] py-[17px] rounded text-base text-center text-white_A700 w-auto">
                        Submit the Movie
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray_800 flex font-montserrat items-center justify-start max-w-[1284px] mt-6 mx-auto p-[17px] md:px-5 rounded w-full">
            <div className="flex md:flex-col flex-row gap-[30px] items-center justify-between mb-2.5 w-[97%] md:w-full">
              <Img
                src="/images/img_rectangle598.png"
                className="h-[199px] sm:h-auto object-cover rounded w-auto md:w-full"
                alt="rectangle598"
              />
              <div className="flex flex-col gap-[22px] items-start justify-start w-auto md:w-full">
                <div className="flex flex-row sm:gap-10 items-start justify-between w-full">
                  <Text
                    className="font-bold mt-[13px] text-left text-white_A700 w-auto"
                    variant="body22"
                  >
                    Mumbai International Film Festival{' '}
                  </Text>
                  <Img
                    src="/images/img_iconparkoutlinelike.svg"
                    className="h-[30px] mb-[5px] w-[30px]"
                    alt="iconparkoutline_One"
                  />
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-end justify-between w-[99%] md:w-full">
                  <Text
                    className="font-bold md:mt-0 mt-1.5 text-left text-white_A700"
                    variant="body11"
                  ></Text>
                  <Text
                    className="common-pointer bg-gray_900 font-bold h-[62px] mb-0.5 pb-[22px] pt-[19px] sm:px-5 px-[35px] rounded text-left text-white_A700 w-[218px]"
                    variant="body26"
                    onClick={() => navigate('/filimfestival')}
                  >
                    Get Tickets
                  </Text>
                </div>
                <Button className="bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[218px] md:ml-[0] ml-[584px] py-[17px] rounded text-base text-center text-white_A700 w-auto">
                  Submit the Movie
                </Button>
              </div>
            </div>
          </div>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[70px] md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default FilmFestival;
