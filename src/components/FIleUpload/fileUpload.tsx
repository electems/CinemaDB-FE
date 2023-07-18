/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { api } from '../../services/api';
import { storage } from '../../storage/storage';

const ImageUpload = () => {
  const loggedInUser = storage.getLoggedUser()
  const [image, setImage] = React.useState('');
  const id = document.getElementsByClassName('bg-white_A700 border-4 border-amber_A400 border-solid flex flex-row gap-[25px] items-start justify-start p-[19px] rounded-[5px] w-full').item(0)!.innerHTML;
  const switchCase = 'Personnel Information'
  useEffect(() => {
    retrievProfileImage()
  }, [])

  const selectFile = async (event) => {
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    const fileUploads = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    localStorage.setItem('fileupload', JSON.stringify(fileUploads.data))
  };
  const retrievProfileImage = async () => {
    const profileImage = await api.get(`/fileupload/getProfileByid/${loggedInUser.id}`)
    const proImage = profileImage.data
    const getSubCategory = localStorage.getItem('leftmenu')
    if (getSubCategory === switchCase) {
      const images = await api.get(`/fileupload/files/profile/${switchCase}/${proImage[0].table_fk}/${proImage[0].fileName}`)
      setImage(images.request.responseURL)
    }
  }

  return (
    <div className='form-control'>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
          <input type="file" accept="image/*" onChange={selectFile} />
          </label>
          {switchCase === id && image ? <a href={image}>Download Your Uploaded Image</a> : ''}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload
