import React, { useEffect, useState } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';

import { Img, Button, Text, Input, List } from '../../../components/Elements/index';
import Footer from '../../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { Pointer } from 'tabler-icons-react';
import { storage } from '../../../storage/storage';

const MyProfilePage: React.FC = () => {
  const loggedInUser = storage.getLoggedUser()
  const [image, setImage] = React.useState({ preview: '', raw: '' });
  const [profileImage, setProfileImage] = React.useState();
  useEffect(() => {
    retrievProfileImage()
  }, [])

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.raw);

    await fetch('YOUR_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });
  };

  const handleChange = async (e) => {
    setProfileImage(e.target.files[0])
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
    await upload(e.target.files[0])
  };

  const upload = async (item: any) => {
    const formData = new FormData()
    formData.append('image', item)
    const fileUpload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const file = {
      fileName: fileUpload.data.filename,
      destination: fileUpload.data.destination,
      originalName: fileUpload.data.originalname,
      tableName: 'profile',
      tableId: loggedInUser.id

    }
    await api.post('/fileupload/createfile', file)
  };

  const retrievProfileImage = async () => {
    const profileImage = await api.get(`/fileupload/userprofile/${loggedInUser.id}`)
    image.preview = profileImage.request.responseURL
  }

  const triggerForms = (form) => {
    navigate('/film/register/subcategoryuserform', { state: { form, user: loggedInUser } })
  }

  const forms = [
    { value: 'Personnel Information', label: 'Personnel Information' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Social Media Links', label: 'Social Media Links' },
    { value: 'KYC', label: 'KYC' }
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto items-center justify-start mx-auto pt-0.5 w-full">
        <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        <div className="bg-gray_800 flex flex-col font-montserrat items-center justify-start max-w-[1313px] mt-3.5 mx-auto p-[26px] md:px-5 w-full">
          <div className="flex h-[106px] items-center justify-start w-[106px]">
            <div className="h-[106px] relative w-[106px]">
                <label htmlFor="upload-button" className="h-[106px] m-auto rounded-[50%] w-[106px]">
        {image.preview
          ? (
          <img src={image.preview} alt="Egor Egorov" className="h-[106px] m-auto rounded-[50%] w-[106px]" />
            )
          : (
          <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-user-circle fa-stack-1x fa-inverse" />
            </span>

          </>
            )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <br />
              {/* <Img
                src="/images/img_rectangle285.png"
                className="h-[106px] m-auto rounded-[50%] w-[106px]"
                alt="rectangle285"
              />
              <div className="absolute bg-gray_900 flex h-full inset-[0] items-end justify-center m-auto md:pl-10 sm:pl-5 pl-[82px] pt-[82px] rounded-[50%] w-[106px]">
                <Button className="bg-gray_900 flex h-6 items-center justify-center p-1.5 rounded-[50%] w-6" >
                  <Img
                    src="/images/img_camera.svg"
                    className="h-3"
                    alt="camera"
                  />
                </Button>
              </div> */}
            </div>
          </div>
          {/* new */}
          <div>

    </div>
    {/* ends */}
          <Text
            className="capitalize font-semibold mt-4 text-left text-white_A700 tracking-[0.28px] w-auto"
            variant="body31"
          >
            Jane Cooper
          </Text>
          <Text
            className="capitalize font-medium mb-[30px] text-left text-white_A700 tracking-[0.28px] w-auto"
            variant="body31"
          >
            Actor
          </Text>
        </div>
   {forms.map((item) => {
     return (
      <>
       <div className="flex flex-col font-montserrat gap-1.5 items-center justify-start max-w-[1312px] mt-6 mx-auto md:px-5 w-full">
          <div className="bg-gray_800 flex items-center justify-end p-4 rounded w-full">
            <div className="flex flex-row md:gap-10 items-center justify-between w-[98%] md:w-full" >
              <Text
                className="font-bold text-left text-white_A700 w-auto"
                style={{ cursor: 'Pointer' }}
                variant="body17"
                onClick={() => triggerForms(item.value)}

              >
                {item.value}
              </Text>

              </div>
          </div>
        </div>
      </>
     )
   })}
        <div className="flex flex-col font-montserrat gap-4 justify-start max-w-[1312px] mt-[58px] mx-auto md:px-5 w-full">
          <Text
            className="font-medium md:ml-[0] ml-[1153px] text-left text-white_A700 w-auto"
            variant="body13"
          >
            + Add Poject
          </Text>
          <div className="flex flex-col gap-[18px] items-center justify-start w-full">
            <div className="bg-gray_800 border border-solid border-white_A700 flex flex-row md:gap-10 items-center justify-between p-[27px] sm:px-5 rounded w-full">
              <Text
                className="font-medium ml-[11px] text-left text-white_A700 w-auto"
                variant="body13"
              >
                Project 1
              </Text>
              <Img
                src="images/img_arrowup_white_a700.svg"
                className="h-[30px] mr-0.5 w-[30px]"
                alt="arrowup_Four"
              />
            </div>

          </div>
        </div>
        <Footer className="flex font-roboto items-center justify-center mt-[81px] md:px-5 w-full" />
      </div>
    </>
  );
};

export default MyProfilePage;
