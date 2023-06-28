import React, { useEffect } from 'react';

import { Button, Img, Text } from '../Elements/index';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { storage } from '../../storage/storage';
import { api } from '../../services/api';

import { useNavigate } from 'react-router-dom';

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
    const currentUsersInstitutePosters = await api.get(`fileupload/filmInstitutePosters/${loggedInUser.id}`)
    console.log(currentUsersInstitutePosters.data)
    const trainingIntitutePosters = currentUsersInstitutePosters.data
    trainingIntitutePosters.map(async (poster) => {
      console.log(poster.fileName)
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

  const navigateToAuditionCall = async (item) => {
    const data = item.split('/')
    const datas = await api.get(`filminsitutetraining/filmInstituteDetails/${data[6]}`)
    navigate(`/film/public/filminstitutedetails/${data[6]}`)
  }

  return (
    <>
      <div className="bg-gray_900 flex font-roboto items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
          <div className="flex md:flex-col flex-row font-montserrat md:gap-5 items-start justify-start max-w-[1171px] mt-9 mx-auto md:px-5 w-full">
            <Text
              className="font-bold text-amber_A400 text-left w-auto"
              variant="body11"
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

            <Img
              src="/images/img_calendar.svg"
              className="h-6 md:ml-[0] ml-[435px] md:mt-0 mt-6 w-auto"
              alt="calendar"
            />
            <div
              className="bg-cover bg-no-repeat flex md:flex-1 h-[39px] items-end justify-start md:ml-[0] ml-[31px] md:mt-0 mt-4 p-[5px] w-[27%] md:w-full"
              style={{ backgroundImage: "url('images/img_group2353.svg')" }}
            >
              <Img
                src="/images/img_target.png"
                className="h-7 md:h-auto object-cover w-7"
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
            {/* <Img
              src="images/img_rectangle657.png"
              className="flex-1 h-[455px] md:h-auto object-cover w-full"
              alt="rectangle"
            /> */}
          </div>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[97px] md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default TrainingInstitutesPage;
