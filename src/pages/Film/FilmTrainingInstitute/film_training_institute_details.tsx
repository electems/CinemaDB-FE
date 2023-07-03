import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader'
import { Text, Button, Img, List } from '../../../components/Elements/index'
import Footer from '../../../components/Footer/footer'
import { FilmTrainingInstitute } from '../../../types/film_institute.type'
import { api } from '../../../services/api'
import { useLocation, useNavigate } from 'react-router-dom';
import { storage } from '../../../storage/storage'
import { FilmTrainingInstituteEvent } from '../../../types/filminstitute_event.type';
import { User } from '../../../types/user.types';

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
    const enquiryNotification = {
      email: filmPerson?.email,
      content: { id: loggedInUser.id, firstName: loggedInUser.firstName, lastName: loggedInUser.lastName },
      tableId: loggedInUser.id,
      userType: loggedInUser.role,
      notificationType: 'FILM TRAININGINSTITUTE ENQUIRY'
    }

    await api.post('/filminsitutetraining/filmInstituteTraining/notification', enquiryNotification)
  }

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
                  <Button className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2.5 px-8 text-md bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[20px] py-[10px] rounded text-[14.7px] text-center text-white_A700">
                    Upload Resume
                  </Button>
                  <Button className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-10 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2.5 px-8 text-md bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[20px] py-[10px] rounded text-[14.7px] text-center text-white_A700" onClick={filmInstituteEnquiry}>
                    Enquire now
                  </Button>
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
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </List>
        </div>
        <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[101px] md:px-5 w-full" />
      </div>
    </>
  );
};

export default FilmTrainingInstituteDetailPage;
