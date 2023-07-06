import React, { useEffect, useState } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader'
import { Text, Button, Img, List } from '../../../components/Elements/index'
import Footer from '../../../components/Footer/footer'
import { FilmTrainingInstitute } from '../../../types/film_institute.type'
import { api } from '../../../services/api'
import { useLocation, useNavigate } from 'react-router-dom';
import { storage } from '../../../storage/storage'
import { FilmTrainingInstituteEvent } from '../../../types/filminstitute_event.type';
import { User } from '../../../types/user.types';
import './filminstitute.css'
import { Modal } from 'antd';

interface FilmInstitute {
  filmInstituteId,
  file
}

const FilmTrainingInstituteDetailPage: React.FC = () => {
  const filmInstituteRecord = useLocation().state as FilmInstitute
  const [filmInstitute, setFilmInstitute] = React.useState<FilmTrainingInstitute>({});
  const [images, setImages] = React.useState([]);
  const [filmInstituteEvents, setFilmInstituteEvents] = React.useState<FilmTrainingInstituteEvent[]>([]);
  const trainingInstituteEventsPostersNames: string[] = [];
  const [filmPerson, setFilmPerson] = React.useState<User>()
  const loggedInUser = storage.getLoggedUser();
  const [showWarningMessage, setshowSuccessfullPop] = React.useState(false);
  const [showResumeSuccessMessage, setshowResumeSuccessMessage] = React.useState(false);
  const [showEnquirySuccessMessage, setshowEnquirySuccessMessage] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchFilmInstituteById()
  }, [])

  const fetchFilmInstituteById = async () => {
    const response = await api.get(`/filminsitutetraining/filmInstituteDetails/${filmInstituteRecord.filmInstituteId}`)
    const filmInstitutedata = response.data
    setFilmInstitute(filmInstitutedata)
    const filmInstituteEventdata = response.data.filmTrainingInstituteEvents
    for (let i = 0; i < filmInstituteEventdata.length; i++) {
      const fileUrl = await api.get(`/fileupload/files/profile/${filmInstituteEventdata[i].fileName}`)
      filmInstituteEventdata[i].imageUrl = fileUrl.request.responseURL
      setFilmInstituteEvents(filmInstituteEventdata)
    }

    getFilmPerson(filmInstitutedata.userFK)

    filmInstituteEventdata.map(async (poster) => {
      trainingInstituteEventsPostersNames.push(poster.fileName)
    })

    retriveImageUrls(trainingInstituteEventsPostersNames)
  }

  const retriveImageUrls = async (name) => {
    const items: any = []
    for (let i = 0; i < name.length; i++) {
      const movies = await api.get(`/fileupload/files/profile/${name[i]}`)
      items.push(movies.request.responseURL)
    }
    setImages(items)
  }

  const getFilmPerson = async (userFk) => {
    const filmPerson = await api.get(`/users/user/${userFk}`)
    setFilmPerson(filmPerson.data)
  }

  const filmInstituteEnquiry = async () => {
    if (loggedInUser.role === 'LOVER') {
      const enquiryNotification = {
        email: filmPerson?.email,
        content: { id: loggedInUser.id, firstName: loggedInUser.firstName, lastName: loggedInUser.lastName },
        tableId: loggedInUser.id,
        userType: loggedInUser.role,
        notificationType: 'FILM TRAININGINSTITUTE ENQUIRY'
      }

      const enqueryNotification = await api.post('/filminsitutetraining/filmInstituteTraining/notification', enquiryNotification)
      if (
        enqueryNotification.data != null &&
        enqueryNotification.statusText === 'Created'
      ) {
        setshowResumeSuccessMessage(false)
        setshowEnquirySuccessMessage(true)
        showModal();
      }
    } else {
      setshowSuccessfullPop(true)
    }
  }

  const closeWarningMessage = async () => {
    setshowSuccessfullPop(false)
  }

  let fileRecord: any

  const handleFileUpload = async (e) => {
    let { name, value } = e.target;
    if (name === 'Photo') {
      value = e.target.files[0]
      const path = await uploadResume(value)
      value = path
    }
  };

  const uploadResume = async (fileData) => {
    const formData = new FormData()
    formData.append('file', fileData);
    const upload = await api.post('/fileupload/file/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    fileRecord = upload.data

    const file = {
      fileName: fileRecord.filename,
      destination: fileRecord.destination,
      originalName: fileRecord.originalname,
      tableName: 'Resume',
      tableId: loggedInUser.id
    }
    await api.post('/fileupload/createfile', file)

    const resumeUploadedNotification = {
      email: loggedInUser.email,
      content: { firestName: loggedInUser.firstName, lastName: loggedInUser.lastName, file },
      tableId: loggedInUser.id,
      userType: loggedInUser.role,
      notificationType: 'RESUME UPLOAD FOR FILM INSTITUTE'
    }
    const userResume = await api.post('/filminsitutetraining/filmInstituteTraining/notification', resumeUploadedNotification)
    if (
      userResume.data != null &&
      userResume.statusText === 'Created'
    ) {
      setshowResumeSuccessMessage(true)
      setshowEnquirySuccessMessage(false)
      showModal();
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray_900 flex flex-col items-center justify-start mx-auto w-full">
      <Header className="bg-gray_800 flex md:flex-col flex-row font-roboto md:gap-5 items-center justify-center md:px-5 w-full" />
        <div className="flex flex-col justify-start max-w-[1187px] min-h-[auto] w-full">

          <Text
            className="md:ml-[0] ml-[10px] mt-7 text-2xl md:text-[22px] text-amber_A400 sm:text-xl"

          >
            {filmInstitute.nameOfTheFilmInstitute}
          </Text>
          <Img
            className="h-[586px] sm:h-auto max-w-[1307px] mt-[27px] mx-auto object-cover w-full"
            src={filmInstituteRecord.file}
            alt="rectangle772"
          />
          <div className="flex sm:flex-col flex-row font-montserrat md:gap-10 items-center justify-between max-w-[1273px] mt-[27px] mx-auto md:px-5 w-full">
            <Text
              className="md:ml-[0] ml-[10px] mt-7 text-2xl md:text-[22px] text-amber_A400 sm:text-xl"

            >
              About {filmInstitute.nameOfTheFilmInstitute}
            </Text>
            <Text
              className="text-white_A700 text-xs"

            >
              Address: {filmInstitute.areaName}, {filmInstitute.cityTown}, {filmInstitute.fullAddress},{filmInstitute.pincode}
            </Text>
          </div>

          <Text
            className="md:ml-[0] ml-[10px] mt-2.5 text-justify text-white_A700 text-xs w-[84%] sm:w-full"

          >
            {filmInstitute.courseDescription}
          </Text>
          <List
            className="flex flex-col font-montserrat gap-5 items-center max-w-[1278px] mt-9 mx-auto md:px-5 w-full"
            orientation="vertical"
          >
            <div className="bg-gray_1000 flex flex-1 flex-col items-center justify-start p-[11px] w-full">
              <div className="flex md:flex-col sm:flex:row gap-[38px] items-start justify-between mb-3 mt-2 w-[98%] md:w-full">
                <div className="flex flex-col items-start justify-start mb-12 w-[81%] md:w-full">
                  <div className="flex md:flex-col flex-row md:gap-6 justify-start md:w-full">
                    <Text
                      className="mb-0.5 text-lg text-white_A700"

                    >
                      <span className="text-white_A700 font-montserrat text-left font-bold">
                        Course Name :{' '}
                      </span>
                      <span className="text-white_A700 font-montserrat text-left text-base font-medium">
                        {filmInstitute.courseName}
                      </span>
                    </Text>
                    <Text
                      className="mb-[3px] md:ml-[0] ml-[26px] text-lg text-white_A700"

                    >
                      Course Duration : 6 months
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[11px] md:mt-0 mt-[3px] text-lg text-white_A700"

                    >
                      Venue : {filmInstitute.cityTown}
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[11px] md:mt-0 mt-0.5 text-lg text-white_A700"

                    >
                      Fees : {filmInstitute.courseFee}
                    </Text>
                  </div>
                  <Text
                    className="mt-[30px] text-base text-white_A700"

                  >
                    About the Course
                  </Text>
                  <Text
                    className="md:ml-[0] ml-[29px] mt-[23px] text-[10px] text-justify text-white_A700 w-[98%] sm:w-full"

                  >
                    {filmInstitute.courseDescription}
                  </Text>
                </div>
                <div className="flex flex-col gap-6 items-center justify-start md:mt-0 mt-[71px] w-[17%] md:w-full">

                <Text
                        className="font-bold ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Upload Your Resume{' '}
                      </Text>
                    <input
                      name="Photo"
                      onChange={(e) => handleFileUpload(e)}
                      type="file"
                      id="default-input"
                      className="text-white border border-1 border-gray_1000 bg-gray_1000 text-sm rounded-lg block w-full p-1"
                    />
                  {/* <Button className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2.5 px-8 text-md bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[20px] py-[10px] rounded text-[14.7px] text-center text-white_A700">
                    Upload Resume
                  </Button> */}
                  <Button className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-10 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2.5 px-8 text-md bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[20px] py-[10px] rounded text-[14.7px] text-center text-white_A700" onClick={filmInstituteEnquiry}>
                    Enquire now
                  </Button>
                 {
                   showWarningMessage === true
                     ? <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-0 rounded relative" role="alert">
                   <strong className="font-bold">Warning!</strong>
                   <span className="block sm:inline">Only film Lovers are Allowed for Enquiry</span>
                   <span className="absolute top-0 bottom-0 right-0 px-3 py-0">
                     <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={closeWarningMessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                   </span>
                 </div>

                     : ' '}
                </div>
              </div>
            </div>
          </List>
          <Text
            className="md:ml-[0] ml-[105px] mt-[34px] text-3xl sm:text-[26px] md:text-[28px] text-amber_A400"
            style={{ marginLeft: '10px' }}
          >
            <>EVENTS organized by {filmInstitute.nameOfTheFilmInstitute} </>
          </Text>
          <List
            className="flex flex-col font-montserrat gap-[30px] items-center max-w-[1278px] mt-6 mx-auto md:px-5 w-full"
            orientation="vertical"
          >
            {filmInstituteEvents.map((item) => {
              return (
                <>
                  <div className="bg-blue_gray_500 flex flex-1 flex-col items-center justify-start p-[15px] w-full">
                    <div className="flex flex-col items-start justify-start mb-[5px] w-[98%] md:w-full">
                      <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-[50%] md:w-full">
                        <Text
                          className="text-lg text-white_A700"

                        >
                          <span className="text-white_A700 font-montserrat text-left font-bold">
                            Event Name :{' '}
                          </span>
                          <span className="text-white_A700 font-montserrat text-left text-base font-medium">
                            {item.eventName}
                          </span>
                        </Text>
                        <Text
                          className="sm:ml-[0] ml-[49px] text-lg text-white_A700"

                        >
                          Venue : {item.addressVenueDetails}
                        </Text>
                        <Text
                          className="sm:ml-[0] ml-[38px] text-lg text-white_A700"

                        >
                          Fees : 10,000
                        </Text>
                      </div>
                      <Text
                        className="mt-[15px] text-base text-white_A700"

                      >
                        About the Event
                      </Text>

                      <div className="flex md:flex-col md:gap-5 items-end justify-start ml-11 md:ml-[0] mt-[3px] w-[97%] md:w-full">

                        <Img
                          className="h-[145px] sm:h-auto md:mt-0 mt-1.5 object-cover w-[16%] md:w-full"
                          src={item.imageUrl}
                          alt="rectangle657"
                        />

                        <Text
                          className="md:ml-[10] ml-[35px] sm:ml-[25px] text-[13.5px] text-start text-white_A700 w-[95%] sm:w-15px"
                          style={{ marginBottom: '100px' }}

                        >{item.eventDescription}
                          {item.additionalDescription}
                        </Text>
                        <Button className="bg-red_A700 cursor-pointer font-bold leading-[normal] mb-[81px] min-w-[190px] md:ml-[0] ml-[74px] md:mt-0 mt-3.5 py-[19px] rounded text-[14.7px] text-center text-white_A700" onClick={filmInstituteEnquiry}>
                          Enquire now
                        </Button>
                        {
                   showWarningMessage === true
                     ? <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-0 rounded relative" role="alert">
                   <strong className="font-bold">Warning!</strong>
                   <span className="block sm:inline">Only film Lovers are Allowed for Enquiry</span>
                   <span className="absolute top-0 bottom-0 right-0 px-3 py-0">
                     <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={closeWarningMessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                   </span>
                 </div>

                     : ' '}
                      </div>
                    </div>

                  </div>
                </>
              )
            })}
          </List>
          {isModalOpen === true
            ? (
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                    <div className="relative top-10 mx-auto p-5  w-96  rounded-md bg-white">

                    <div className="mt-3 text-center">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <Img

                      className=""

                      src='/images/success.png'

                      />
                      </div>
                      { showResumeSuccessMessage === false && showEnquirySuccessMessage === true
                        ? <h3 className="text-lg leading-6 font-medium text-gray-900">
                      ENQUIRY IS SUBMITTED SUCCESSFULLY
                      </h3>
                        : '' }
                      { showResumeSuccessMessage === true && showEnquirySuccessMessage === false
                        ? <h3 className="text-lg leading-6 font-medium text-gray-900">
                      RESUME IS SUBMITTED SUCCESSFULLY
                      </h3>
                        : '' }

                      <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">
                        </p>
                      </div>
                      <div className="items-center px-4 py-3">
                        <button
                          id="ok-btn"
                          className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                          onClick={handleCancel}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                  </Modal>
              )
            : (
                ''
              )}
        </div>
        <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[101px] md:px-5 w-full" />
      </div>
    </>
  );
};

export default FilmTrainingInstituteDetailPage;
