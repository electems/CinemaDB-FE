import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Button, Img } from '../../../components/Elements/index';
import Footer from '../../../components/Footer/footer';
import { IAuditionCall } from '../../../types/auditioncall.type';
import { api } from '../../../services/api';
import './app.css'
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../storage/storage';

const initialAuditionCallState = {
  id: null,
  auditionCategory: '',
  auditionDescription: '',
  gender: '',
  ageRange: '',
  start_date: '',
  end_date: '',
  timeDurationForAudition: '',
  preferredLanguageToSpeak: '',
  movieType: '',
  seoTags: '',
  auditionAgencyEmailId: '',
  contactNumber: '',
  auditionReason: '',
  venueOrInterviewLocation: '',
  duration: '',
  movieFk: null
};
const AuditionsCallRegistration: React.FC = () => {
  const [auditionCall, setAuditionCall] = React.useState(initialAuditionCallState);
  const [fromAge, setFromAge] = React.useState('');
  const [toAge, setToAge] = React.useState('');
  const [formValue, setFormValue] = React.useState<any[]>([])
  const [dropdownId, setDropdownId] = React.useState()
  const [poster, setPoster] = React.useState<any>()
  const [isShow, invokeModal] = React.useState(false)
  const navigate = useNavigate()
  const loggedUser = storage.getLoggedUser()

  useEffect(() => {
    retriveMovies()
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAuditionCall({ ...auditionCall, [name]: value });
  };

  const ageFrom = (event) => {
    setFromAge(event.target.value);
  };
  const ageTo = (event) => {
    setToAge(event.target.value);
  };

  const saveAuditionPoster = async (event) => {
    const formData = new FormData()
    formData.append('image', event.target.files[0]);
    const upload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    setPoster(upload.data)
  };

  const saveAuditionCallDetails = async () => {
    const auditionCallObject: IAuditionCall = {
      auditionCategory: auditionCall.auditionCategory,
      auditionDescription: auditionCall.auditionDescription,
      gender: auditionCall.gender,
      ageRange: fromAge + '-' + toAge,
      startDate: auditionCall.start_date,
      endDate: auditionCall.end_date,
      timeDurationForAudition: auditionCall.timeDurationForAudition,
      movieType: auditionCall.movieType,
      preferredLanguageToSpeak: auditionCall.preferredLanguageToSpeak,
      seoTags: auditionCall.seoTags,
      auditionAgencyEmailId: auditionCall.auditionAgencyEmailId,
      contactNumber: auditionCall.contactNumber,
      auditionReason: auditionCall.auditionReason,
      venueOrInterviewLocation: auditionCall.venueOrInterviewLocation,
      duration: auditionCall.duration,
      movieFk: dropdownId,
      userFK: loggedUser.id
    }
    const auditionCallResponse = await api.post('/auditioncall/createAuditionCall', auditionCallObject)
    const filmInstituteTraining = await auditionCallResponse.data;
    const file = {
      fileName: poster.filename,
      destination: poster.destination,
      originalName: poster.originalname,
      tableName: 'AuditionCall',
      tableId: filmInstituteTraining.id
    }
    await api.post('/fileupload/createfile', file)
    // navigate('/film/auditioncall/auditioncallsinglemovie', { state: { tableId: dropdownId } })
  }

  const retriveMovies = async () => {
    const movies = await api.get(`userprofession/movies/${loggedUser.id}`)
    const response = await movies.data
    setFormValue(response)
    return response
  }

  const handleMovieChange = (e) => {
    setDropdownId(JSON.parse(e.target.value).id)
  };

  const modalOn = () => {
    return invokeModal(!false)
  }

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto items-start justify-start mx-auto w-full">
        <div className="flex items-center w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        </div>
        <div className="flex items-end mt-[46px] md:px-10 sm:px-5 px-[117px] w-full">
          <div className="bg-gray_800 flex items-center justify-start p-[26px] md:px-5 w-[95%] md:w-full">
            <div className="flex flex-col items-start justify-start mb-[45px] w-[99%] md:w-full">
            <Text
              className="md:text-2xl sm:text-[22px] text-[26px] font-semibold text-amber_A400"
            >
              Create a new Audition category
            </Text>
              <div className="flex md:flex-1 items-center justify-start mb-0.5 md:w-full md:gap-5 gap-[20px] grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full mt-3">
                <div className=" mt-6 flex flex-col gap-1.5 justify-start w-full">
                  <Text
                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Select the registered movie on CinemaDBS for Audition call
                  </Text>
                  <div>
                    <select className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5" placeholder="Please select your role" name='genres' onChange={handleMovieChange}>
                      {formValue.map(item => (
                        <option key={item.value} value={JSON.stringify(item)}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full mt-3">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Audition Poster
                    </Text>
                    <div className="customerFileBtn ">
                      <input onChange={saveAuditionPoster} name="auditionCategory" type="file" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-roboto md:gap-5 gap-[20px] grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full mt-3">
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Audition Title
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="auditionCategory" placeholder="Female Actor Required in lead Role" type="text" id="default-input" className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Audition Description{' '}
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="auditionDescription" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Gender
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="gender" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex items-center justify-start w-full">
                    <div className="flex flex-col gap-[5px] justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Age Range
                      </Text>
                      <div className="flex sm:flex-col flex-row sm:gap-10 items-center justify-between w-full">
                        <div className="mb-6">
                          <input onChange={ageFrom} name="age1" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                        </div>
                        <div className="mb-6">
                          <input onChange={ageTo} name="age2" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Start date
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="start_date" type="date" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      End date
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="end_date" type="date" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Time Duration  for Audition{' '}
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="timeDurationForAudition" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Preferred Language  to Speak/Converse{' '}
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="preferredLanguageToSpeak" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Movie Type
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="movieType" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      SEO Tags
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="seoTags" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Audition Agency Email id
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="auditionAgencyEmailId" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Contact Number
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="contactNumber" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Audition Reason
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="auditionReason" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Venue / Interview Location
                    </Text>
                    <div className="mb-6">
                      <input onChange={handleInputChange} name="venueOrInterviewLocation" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex font-roboto items-center justify-start mt-[23px] w-[46%] md:w-full">
                <div className="flex flex-col gap-1.5 justify-start w-full">
                  <Text
                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Duration
                  </Text>
                  <div className="mb-6">
                    <input onChange={handleInputChange} name="duration" type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                  </div>
                </div>
              </div>
              <div className='flex sm:flex-col gap-3 justify-start mx-8'>
              <Button onClick={saveAuditionCallDetails} className="bg-red_A700 cursor-pointer font-montserrat font-semibold leading-[normal] min-w-[219px] md:ml-[0] mt-[45px] md:px-10 px-11 sm:px-5 py-1.5 text-base text-center text-white_A700 w-auto">
                Submit the Audition Category
              </Button>
              <Button className="bg-red_A700 cursor-pointer font-montserrat font-semibold leading-[normal] min-w-[215px] md:ml-[0] mt-[45px] md:px-10 sm:px-5 px-11 py-1.5 text-base text-center text-white_A700 w-auto">
                Promote The Audition Call
              </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-9 w-full">
          <Footer className="bg-gray_800 flex items-center justify-center md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default AuditionsCallRegistration;
