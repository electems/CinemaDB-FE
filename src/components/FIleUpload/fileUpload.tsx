import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { IFile } from '../../types/file.types';
const file = {
  id: '',
  fieldname: '',
  filename: '',
  originalname: '',
  encoding: '',
  mimetype: '',
  destination: '',
  path: '',
  size: 0
}
const ImageUpload = () => {
  const [currentFile, setCurrentFile] = useState('');
  const [movieFile, setMovieFile] = React.useState(file);
  useEffect(() => {
  }, []);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
  };

  const upload = async () => {
    const formData = new FormData()
    formData.append('image', currentFile)
    const fileUpload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    setMovieFile(fileUpload.data)
  };

  return (
    <div className='form-control'>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="text" id="fileName" className="form-control" value={JSON.stringify(movieFile)} />
            <input type="file" accept="image/*" onChange={selectFile} />
          </label>
        </div>
        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload
