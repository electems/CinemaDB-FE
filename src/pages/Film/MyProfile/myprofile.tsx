import React, { useEffect, useState } from 'react';

import { Img, Button, Text, Input, List } from '../../../components/Elements/index';
import { api } from '../../../services/api';
import { storage } from '../../../storage/storage';

const MyProfilePage: React.FC = () => {
  const loggedInUser = storage.getLoggedUser()
  const [image, setImage] = React.useState({ preview: '', raw: '' });
  const [profileImage, setProfileImage] = React.useState();
  const [profileName, setProfileName] = React.useState();
  const [profession, setProfession] = React.useState();
  const personalInformation = 'Personnel Information'
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
    const profileImage = await api.get(`/fileupload/getProfileByid/${loggedInUser.id}`)
    const proImage = profileImage.data
    const retriveProfileDetail = await api.get(`/users/profilename/${proImage[0].table_fk}`)
    const responseOfProfileDetail = await retriveProfileDetail.data
    setProfileName(responseOfProfileDetail[0].value)
    const getProfessionOfCurrentUser = await api.get(`/users/profession/${loggedInUser.id}`)
    const responseOfProfession = await getProfessionOfCurrentUser.data
    setProfession(responseOfProfession[0].title)
    const images = await api.get(`/fileupload/files/profile/${personalInformation}/${proImage[0].table_fk}/${proImage[0].fileName}`)
    image.preview = images.request.responseURL
  }

  return (
    <>
       <div className="pl-[99px] pr-[99px] md:pl-[99px] md:pr-[99px]">
        <div className="bg-gray_800 flex flex-col font-montserrat items-center justify-start max-w-[1313px] mt-3.5 mx-auto p-[26px] md:px-5 w-full h-[207px]">
          <div className="flex h-[106px] items-center justify-start w-[106px]">
            <div className="h-[106px] relative w-[106px]">
                <label htmlFor="upload-button" className="h-[106px] m-auto rounded-[50%] w-[106px]">
             {image.preview
               ? (
            <img src={image.preview} alt="Egor Egorov" className="h-[106px] m-auto rounded-[50%] w-[106px]" />
                 )
               : (
            <>
             <span className="fa-stack fa-3x mt-3 mb-2">
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
            </div>
          </div>
          <div>

    </div>
          <Text
            className="capitalize font-semibold mt-2 text-left text-white_A700 tracking-[0.28px] w-auto"
            variant="body31"
          >
              {profileName}
          </Text>
          <Text
            className="capitalize font-medium mb-[30px] text-left text-white_A700 tracking-[0.28px] w-auto"
            variant="body31"
          >
            {profession}
          </Text>
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
