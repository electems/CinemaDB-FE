import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Button } from '../../../components/Elements/index';
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../storage/storage';
import { FilmTrainingInstituteEvent } from '../../../types/filminstitute_event.type';

const initialFilmTrainingInstituteEvent = {
  id: null,
  nameOfTheFilmInstitute: ' ',
  eventName: ' ',
  eventDescription: ' ',
  additionalDescription: ' ',
  addressVenueDetails: ' ',
  eventStartDate: ' ',
  areaName: ' ',
  cityTown: ' ',
  eventendDate: ' ',
  pincode: ' ',
  emailId: ' ',
  mobileNumber: ' ',
  instagramUrl: ' ',
  landlineNumber: ' ',
  facebookUrl: ' ',
  preferredLanguageToSpeak: ' ',
  linkedinUrl: ' ',
  fileName: ' ',
  filmInstituteFK: ' '
}

const FilmTrainingInstituteEventsRegistrationFormPage: React.FC = () => {
  const [isShow, invokeModal] = React.useState(false)
  const [filmInstituteEvent, setFilmInstituteEvent] =
    React.useState(initialFilmTrainingInstituteEvent);
  const [allFilmInstitutes, setAllFilmInstitute] =
    React.useState<FilmTrainingInstituteEvent[]>([]);
  let fileRecord: any
  const loggedInUser = storage.getLoggedUser();
  useEffect(() => {
    fetchAllFilmTrainingIntitutes()
  }, [])

  const navigate = useNavigate();

  const fetchAllFilmTrainingIntitutes = async () => {
    const allFilmTrainingInstitutes = await api.get(`filminsitutetraining/getallfilminsitutetraining/${loggedInUser.id}`)
    setAllFilmInstitute(allFilmTrainingInstitutes.data)
    console.log(allFilmTrainingInstitutes.data)
  }

  const handleSelectedInstitute = (e) => {
    filmInstituteEvent.filmInstituteFK = JSON.parse(e.target.value).id
    filmInstituteEvent.nameOfTheFilmInstitute = JSON.parse(e.target.value).nameOfTheFilmInstitute
  };

  const fileUpload = async (file) => {
    const formData = new FormData()
    formData.append('image', file);
    const upload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    fileRecord = upload.data
    return upload.data
  }

  const handleFileUpload = async (e) => {
    let { name, value } = e.target;
    if (name === 'Photo') {
      value = e.target.files[0]
      const path = await fileUpload(value)
      value = path
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilmInstituteEvent({ ...filmInstituteEvent, [name]: value });
  };

  const clearForm = async () => {
    setFilmInstituteEvent({ ...initialFilmTrainingInstituteEvent });
  }

  const saveFilmInstituteForm = async () => {
    const filmInstituteEventObject: FilmTrainingInstituteEvent = {
      nameOfTheFilmInstitute: filmInstituteEvent.nameOfTheFilmInstitute,
      eventName: filmInstituteEvent.eventName,
      eventDescription: filmInstituteEvent.eventDescription,
      additionalDescription: filmInstituteEvent.additionalDescription,
      addressVenueDetails: filmInstituteEvent.addressVenueDetails,
      eventStartDate: filmInstituteEvent.eventStartDate,
      eventendDate: filmInstituteEvent.eventendDate,
      areaName: filmInstituteEvent.areaName,
      cityTown: filmInstituteEvent.cityTown,
      pincode: filmInstituteEvent.pincode,
      preferredLanguageToSpeak: filmInstituteEvent.preferredLanguageToSpeak,
      landlineNumber: filmInstituteEvent.landlineNumber,
      emailId: filmInstituteEvent.emailId,
      mobileNumber: filmInstituteEvent.mobileNumber,
      facebookUrl: filmInstituteEvent.facebookUrl,
      linkedinUrl: filmInstituteEvent.linkedinUrl,
      instagramUrl: filmInstituteEvent.instagramUrl,
      filmInstituteFK: filmInstituteEvent.filmInstituteFK,
      fileName: fileRecord.filename

    }
    await api.post('/filminsitutetraining/createfilminsitutetrainingevent', filmInstituteEventObject)

    const file = {
      fileName: fileRecord.filename,
      destination: fileRecord.destination,
      originalName: fileRecord.originalname,
      tableName: 'FilmTrainingInstituteEvent',
      tableId: loggedInUser.id
    }
    await api.post('/fileupload/createfile', file)
    navigate('/film/filminstitutetraining/traininginstitutes')
  };

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto items-start justify-start mx-auto w-full">
        <div className="flex items-center w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        </div>
        <div className="flex items-end mt-[46px] md:px-10 sm:px-5 px-[117px] w-full">
          <div className="bg-gray_800 flex items-center justify-start p-[26px] md:px-5 w-[95%] md:w-full">
            <div className="flex flex-col items-start justify-start mb-[45px] w-[99%] md:w-full">
            <div className="font-roboto md:gap-3 gap-[30px] grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
                <Text
                  className="font-bold text-amber_A400 text-left w-auto"
                  variant="body11"
                  style={{ fontSize: '20px' } }

                >
                  Create an event under your Film institute
                </Text>
                <br />
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                  <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Name of the Flim Institute
                        </Text>

                    <div className="mb-6">
                    <select className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                          placeholder="Select Any One" name='nameOfTheFilmInstitute' onChange={handleSelectedInstitute}>

                          <option >
                            Choose Film Institute
                          </option>
                          {allFilmInstitutes.map(item => (
                            <option key={item.nameOfTheFilmInstitute} value={JSON.stringify(item)}>
                              {item.nameOfTheFilmInstitute}
                            </option>
                          ))}
                        </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                  <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event Name
                      </Text>

                    <div className="mb-6">
                    <input
                        onChange={handleInputChange}
                        name="eventName"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.eventName}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                  <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event Description
                      </Text>

                    <div className="mb-6">
                    <input
                        onChange={handleInputChange}
                        name="eventDescription"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.eventDescription}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                  <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Additional Description
                      </Text>

                    <div className="mb-6">
                    <input
                        onChange={handleInputChange}
                        name="additionalDescription"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.additionalDescription}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                  <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Address/Venue Details
                      </Text>

                    <div className="mb-6">
                    <input
                        onChange={handleInputChange}
                        name="addressVenueDetails"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.addressVenueDetails}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                  <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event Start Date
                      </Text>

                    <div className="mb-6">
                    <input
                        onChange={handleInputChange}
                        name="eventStartDate"
                        type="date"
                        id="default-input"
                        value={filmInstituteEvent.eventStartDate}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 space-x-4 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Area Name
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="areaName"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.areaName}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      City/Town
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="cityTown"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.cityTown}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                  <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event End Date
                      </Text>

                    <div className="mb-6">
                    <input
                        onChange={handleInputChange}
                        name="eventendDate"
                        type="date"
                        id="default-input"
                        value={filmInstituteEvent.eventendDate}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                  <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Pincode
                        </Text>

                    <div className="mb-6">
                    <input
                          onChange={handleInputChange}
                          name="pincode"
                          type="text"
                          id="default-input"
                          value={filmInstituteEvent.pincode}
                          className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                  <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"
                        >
                          Email id
                        </Text>

                    <div className="mb-6">
                    <input
                          onChange={handleInputChange}
                          name="emailId"
                          type="text"
                          id="default-input"
                          value={filmInstituteEvent.emailId}
                          className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Mobile number/WhatsApp number
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="mobileNumber"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.mobileNumber}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Facebook URL
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="facebookUrl"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.facebookUrl}
                        className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Instagram URL
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="instagramUrl"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.instagramUrl}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      LinkedIn URL
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="linkedinUrl"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.linkedinUrl}
                        className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                  <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                         Upload Event Poster/s{' '}
                    </Text>

                    <div className="mb-6">
                    <input
                      name="Photo"
                      onChange={(e) => handleFileUpload(e)}
                      type="file"
                      id="default-input"
                      className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-1"
                    ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 sm:flex-col space-x-0 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">

                    <div className="mb-6">
                    <Button className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md bg-red_A700 cursor-pointer font-semibold h-[40px] leading-[normal] min-w-[211px] md:ml-[0] ml-[415px] md:mt-0 mt-[25px] py-[5px] text-base text-center text-white_A700"
                      style={{ marginLeft: '10px' }} onClick={clearForm}>
                    Clear the Form
                  </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <div className="mb-6">
                    <Button className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md bg-red_A700 cursor-pointer font-semibold h-[40px] leading-[normal] min-w-[211px] md:ml-[0] ml-[415px] md:mt-0 mt-[25px] py-[5px] text-base text-center text-white_A700" onClick={saveFilmInstituteForm} style={{ marginLeft: '10px' }}>
                    Submit
                  </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default FilmTrainingInstituteEventsRegistrationFormPage;
