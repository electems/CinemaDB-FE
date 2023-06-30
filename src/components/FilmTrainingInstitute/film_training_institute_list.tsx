import React, { useEffect } from 'react';

import { Button, Img, Text } from '../Elements/index';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { storage } from '../../storage/storage';
import { api } from '../../services/api';

import { useNavigate } from 'react-router-dom';
import { FilmTrainingInstitute } from '../../types/film_institute.type';

const TrainingInstitutesPage: React.FC = () => {
  const loggedInUser = storage.getLoggedUser();
  const [isEnableCreateButton, setEnableCreateButton] = React.useState(loggedInUser.role === 'PERSON')
  const [images, setImages] = React.useState([]);
  useEffect(() => {
    retriveAllPostersOfInstitute()
  }, [])
  const trainingInstitutesPostersNames: string [] = [];
  const navigate = useNavigate();
  const retriveAllPostersOfInstitute = async () => {
    let currentUsersInstitutePosters: any
    if (loggedInUser && loggedInUser.role === 'PERSON') {
      currentUsersInstitutePosters = await api.get(`fileupload/filmInstitutePosters/${loggedInUser.id}`)
    }else{
      currentUsersInstitutePosters = await api.get(`fileupload/filmInstitutePostersForLover`)
    }

    console.log(currentUsersInstitutePosters.data)
    const trainingIntitutePosters = currentUsersInstitutePosters.data
    trainingIntitutePosters.map(async (poster) => {
      trainingInstitutesPostersNames.push(poster.fileName)
    })
    retriveImageUrls(trainingInstitutesPostersNames)
  }

  const retriveImageUrls = async (name) => {
    const items: any = []
    for (let i = 0; i < name.length; i++) {
      const movies = await api.get(`/fileupload/files/profile/${name[i]}`)
      items.push(movies.request.responseURL)
    }
    setImages(items)
  }

  const navigateToRegistrationPage = async () => {
    if (loggedInUser && loggedInUser.role === 'PERSON') {
      navigate('/film/public/filminstituteregistration')
    }
  }

  const navigateToEventCreatePage = async () => {
    if (loggedInUser && loggedInUser.role === 'PERSON') {
      navigate('/film/public/FilmTrainingInstituteEventsRegistrationForm')
    }
  }

  const navigateToAuditionCall = async (item) => {
    const data = item.split('/')
    const filmInstituteRecord = await api.get(`filminsitutetraining/filmInstituteDetailsByFileName/${data[6]}`)
    const response = filmInstituteRecord.data
    navigate(`/film/public/filminstitutedetails/${data[6]}`, { state: { filmInstituteId: response.id, file: item}})
  }

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex md:flex-col flex-row md:gap-5 items-center justify-center md:px-5 w-full" />
          <div className="flex md:flex-col flex-row font-montserrat md:gap-5 items-start justify-start max-w-[1171px] mt-9 mx-auto md:px-5 w-full">
            <Text
              className="text-2xl md:text-[22px] text-amber_A400 sm:text-xl"
            >
              Film Training Institutes
            </Text>
            { isEnableCreateButton
              ? <Button
            className="common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[189px] py-[13px] rounded text-base text-center text-white_A700 w-auto"
            onClick={navigateToRegistrationPage}
          >
            Create Training Institute
          </Button>

              : ''}
           { isEnableCreateButton
              ? <Button
            className="common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[189px] py-[13px] rounded text-base text-center text-white_A700 w-auto"
            onClick={navigateToEventCreatePage}
          >
            Create an Event
          </Button>

              : ''}
            <Img
              className="h-6 md:mt-0 mt-5"
              src="/images/img_calendar.svg"
              alt="calendar"
            />
            <div
              className="bg-cover bg-no-repeat flex md:flex-1 flex-col h-[39px] items-end justify-start md:ml-[0] ml-[18px] md:mt-0 mt-4 p-[5px] w-[27%] md:w-full"
              style={{ backgroundImage: "url('/images/img_group2353.svg')" }}
            >
              <Img
                className="h-7 md:h-auto object-cover w-7"
                src="/images/img_target.png"
                alt="target"
              />
            </div>
          </div>
          <div className="md:gap-5 gap-[29px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center max-w-[1187px] min-h-[auto] mt-[35px] mx-auto md:px-5 w-full">
          { images.map((item) => {
            return (
              <>
              <Img
                src={item}
                className="cursor-pointer flex-1 h-[455px] md:h-auto object-cover w-full"
                alt="rectangle"
                onClick={() => navigateToAuditionCall(item)}
            />
              </>
            )
          })}
          </div>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[97px] md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default TrainingInstitutesPage;
