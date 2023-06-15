import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Img, Button, List } from '../../../components/Elements';
import OTTFooterhome from '../../../components/Footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
interface InputData {
  movieFK
}
const AuditionsCallSingleMovie: React.FC = () => {
  const navigate = useNavigate();
  const inputData = useLocation().state as InputData
  const [seconds, setSeconds] = React.useState<any>([]);

  useEffect(() => {
    retriveAuditionByMovieId()
  }, [])

  const retriveAuditionByMovieId = async () => {
    const res = await api.get(`/auditioncall/audition/${inputData.movieFK}`)
    const userList = await res.data
    setSeconds(userList)
  }

  return (
        <>
        <div className="bg-gray_900 flex flex-col font-roboto items-center justify-start mx-auto w-full">
        <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        <div className="flex font-montserrat items-start mt-[26px] md:px-10 sm:px-5 px-[108px] w-full">
          <Text
            className="font-bold text-amber_A400 text-left w-auto"
            variant="body11"
          >
            Audition Call
          </Text>
        </div>
        <Img
          src="/images/img_rectangle772.png"
          className="h-[586px] md:h-auto max-w-[1307px] mt-[29px] mx-auto object-cover w-full"
          alt="rectangle772"
        />
        {seconds.map((auditioncall) => {
          return (
            <List key={auditioncall.id}
            className="flex-col font-montserrat gap-5 grid items-center max-w-[1278px] mt-[30px] mx-auto md:px-5 w-full"
            orientation="vertical"
          >
            <div className="bg-gray_400 flex flex-1 items-center justify-start p-[11px] w-full">
              <div className="flex flex-col gap-1.5 items-center justify-start my-1.5 w-[98%] md:w-full">
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start w-full">
                  <div className="flex md:flex-1 flex-col gap-[34px] items-start justify-start md:mt-0 mt-0.5 w-[32%] md:w-full">
                    <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full">
                      <Text
                        className="text-lg text-white-A700"
                      >
                        <span className="text-white_A700 font-montserrat text-left font-bold">
                          Title :{' '}
                        </span>
                        <span className="text-white_A700 font-montserrat text-left text-base font-medium">
                          production 1
                        </span>
                      </Text>
                      <Text
                        className="mb-0.5 sm:ml-[0] ml-[55px] text-lg text-white_A700"
                        size="txtMontserratBold18"
                      >
                        <span className="text-white_A700 font-montserrat text-left font-bold">
                          Role :{' '}
                        </span>
                        <span className="text-white_A700 font-montserrat text-left text-base font-bold">
                          {auditioncall.auditionCategory}
                        </span>
                      </Text>
                      <Text
                        className="sm:ml-[0] ml-[22px] sm:mt-0 mt-0.5 text-lg text-white_A700"
                        size="txtMontserratBold18"
                      >
                        <span className="text-white_A700 font-montserrat text-left font-bold">
                          Age :{' '}
                        </span>
                        <span className="text-white_A700 font-montserrat text-left text-base font-medium">
                          {auditioncall.ageRange}
                        </span>
                      </Text>
                      <Text
                        className="font-bold text-left text-white_A700 w-auto"
                        variant="body22"
                      ></Text>
                    </div>
                    <Text
                      className="ml-[22px] font-medium text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Description
                    </Text>
                  </div>
                  <Text
                    className="md:ml-[0] ml-[22px] md:mt-0 mt-[5px] text-lg text-white_A700"
                    size="txtMontserratBold18"
                  >
                    Venue : {auditioncall.venueOrInterviewLocation}
                  </Text>
                  <Text
                    className="md:ml-[0] ml-[11px] md:mt-0 mt-1 text-lg text-white_A700"
                    size="txtMontserratBold18"
                  >
                    Type : {auditioncall.movieType}
                  </Text>
                  <div className="bg-gray_800 flex md:flex-1 flex-col font-roboto gap-[11px] items-start justify-start mb-[3px] md:ml-[0] ml-[528px] p-2 w-[17%] md:w-full">
                    <div className="flex flex-row gap-2 items-start justify-start ml-5 md:ml-[0] w-[46%] md:w-full">
                      <Img
                        src="/images/img_camera_white_a700.svg"
                        className="h-6 w-6"
                        alt="camera"
                      />
                      <Text
                        className="mt-[3px] not-italic text-left text-white_A700 w-auto"
                        variant="body30"
                      >
                        Camera
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2 items-start justify-start ml-5 md:ml-[0] w-[44%] md:w-full">
                      <Img
                        src="/images/img_makiartgallery.svg"
                        className="h-6 w-6"
                        alt="makiartgallery"
                      />
                      <Text
                        className="mt-1 not-italic text-left text-white_A700 w-auto"
                        variant="body30"
                      >
                        Gallery
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="ml-[22px] flex md:flex-col flex-row md:gap-10 items-start justify-between w-[98%] md:w-full">
                  <Text
                    className="font-normal md:mt-0 mt-[17px] not-italic text-justify text-white_A700 w-auto"
                    variant="body41"
                  >
                   {auditioncall.auditionDescription}
                  </Text>
                  <div className="flex flex-col gap-[19px] items-center justify-start w-auto md:w-full">
                    <Button className="bg-red_A700 cursor-pointer font-medium leading-[normal] min-w-[202px] py-[19px] rounded text-[14.7px] text-center text-white_A700 w-auto">
                      Upload Audition Video{' '}
                    </Button>
                    <Button className="bg-red_A700 cursor-pointer font-medium leading-[normal] min-w-[202px] py-[19px] rounded text-[14.7px] text-center text-white_A700 w-auto">
                      Apply from CDBS Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </List>
          );
        })}
        <OTTFooterhome className="bg-gray_800 flex font-roboto items-center justify-center mt-[65px] md:px-5 w-full" />
      </div>
    </>
  );
};

export default AuditionsCallSingleMovie;
