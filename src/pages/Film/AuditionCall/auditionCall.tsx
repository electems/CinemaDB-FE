import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Img, Button } from '../../../components/Elements';
import OTTFooterhome from '../../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';

interface IAudition {
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
    image6?: string;
  }

const AuditionsCall: React.FC = () => {
  const aboutUs: IAudition = {}
  const [audition, setAudition] = React.useState(aboutUs)
  const [formValue, setFormValue] = React.useState<any[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    retrieveAudition('EN', 'auditioncall')
    retriveMovies()
  }, [])

  const retrieveAudition = async (language: string, formLayout: string) => {
    const response = await api.get(`auth/${language}/${formLayout}`)
    setAudition(response.data)
  }

  const retriveMovies = async () => {
    const movies = await api.get('userprofession/movies')
    const response = await movies.data
    setFormValue(response)
    return response
  }

  const navigateToAuditionCall = async (item) => {
    console.log(item)
    navigate('/film/auditioncall/auditioncallsinglemovie', { state: { movieFK: item.id } })
  }
  return (
        <>
      <div className="bg-gray_900 flex font-roboto items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
          <div className="flex flex-row font-montserrat md:gap-10 items-center justify-between max-w-[1176px] mt-[19px] mx-auto md:px-5 w-full">
            <Text
              className="font-bold text-amber_A400 text-left w-auto"
              variant="body11"
            >
              Audition Call
            </Text>
            <Button
              className="common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[189px] py-[13px] rounded text-base text-center text-white_A700 w-auto"
              onClick={() => navigate('/film/auditioncall/auditioncallregistration')}
            >
              Create New Audition Call
            </Button>
          </div>
          <div className="flex md:flex-col flex-row font-montserrat md:gap-5 items-start justify-end ml-auto mt-[29px] md:px-5 w-[70%] md:w-full">
            <div
              className="bg-cover bg-no-repeat flex h-7 items-end justify-end md:mt-0 mt-[5px] p-1 w-[23%] md:w-full"
              style={{ backgroundImage: "url('/images/img_group2353.svg')" }}
            >
              <Img
                src="/images/img_target.png"
                className="h-5 md:h-auto object-cover w-5"
                alt="target"
              />
            </div>
            <Button className="bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[198px] ml-7 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto">
              Last Week Auditions
            </Button>
            <Button className="bg-red_A700 cursor-pointer font-normal leading-[normal] min-w-[214px] ml-6 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto">
              This week Auditions
            </Button>
            <div className="flex items-center justify-start ml-6 md:ml-[0] w-1/5 md:w-full">
              <Button className="bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[203px] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto">
                This month Auditions
              </Button>
            </div>
            <Img
              src="/images/img_calendar.svg"
              className="h-6 ml-6 md:ml-[0] md:mt-0 mt-0.5 w-auto"
              alt="calendar"
            />
          </div>
          <div className="md:gap-5 gap-[29px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center max-w-[1180px] min-h-[auto] mt-[31px] mx-auto md:px-5 w-full">

          {formValue.map((item) => {
            return (
              <Text key={item.id}
              className="cursor-pointer font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
              variant="body26"
              onClick={() => navigateToAuditionCall(item)}
              >
              {item.value}
              </Text>
            )
          })}
          </div>
          <OTTFooterhome className="bg-gray_800 flex font-roboto items-center justify-center mt-[72px] md:px-5 w-full" />
        </div>
      </div>
        </>
  );
};

export default AuditionsCall;
