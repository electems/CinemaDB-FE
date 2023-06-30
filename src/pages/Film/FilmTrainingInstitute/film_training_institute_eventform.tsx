import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Button, List } from '../../../components/Elements/index';
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
  const [filmInstituteEvent, setFilmInstituteEvent] =
    React.useState(initialFilmTrainingInstituteEvent);
  const [allFilmInstitutes, setAllFilmInstitute] =
    React.useState<FilmTrainingInstituteEvent[]>([]);
  const navigate = useNavigate();
  let fileRecord: any
  const loggedInUser = storage.getLoggedUser();
  useEffect(() => {
    fetchAllFilmTrainingIntitutes()
  }, [])

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
    const filmInstituteRecord = await api.post('/filminsitutetraining/createfilminsitutetrainingevent', filmInstituteEventObject)
    navigate('/film/public/traininginstitutes')
    const file = {
      fileName: fileRecord.filename,
      destination: fileRecord.destination,
      originalName: fileRecord.originalname,
      tableName: 'FilmTrainingInstituteEvent',
      tableId: loggedInUser.id
    }
    const fileObject = await api.post('/fileupload/createfile', file)
    console.log(fileObject);
    navigate('/film/public/traininginstitutes')
  };

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto gap-7 items-center justify-start mx-auto w-full">
        <Header className="bg-gray_800 flex md:flex-col flex-row md:gap-5 items-center justify-center md:px-5 w-full" />
        <div className="flex flex-col font-montserrat items-center justify-start max-w-[1204px] mb-64 mx-auto md:px-5 w-full">
          <div className="bg-gray_800 flex flex-col items-center justify-end p-[34px] sm:px-5 w-full">
            <div className="flex flex-col md:gap-10 gap-[88px] items-center justify-start mb-[23px] mt-[78px] w-full">
              <Text
                className="md:text-2xl sm:text-[22px] text-[26px] text-amber_A400"

              >
                Create an event under your Film institute{' '}
              </Text>
              <div className="flex flex-col font-roboto items-start justify-start w-full">
                <div className="md:gap-5 gap-[90px] grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
                  <div className="flex md:h-[86px] h-[87px] justify-end relative w-full">
                    <div className="absolute flex flex-col h-full inset-[0] items-center justify-center m-auto w-full">
                      <div className="flex flex-col gap-[5px] justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Name of the Flim Institute
                        </Text>
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
                  <div className="flex flex-1 flex-col items-center justify-start w-full">
                    <div className="flex flex-col gap-[5px] justify-start w-full">
                      <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event Name
                      </Text>
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
                  <div className="flex flex-1 flex-col items-center justify-start w-full">
                    <div className="flex flex-col justify-start w-full">
                      <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event Description
                      </Text>
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
                  <div className="flex flex-1 flex-col items-center justify-start w-full">
                    <div className="flex flex-col justify-start w-full">
                      <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Additional Description
                      </Text>
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
                  <div className="flex flex-1 flex-col items-center justify-start w-full">
                    <div className="flex flex-col gap-[5px] justify-start w-full">
                      <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Address/Venue Details
                      </Text>
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
                  <div className="flex flex-1 flex-col items-center justify-start w-full">
                    <div className="flex flex-col gap-[5px] justify-start w-full">
                      <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event Start Date
                      </Text>
                      <input
                        onChange={handleInputChange}
                        name="eventStartDate"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.eventStartDate}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center justify-start w-full">
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

                  <div className="flex flex-1 flex-col items-center justify-start w-full">
                    <div className="flex flex-col gap-[5px] justify-start w-full">
                      <Text
                        className="ml-2.5 md:ml-[0] text-base text-white_A700"

                      >
                        Event End Date
                      </Text>
                      <input
                        onChange={handleInputChange}
                        name="eventendDate"
                        type="text"
                        id="default-input"
                        value={filmInstituteEvent.eventendDate}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>
                <List
                  className="flex flex-col gap-3 items-center mt-[17px] w-full"
                  orientation="vertical"
                >
                  <div className="flex flex-1 md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                    <div className="flex md:flex-1 flex-col items-center justify-start md:mt-0 mt-[7px] w-[47%] md:w-full">
                      <div className="flex flex-col gap-[5px] justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Pincode
                        </Text>
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
                    <div className="flex md:flex-1 flex-col items-center justify-start mb-[7px] w-[47%] md:w-full">
                      <div className="flex flex-col gap-[5px] justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Email id
                        </Text>
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
                  <div className="flex flex-1 md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                    <div className="flex md:flex-1 flex-col items-center justify-start md:mt-0 mt-2 w-[46%] md:w-full">
                      <div className="flex flex-col gap-[5px] justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Mobile number/WhatsApp number
                        </Text>
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
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[46%] md:w-full">
                      <div className="flex flex-col justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Instagram URL
                        </Text>
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
                  <div className="flex flex-1 md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                    <div className="flex md:flex-1 flex-col items-center justify-start md:mt-0 mt-0.5 w-[46%] md:w-full">
                      <div className="flex flex-col gap-[5px] justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Landline number
                        </Text>
                        <input
                          onChange={handleInputChange}
                          name="landlineNumber"
                          type="text"
                          id="default-input"
                          value={filmInstituteEvent.landlineNumber}
                          className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        ></input>
                      </div>
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start mb-0.5 w-[46%] md:w-full">
                      <div className="flex flex-col gap-[5px] justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Facebook URL
                        </Text>
                        <input
                          onChange={handleInputChange}
                          name="facebookUrl"
                          type="text"
                          id="default-input"
                          value={filmInstituteEvent.facebookUrl}
                          className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[46%] md:w-full">
                      <div className="flex flex-col justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          Preferred Language to Speak/Converse
                        </Text>
                        <input
                          onChange={handleInputChange}
                          name="preferredLanguageToSpeak"
                          type="text"
                          id="default-input"
                          value={filmInstituteEvent.preferredLanguageToSpeak}
                          className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        ></input>
                      </div>
                    </div>
                    <div className="flex md:flex-1 flex-col items-center justify-start w-[46%] md:w-full">
                      <div className="flex flex-col gap-[5px] justify-start w-full">
                        <Text
                          className="ml-2.5 md:ml-[0] text-base text-white_A700"

                        >
                          LinkedIn URL
                        </Text>
                        <input
                          onChange={handleInputChange}
                          name="linkedinUrl"
                          type="text"
                          id="default-input"
                          value={filmInstituteEvent.linkedinUrl}
                          className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        ></input>
                      </div>
                    </div>
                  </div>
                </List>

                <div className="flex md:flex-col flex-row font-montserrat md:gap-5 items-end justify-start md:ml-[0] ml-[11px] mt-[60px] w-[93%] md:w-full">
                  <div className="mb-6">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Upload Event Poster/s{' '}
                    </Text>
                    <input
                      name="Photo"
                      onChange={(e) => handleFileUpload(e)}
                      type="file"
                      id="default-input"
                      className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                    ></input>
                  </div>
                  <Button className="bg-red_A700 cursor-pointer font-semibold h-[31px] leading-[normal] min-w-[211px] md:ml-[0] ml-[415px] md:mt-0 mt-[25px] py-[5px] text-base text-center text-white_A700">
                    Clear the Form
                  </Button>
                  <Button className="bg-red_A700 cursor-pointer font-semibold h-[31px] leading-[normal] min-w-[149px] md:ml-[0] ml-[69px] md:mt-0 mt-[25px] py-[5px] text-base text-center text-white_A700" onClick={saveFilmInstituteForm}>
                    Submit
                  </Button>
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
