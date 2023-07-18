import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Img, Button, List } from '../../../components/Elements';
import OTTFooterhome from '../../../components/Footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import './app.css'
import { storage } from '../../../storage/storage';
// import { Modal } from 'react-bootstrap'
import { Modal } from 'antd';
interface InputData {
  tableId,
  movieName
}

const AuditionsCallSingleMovie: React.FC = () => {
  const navigate = useNavigate();
  const inputData = useLocation().state as InputData
  const [singleAudition, setSingleAudition] = React.useState<any>([]);
  const [isShow, invokeModal] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState('');
  const [modalForSuccessfulRegistration, invokeModalForSuccessfulRegistration] = React.useState(false)
  const [modal2Open, setModal2Open] = React.useState(false);
  const loggedUser = storage.getLoggedUser()

  useEffect(() => {
    retriveAuditionByMovieId()
  }, [])

  const retriveAuditionByMovieId = async () => {
    const imagesNames: any = []
    const res = await api.get(`/auditioncall/audition/${inputData.tableId}`)
    const auditionLists = await res.data
    setSingleAudition(auditionLists)
    const fetchPosterForCorrespondingAudition = await api.get(`/fileupload/auditionspostersbyauditionid/${auditionLists[0].id}`)
    const response = await fetchPosterForCorrespondingAudition.data
    response.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    await retriveImageUrls(imagesNames)
  }

  const retriveImageUrls = async (name) => {
    const items: any = []
    for (let i = 0; i < name.length; i++) {
      const movies = await api.get(`/fileupload/files/profile/${name[i]}`)
      items.push(movies.request.responseURL)
    }
    setImages(items)
  }

  const applyForAudition = async () => {
    if (loggedUser && loggedUser.role === 'LOVER') {
      modalOnForSuccessfullRegistration()
    } else {
      onOpenModal()
    }
  }
  const modalOn = () => {
    return invokeModal(!false)
  }

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const modalOnForSuccessfullRegistration = async () => {
    const enquiryNotification = {
      email: loggedUser?.email,
      content: { firstName: loggedUser.firstName, lastName: loggedUser.lastName },
      tableId: singleAudition[0].id,
      userType: loggedUser.role,
      notificationType: 'Apply For Audition Call'
    }
    await api.post('/filminsitutetraining/filmInstituteTraining/notification', enquiryNotification)
  }

  const modalOffForSuccessfullRegistration = () => {
    return invokeModalForSuccessfulRegistration(false)
  }
  const registerProcess = () => {
    navigate('/film/login/selectpreference')
  }

  const modalOff = () => {
    return invokeModal(false)
  }
  return (
        <>
        <div className="bg-gray_900 flex flex-col font-roboto items-center justify-start mx-auto w-full">
        <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        <div className="flex font-montserrat items-start mt-[26px] md:px-10 sm:px-5 max-w-[1187px] min-h-[auto] w-full">
          <Text
            className="font-bold text-amber_A400 text-left w-auto"
            variant="body11"
          >
            Audition Call
          </Text>
        </div>
        <Img
          src={images}
          className="h-[586px] md:h-auto mt-[29px] mx-auto object-cover max-w-[1187px] min-h-[auto] w-full"
          alt="rectangle772"
        />
        {singleAudition.map((auditioncall) => {
          return (
            <List key={auditioncall.id}
            className="font-montserrat gap-5 grid items-center mt-[30px] mx-auto md:px-5 max-w-[1187px] min-h-[auto] w-full"
            orientation="vertical"
          >
            <div className="bg-gray_400 flex flex-1 items-center justify-start p-[11px] w-full">
              <div className="flex flex-col gap-1.5 items-center justify-start my-1.5 w-[98%] md:w-full">
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-between w-[99%] md:w-full">
                  <div className="flex md:flex-1 flex-col gap-[34px] items-start justify-start md:mt-0 mt-0.5 md:w-full">
                    <div className="sm:flex-col sm:gap-5">
                        <span className="text-md text-white_A700 font-montserrat text-left font-bold">
                          Title : production 1sssss
                        </span>
                        <span className="mb-0.5 sm:ml-[0] ml-[22px] text-white_A700 font-montserrat text-left font-bold">
                          Role : {auditioncall.auditionCategory}
                        </span>
                      <Text
                        className="sm:ml-[0] ml-[22px] sm:mt-0 mt-0.5 text-lg text-white_A700"
                      >
                        <span className="text-white_A700 font-montserrat text-left font-bold">
                          Age : {auditioncall.ageRange}
                        </span>
                      </Text>
                      <Text
                        className="font-bold text-left text-white_A700 w-auto"
                        variant="body22"
                      ></Text>
                        <Text
                          className="md:ml-[0] ml-[22px] md:mt-0 mt-[5px] text-lg text-white_A700 font-montserrat"
                        >
                          Venue : {auditioncall.venueOrInterviewLocation}
                        </Text>
                        <Text
                          className="md:ml-[0] ml-[11px] md:mt-0 mt-1 text-lg text-white_A700"
                        >
                          Type : {auditioncall.movieType}
                        </Text>
                    </div>
                    <Text
                      className="ml-[22px] font-medium text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Description
                    </Text>
                  </div>
                  <div className="bg-gray_800 flex md:flex-1 flex-col font-roboto gap-[11px] items-start justify-start mb-[3px] p-2 w-[17%] md:w-full">
                    <div className="flex flex-row gap-2 items-start justify-start ml-5 md:ml-[0] w-[46%] md:w-full">
                      <i className="fa fa-camera" aria-hidden="true"></i>
                      <Text
                        className="not-italic text-left text-white_A700 w-auto"
                        variant="body30"
                      >
                        Camera
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2 items-start justify-start ml-5 md:ml-[0] w-[44%] md:w-full">
                      <i className="fa fa-picture-o" aria-hidden="true"></i>
                      <Text
                        className="not-italic text-left text-white_A700 w-auto"
                        variant="body30"
                      >
                        Gallery
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-[99%] md:w-full">
                  <Text
                    className="font-normal md:mt-0 mt-[17px] not-italic text-justify text-white_A700 w-auto"
                    variant="body41"
                  >
                   {auditioncall.auditionDescription}
                  </Text>
                  <div className="flex flex-col gap-[19px] items-center justify-start w-auto md:w-full">
                    <Button className="bg-red_A700 cursor-pointer font-medium leading-[normal] min-w-[202px] py-[19px] py-2 px-1 rounded text-[14.7px] text-center text-white_A700 w-auto">
                      Upload Audition Video{' '}
                    </Button>
                    <Button onClick = {applyForAudition}className="bg-red_A700 cursor-pointer font-medium leading-[normal] min-w-[202px] py-[19px] py-2 px-1 rounded text-[14.7px] text-center text-white_A700 w-auto">
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
