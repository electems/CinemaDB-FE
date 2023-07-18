/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import { api } from '../../services/api';

const MultipleUploads = () => {
  const selectFiles = async (event) => {
    const formData = new FormData()
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append('files', event.target.files[i]);
    }
    const fileUploads = await api.post('/fileupload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    localStorage.setItem('fileupload', JSON.stringify(fileUploads.data))
  };
  return (
      <div className='form-control'>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={selectFiles}
              />
            </label>
          </div>
        </div>
      </div>
  );
};

export default MultipleUploads;
