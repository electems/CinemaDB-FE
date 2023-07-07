import React, { useContext, useState } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Button } from '../../../components/Elements/index';
import Footer from '../../../components/Footer/footer';
import { FilmTrainingInstitute } from '../../../types/film_institute.type';
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../storage/storage';
import { Modal } from 'antd';
import { Context } from '../../../contexts/contextLogin';
import './filminstitute.css'

const initialFilmInstitute = {
  id: null,
  nameOfTheFilmInstitute: ' ',
  aboutTheFilmInstitute: ' ',
  fullAddress: ' ',
  instituteStartDate: ' ',
  instituteendDate: ' ',
  areaName: ' ',
  cityTown: ' ',
  pincode: ' ',
  preferredLanguageToSpeak: ' ',
  landlineNumber: ' ',
  emailId: ' ',
  mobileNumber: ' ',
  facebookUrl: ' ',
  linkedinUrl: ' ',
  instagramUrl: '',
  courseName: ' ',
  courseDescription: ' ',
  courseFee: ' ',
  fileName: '',
  industryExperiencedRequired: ' ',
  experience: ' ',
  userFK: ' '
};

let fileRecord: any;
const FilmInstituteRegistration: React.FC = () => {
  const { functionBack } = useContext(Context)
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const loggedInUser = storage.getLoggedUser();
  const [filmInstitute, setFilmInstitute] =
    React.useState(initialFilmInstitute);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'industryExperiencedRequired') {
      if (value === 'Yes') {
        setIsReadOnly(false);
      } else {
        setIsReadOnly(true);
      }
    }
    setFilmInstitute({ ...filmInstitute, [name]: value });
  };

  const clearForm = async () => {
    setFilmInstitute({ ...initialFilmInstitute });
  };

  const fileUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const upload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    fileRecord = upload.data;
    return upload.data;
  };

  const saveFilmInstituteForm = async () => {
    const filmInstituteObject: FilmTrainingInstitute = {
      nameOfTheFilmInstitute: filmInstitute.nameOfTheFilmInstitute,
      aboutTheFilmInstitute: filmInstitute.aboutTheFilmInstitute,
      fullAddress: filmInstitute.fullAddress,
      instituteStartDate: filmInstitute.instituteStartDate,
      instituteendDate: filmInstitute.instituteendDate,
      areaName: filmInstitute.areaName,
      cityTown: filmInstitute.cityTown,
      pincode: filmInstitute.pincode,
      preferredLanguageToSpeak: filmInstitute.preferredLanguageToSpeak,
      landlineNumber: filmInstitute.landlineNumber,
      emailId: filmInstitute.emailId,
      mobileNumber: filmInstitute.mobileNumber,
      facebookUrl: filmInstitute.facebookUrl,
      linkedinUrl: filmInstitute.linkedinUrl,
      instagramUrl: filmInstitute.instagramUrl,
      courseName: filmInstitute.courseName,
      courseDescription: filmInstitute.courseDescription,
      courseFee: filmInstitute.courseFee,
      fileName: fileRecord.filename,
      industryExperiencedRequired: filmInstitute.industryExperiencedRequired,
      experience: filmInstitute.experience,
      userFK: loggedInUser.id
    };

    const filmInstituteRecord = await api.post(
      '/filminsitutetraining/createfilminsitutetraining',
      filmInstituteObject
    );
    const filmInstituteTraining = filmInstituteRecord.data;
    const file = {
      fileName: fileRecord.filename,
      destination: fileRecord.destination,
      originalName: fileRecord.originalname,
      tableName: 'FilmTrainingInstitute',
      tableId: loggedInUser.id,
      filmInstituteFK: filmInstituteRecord.data.id
    };
    await api.post('/fileupload/createfile', file);

    const filmInstituteNotification = {
      email: loggedInUser.email,
      content: filmInstituteTraining,
      tableId: loggedInUser.id,
      userType: loggedInUser.role,
      notificationType: 'FILM INSTITUTE TRAINING'
    };
    await api.post(
      '/filminsitutetraining/filmInstituteTraining/notification',
      filmInstituteNotification
    );

    if (
      filmInstituteRecord.data != null &&
      filmInstituteRecord.statusText === 'Created'
    ) {
      showModal();
    }
  };

  const navigateToFilmInstitutes = async () => {
    navigate('/film/filminstitutetraining/traininginstitutes')
  }

  const dropdownValues = [
    { value: 'Select Any One', label: 'Select Any One' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const handleCastInputChange = async (e) => {
    let { name, value } = e.target;
    if (name === 'Photo') {
      value = e.target.files[0];
      const path = await fileUpload(value);
      value = path;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
                  style={{ fontSize: '20px' }}
                >
                  Create a New Film Training Institute
                </Text>
                <br />
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Name of the Flim Institute
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="nameOfTheFilmInstitute"
                        type="text"
                        id="default-input"
                        value={filmInstitute.nameOfTheFilmInstitute}
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
                      About the Film Institute
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="aboutTheFilmInstitute"
                        type="text"
                        id="default-input"
                        value={filmInstitute.aboutTheFilmInstitute}
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
                      Full Address
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="fullAddress"
                        type="text"
                        id="default-input"
                        value={filmInstitute.fullAddress}
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
                      Institute Start Date
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="instituteStartDate"
                        type="date"
                        id="default-input"
                        value={filmInstitute.instituteStartDate}
                        className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
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
                        value={filmInstitute.areaName}
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
                        value={filmInstitute.cityTown}
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
                      Institute End Date
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="instituteendDate"
                        type="date"
                        id="default-input"
                        value={filmInstitute.instituteendDate}
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
                      Pincode
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="pincode"
                        type="text"
                        id="default-input"
                        value={filmInstitute.pincode}
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
                      Preferred Language to Speak/Converse
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="preferredLanguageToSpeak"
                        type="text"
                        id="default-input"
                        value={filmInstitute.preferredLanguageToSpeak}
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
                      Landline number
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="landlineNumber"
                        type="text"
                        id="default-input"
                        value={filmInstitute.landlineNumber}
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
                      Email id
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="emailId"
                        type="text"
                        id="default-input"
                        value={filmInstitute.emailId}
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
                      Mobile number/WhatsApp number
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="mobileNumber"
                        type="text"
                        id="default-input"
                        value={filmInstitute.mobileNumber}
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
                        value={filmInstitute.facebookUrl}
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
                        value={filmInstitute.instagramUrl}
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
                        value={filmInstitute.linkedinUrl}
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
                      Course Name
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="courseName"
                        type="text"
                        id="default-input"
                        value={filmInstitute.courseName}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 space-x-4 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      Industry Experience Required?
                    </Text>
                    <div className="mb-6">
                      <select
                        className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Select Any One"
                        name="industryExperiencedRequired"
                        onChange={handleInputChange}
                        value={filmInstitute.industryExperiencedRequired}
                      >
                        {dropdownValues.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Text
                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                      variant="body26"
                    >
                      If Yes, enter the experience
                    </Text>
                    <div className="mb-6">
                      <input
                        disabled={isReadOnly}
                        onChange={handleInputChange}
                        name="experience"
                        type="text"
                        id="default-input"
                        value={filmInstitute.experience}
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
                      Course Description
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="courseDescription"
                        type="text"
                        id="default-input"
                        value={filmInstitute.courseDescription}
                        className="cursor: text text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <div className="mb-6">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Upload Institute Poster/s{' '}
                      </Text>
                      <input
                        name="Photo"
                        onChange={(e) => handleCastInputChange(e)}
                        type="file"
                        id="default-input"
                        className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-1"
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
                      Course Fee
                    </Text>
                    <div className="mb-6">
                      <input
                        onChange={handleInputChange}
                        name="courseFee"
                        type="text"
                        id="default-input"
                        className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 sm:flex-col space-x-0 items-center justify-start w-full">
                  <div className="flex flex-col justify-start w-full">
                    <div className="mb-6">
                      <Button
                        className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md bg-red_A700 cursor-pointer font-semibold h-[40px] leading-[normal] min-w-[211px] md:ml-[0] ml-[415px] md:mt-0 mt-[25px] py-[5px] text-base text-center text-white_A700"
                        style={{ marginLeft: '10px' }}
                        onClick={clearForm}
                      >
                        Clear The Form
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <div className="mb-6">
                      <Button
                        className="flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md flex justify-center items-center border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-6 text-md bg-red_A700 cursor-pointer font-semibold h-[40px] leading-[normal] min-w-[211px] md:ml-[0] ml-[415px] md:mt-0 mt-[25px] py-[5px] text-base text-center text-white_A700"
                        style={{ marginLeft: '10px' }}
                        onClick={saveFilmInstituteForm}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-start w-full">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <Button className="bg-red_A700 cursor-pointer font-montserrat font-semibold leading-[normal] min-w-[219px] md:ml-[0] ml-[95px] mt-[20px] md:px-10 px-11 sm:px-5 py-1.5 text-base text-center text-white_A700 w-auto"
                    style={{ marginRight: '80px' }}>
                      Add new course
                    </Button>
                  </div>
                </div>

                {isModalOpen === true
                  ? (
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                    <div className="relative top-10 mx-auto p-5  w-96  rounded-md bg-white">

                    <div className="mt-3 text-center">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                      REGISTRATION IS SUCCESSFULL
                      </h3>
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

export default FilmInstituteRegistration;
