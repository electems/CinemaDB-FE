/* eslint-disable no-undef */
import { api } from '../../services/api';

const ImageUpload = () => {
  const selectFile = async (event) => {
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    const fileUploads = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    localStorage.setItem('fileupload', JSON.stringify(fileUploads.data))
  };

  return (
    <div className='form-control'>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
          <input type="file" accept="image/*" onChange={selectFile} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload
