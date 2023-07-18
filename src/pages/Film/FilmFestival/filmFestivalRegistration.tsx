/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-key */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';

import { Text, List, Img, Line, Button } from '../../../components/Elements';
import { api } from '../../../services/api';
import { useLocation } from 'react-router-dom';
import { IFIlmFestival } from '../../../types/filmfestival.types';
import './style.css'
import { toastify } from '../../../services/filmservices';
import { CloseCircleFilled } from '@ant-design/icons';
import { storage } from '../../../storage/storage';

const file = {
  fieldname: '',
  originalname: '',
  encoding: '',
  mimetype: '',
  destination: '',
  path: '',
  size: 0
}
const initialFilmFestivalState = {
  id: null,
  filmFestivalName: '',
  address: '',
  chairman_Headedby: '',
  aboutUs: '',
  start_date: '',
  end_date: '',
  movieTittle: '',
  movieType: '',
  genres: '',
  run_time: '',
  briefSynopsis: '',
  movieSpecificationMovieType: '',
  productionBudget: '',
  countryOfOrigin: '',
  completedDate: '',
  state: '',
  language: '',
  category: [],
  directors: [],
  writers: [],
  producers: [],
  cast: [],
  status: '',
  movieFile: [],
  trailer: [],
  userId: null
};

interface InputData {
  filmFestivalId,
  role
}

const hour: any = []
for (let i = 0; i < 4; i++) {
  hour.push(i);
}

const minute : any = []
for (let i = 0; i < 60; i++) {
  minute.push(i)
}

const second:any = []
for (let i = 0; i < 60; i++) {
  second.push(i)
}
const FilmFestivalRegistration: React.FC = () => {
  const [currentFile, setCurrentFile] = React.useState('');
  const [trailer, setTrailer] = React.useState('');
  const [addCategory, setAddCategory] = React.useState([{ Category1: '', Category2: '' }]);
  const [director, setDirector] = React.useState([{ FirstName: '', LastName: '', Photo: file }])
  const [writers, setWriters] = React.useState([{ FirstName: '', LastName: '', Photo: file }])
  const [producers, setProducers] = React.useState([{ FirstName: '', LastName: '', Photo: file }])
  const [cast, setCast] = React.useState([{ FirstName: '', LastName: '', Photo: file }])
  const [filmFestival, setFilmFestival] = React.useState(initialFilmFestivalState);
  const [progress, setProgress] = React.useState(0)
  const [trailerProgress, setTrailerProgress] = React.useState(0)
  const [imageName, setImageName] = React.useState<string>('');
  const [trailerName, setTrailerName] = React.useState<string>('');
  const [movieFile, setMovieFile] = React.useState([file]);
  const [trailerVideo, setTrailerVideo] = React.useState([file]);
  const [hours, setHours] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [seconds, setSeconds] = React.useState('');
  const inputData = useLocation().state as InputData
  const loggedUser = storage.getLoggedUser()
  useEffect(() => {
    if (inputData) {
      loadFromBackend()
    }
  }, [])
  const handleCategoryInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...addCategory];
    list[index][name] = value;
    setAddCategory(list);
  };

  const fileUpload = async (file) => {
    const formData = new FormData()
    formData.append('image', file);
    const upload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return upload.data
  }
  const selectMovie = (event) => {
    setCurrentFile(event.target.files[0]);
    setImageName(event.target.files[0].name)
  };

  const videoAndTrailerUpload = async () => {
    const formData = new FormData()
    formData.append('video', currentFile)
    const fileUpload = await api.post('/fileupload/file/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: data => {
      // Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total))
      }
    })
    setMovieFile([fileUpload.data])
  }
  const selectTrailer = (event) => {
    setTrailer(event.target.files[0]);
    setTrailerName(event.target.files[0].name)
  };

  const trailerUpload = async () => {
    const formData = new FormData()
    formData.append('video', trailer)
    const fileUpload = await api.post('/fileupload/file/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: data => {
      // Set the progress value to show the progress bar
        setTrailerProgress(Math.round((100 * data.loaded) / data.total))
      }
    })
    setTrailerVideo([fileUpload.data])
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFilmFestival({ ...filmFestival, [name]: value });
  };

  const handleDirectorInputChange = async (e, index) => {
    let { name, value } = e.target;
    if (name === 'Photo') {
      value = e.target.files[0]
      const data = await fileUpload(value)
      value = data
    }
    const list = [...director];
    list[index][name] = value;
    setDirector(list);
  };

  const handleWriterInputChange = async (e, index) => {
    let { name, value } = e.target;
    if (name === 'Photo') {
      value = e.target.files[0]
      const path = await fileUpload(value)
      value = path
    }
    const list = [...writers];
    list[index][name] = value;
    setWriters(list);
  };

  const handleProducersInputChange = async (e, index) => {
    let { name, value } = e.target;
    if (name === 'Photo') {
      value = e.target.files[0]
      const path = await fileUpload(value)
      value = path
    }
    const list = [...producers];
    list[index][name] = value;
    setProducers(list);
  };

  const handleCastInputChange = async (e, index) => {
    let { name, value } = e.target;
    if (name === 'Photo') {
      value = e.target.files[0]
      const path = await fileUpload(value)
      value = path
    }
    const list = [...cast];
    list[index][name] = value;
    setCast(list);
  };

  const handleCategoryInput = () => {
    setAddCategory([...addCategory, { Category1: '', Category2: '' }]);
  };
  const handleDirectorInput = () => {
    setDirector([...director, { FirstName: '', LastName: '', Photo: file }]);
  };
  const handleWritersInput = () => {
    setWriters([...writers, { FirstName: '', LastName: '', Photo: file }]);
  };
  const handleProducersInput = () => {
    setProducers([...producers, { FirstName: '', LastName: '', Photo: file }]);
  };

  const handleCastInput = () => {
    setCast([...cast, { FirstName: '', LastName: '', Photo: file }]);
  };
  const cancelMovie = () => {
    setCurrentFile('');
    setImageName('')
  };

  const cancelTrailer = () => {
    setTrailer('');
    setTrailerName('')
  };

  // Load Saved Category From Backend For Checking Person fetching using userid column in film festival table
  const loadFromBackend = async () => {
    const loadFilmFestivalFormFromBackend = await api.get(`filmfestival/${inputData.filmFestivalId}`)
    const responseFromBackend = await loadFilmFestivalFormFromBackend.data
    let filmFestival: typeof initialFilmFestivalState = {} as typeof initialFilmFestivalState
    responseFromBackend.map((item) => {
      filmFestival = item
      setFilmFestival(item)
    })
    const runTime = filmFestival.run_time.split(':')
    setHours(runTime[0])
    setMinutes(runTime[1])
    setSeconds(runTime[2])
    setAddCategory(filmFestival.category)
    setDirector(filmFestival.directors)
    setWriters(filmFestival.writers)
    setProducers(filmFestival.producers)
    setCast(filmFestival.cast)
    setMovieFile(filmFestival.movieFile)
    setTrailerVideo(filmFestival.trailer)
  }

  const saveFilmFestivalDetails = async () => {
    const filmFestivalObject: IFIlmFestival = {
      filmFestivalName: filmFestival.filmFestivalName,
      address: filmFestival.address,
      chairman_Headedby: filmFestival.chairman_Headedby,
      aboutUs: filmFestival.aboutUs,
      startDate: filmFestival.start_date,
      endDate: filmFestival.end_date,
      movieTittle: filmFestival.movieTittle,
      movieType: filmFestival.movieType,
      genres: filmFestival.genres,
      briefSynopsis: filmFestival.briefSynopsis,
      movieSpecificationMovieType: filmFestival.movieSpecificationMovieType,
      completedDate: filmFestival.completedDate,
      productionBudget: filmFestival.productionBudget,
      countryOfOrigin: filmFestival.countryOfOrigin,
      state: filmFestival.state,
      runTime: hours + ':' + minutes + ':' + seconds,
      language: filmFestival.language,
      category: addCategory,
      directors: director,
      writers: writers,
      producers: producers,
      cast: cast,
      movieFile: movieFile,
      trailer: trailerVideo,
      userId: loggedUser.id
    }
    if (inputData === null) {
      await api.post('/filmfestival/createfilmfestival', filmFestivalObject)
      await toastify('Film Festival Uploaded Successfully')
    } else {
      filmFestivalObject.id = inputData.filmFestivalId
      filmFestivalObject.status = 'APPROVED'
      await api.post('/filmfestival/createfilmfestival', filmFestivalObject)
      await toastify('Film Festival Approved By Penman Successfully')
    }
  }
  const movieType = [
    { value: 'Animation', label: 'Animation' },
    { value: 'Action', label: 'Action' },
    { value: 'Thriller', label: 'Thriller' }
  ];

  const genres = [
    { value: 'Action', label: 'Action' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Thriller', label: 'Thriller' }
  ];

  const countryOfOrigins = [
    { value: 'India', label: 'India' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Europe', label: 'Europe' }
  ]

  const states = [
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'TamilNadu', label: 'TamilNadu' },
    { value: 'AndraPradesh', label: 'AndraPradesh' }
  ]

  const handleChangeHours = event => {
    setHours(event.target.value)
  };

  const handleChangeMinutes = event => {
    setMinutes(event.target.value)
  };

  const handleChangeSeconds = event => {
    setSeconds(event.target.value)
  };

  return (
    <>
      <div className="bg-gray_900 flex font-roboto items-center justify-start mx-auto w-full">
        <div className="flex flex-col md:gap-10 gap-[75px] items-center justify-start mb-[369px] w-full">
          <div className="flex flex-col font-montserrat items-start justify-start max-w-[1265px] mx-auto md:px-5 w-full">
            <div className="flex sm:flex-col flex-row gap-[23px] items-center justify-start w-[46%] md:w-full">
              <Text
                className="bg-gray_800 flex h-[60px] items-center justify-center sm:px-5 rounded-[50%] text-center text-white_A700 w-[60px]"
                variant="body8"
              >
                1
              </Text>
              <Text
                className="text-left text-white_A700 w-auto"
                variant="body8"
              >
                Add/Register a New Film Festival{' '}
              </Text>
            </div>
            <div className="bg-gray_800 flex font-roboto items-center justify-end md:ml-[0] ml-[59px] mt-[11px] p-6 sm:px-5 w-[96%] md:w-full">
              <List
                className="flex-col gap-[15px] grid items-center w-[99%]"
                orientation="vertical"
              >
                <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                  <div className="flex md:flex-1 items-center justify-start md:mt-0 mt-0.5 w-[46%] md:w-full">
                    <div className="flex flex-col gap-1.5 justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Film Festival Name
                      </Text>
                        <div className="mb-6">
                            <input name = "filmFestivalName" value = {filmFestival.filmFestivalName} onChange = {handleInputChange}type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                        </div>
                    </div>
                  </div>
                  <div className="flex md:flex-1 items-center justify-start mb-0.5 w-[46%] md:w-full">
                    <div className="flex flex-col gap-1.5 justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Address{' '}
                      </Text>
                      <div className="mb-6">
                            <input name = "address" value = {filmFestival.address} onChange = {handleInputChange} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                  <div className="flex md:flex-1 items-center justify-start mb-[7px] w-[46%] md:w-full">
                    <div className="flex items-center justify-start w-full">
                      <div className="flex flex-col gap-1.5 justify-start w-full">
                        <Text
                          className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                          Start Date

                        </Text>
                        <div className="mb-6">
                            <input name = "start_date" value={filmFestival.start_date} onChange = {handleInputChange} type="date" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-1 items-center justify-start md:mt-0 mt-2 w-[46%] md:w-full">
                    <div className="flex flex-col justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Chairman / Headed by
                      </Text>
                       <div className="mb-6">
                            <input name = "chairman_Headedby" value = {filmFestival.chairman_Headedby} onChange = {handleInputChange} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                  <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                    <div className="flex items-center justify-start w-full">
                      <div className="flex flex-col gap-1.5 justify-start w-full">
                        <Text
                          className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                          End Date
                        </Text>
                        <div className="mb-6">
                            <input name = "end_date" value={filmFestival.end_date} onChange = {handleInputChange} type="date" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                    <div className="flex flex-col gap-1.5 justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        About us
                      </Text>
                       <div className="mb-6">
                            <input name = "aboutUs" onChange = {handleInputChange} value = {filmFestival.aboutUs} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </List>
            </div>
            <div className="flex flex-row font-montserrat gap-[23px] items-center justify-start mt-[39px] w-[23%] md:w-full">
              <Text
                className="bg-gray_800 flex h-[60px] items-center justify-center sm:pl-5 rounded-[50%] text-center text-white_A700 w-[60px]"
                variant="body8"
              >
                2
              </Text>
              <Text
                className="text-left text-white_A700 w-auto"
                variant="body8"
              >
                Add Category
              </Text>
            </div>
            <div className="bg-gray_800 flex font-montserrat items-center justify-start md:ml-[0] ml-[59px] mt-[11px] p-[21px] sm:px-5 w-[96%] md:w-full">
              <Text
                className="font-bold text-left text-white_A700 w-auto"
                variant="body11"
              >
                +
              </Text>
              <Text
                className="font-normal not-italic text-left text-white_A700 w-auto"
                variant="body13"
                onClick={handleCategoryInput}

              >
                Add a Category
              </Text>
              <div>
                {addCategory.map((x, i) => {
                  return (
                    <div className="mb-6">
                      <input
                        name="Category1"
                        className='text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5'
                        value={x.Category1}
                        onChange={e => handleCategoryInputChange(e, i)}
                      />
                      <input
                        className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"
                        name="Category2"
                        value={x.Category2}
                        onChange={e => handleCategoryInputChange(e, i)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex font-montserrat items-center justify-start mt-[27px] w-full">
              <div className="flex flex-col justify-start w-full">
                <div className="flex flex-row gap-6 items-center justify-start w-[28%] md:w-full">
                  <Text
                    className="bg-gray_800 flex h-[60px] items-center justify-center sm:pl-5 rounded-[50%] text-center text-white_A700 w-[60px]"
                    variant="body8"
                  >
                    3
                  </Text>
                  <Text
                    className="text-left text-white_A700 w-auto"
                    variant="body8"
                  >
                    Movie Information
                  </Text>
                </div>
                <div className="bg-gray_800 flex font-roboto items-center justify-start md:ml-[0] ml-[59px] mr-0.5 mt-[11px] p-[26px] sm:px-5 w-[96%] md:w-full">
                  <div className="flex flex-col gap-[41px] items-start justify-start mb-[13px] w-[99%] md:w-full">
                    <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                      <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                        <div className="flex flex-col gap-1.5 justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Movie Tittle
                          </Text>
                          <div className="mb-6">
                            <input name = "movieTittle" value={filmFestival.movieTittle} onChange = {handleInputChange }type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                        <div className="flex flex-col justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Movie Type
                          </Text>
                          <div className="mb-6">
                            <select className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5" placeholder="Please select your role" name='movieType' onChange={handleInputChange} value={filmFestival.movieType}>
                              {genres.map(item => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-[46%] md:w-full">
                      <div className="flex flex-col justify-start w-full">
                        <Text
                          className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                          Brief Synopsis{' '}
                        </Text>
                          <div className="mb-6">
                            <input name = "briefSynopsis" value={filmFestival.briefSynopsis} onChange = {handleInputChange }type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row font-montserrat gap-6 items-center justify-start mt-[11px] w-[15%] md:w-full">
                  <Text
                    className="bg-gray_800 flex h-[60px] items-center justify-center rounded-[50%] text-center text-white_A700 w-[60px]"
                    variant="body8"
                  >
                    4
                  </Text>
                  <Text
                    className="text-left text-white_A700 w-auto"
                    variant="body8"
                  >
                    Credits
                  </Text>
                </div>
                <List
                  className="flex-col font-montserrat gap-[50px] grid md:ml-[0] ml-[59px] mt-4 w-[96%]"
                  orientation="vertical"
                >
                  <div className="bg-gray_800 flex items-center justify-start w-full">
                    <div className="flex flex-col gap-[41px] justify-start mb-[50px] mt-[17px] w-full">
                      <div className="flex flex-col justify-start w-full">
                        <div className="flex flex-row md:gap-10 items-end justify-between md:ml-[0] ml-[41px] w-[95%] md:w-full">
                          <Text
                            className="text-left text-white_A700 w-auto"
                            variant="body8"
                          >
                            Director/s
                          </Text>
                          <div className="flex flex-row gap-[13px] items-start justify-start mt-[5px] w-auto">
                            <Text
                              className="font-bold text-left text-white_A700 w-auto"
                              variant="body11"
                            >
                              +
                            </Text>
                            <Text
                              className="font-normal not-italic text-left text-white_A700 w-auto"
                              variant="body13"
                              onClick={handleDirectorInput}
                            >
                              Add a Person
                            </Text>
                          </div>
                        </div>
                        <Line className="bg-white_A700 h-px mt-[17px] w-full" />
                        <div>
                        {director.map((x, i) => {
                          return (
                            <div className="flex flex-col gap-[41px] items-start justify-start mb-[13px] w-[99%] md:w-full">
                              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                                <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="mt-6 ml-6 flex flex-col gap-1.5 justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      First Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="FirstName" value={x.FirstName} onChange={e => handleDirectorInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-6 flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="flex flex-col justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      Last Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="LastName" value={x.LastName} onChange={e => handleDirectorInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-6 flex items-center justify-start w-[46%] md:w-full">
                                <div className="flex flex-col justify-start w-full">
                                  <Text
                                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                    variant="body26"
                                  >
                                    Photo{' '}
                                  </Text>
                                  <div className="mb-6">

                                    <input name="Photo" onChange={e => handleDirectorInputChange(e, i)} type="file" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    {inputData ? <label className='text-white' htmlFor="file">Selected Picture : {x.Photo.path}</label> : ''}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray_800 flex items-center justify-start w-full">
                    <div className="flex flex-col gap-[41px] justify-start mb-[50px] mt-[17px] w-full">
                      <div className="flex flex-col justify-start w-full">
                        <div className="flex flex-row md:gap-10 items-end justify-between md:ml-[0] ml-[41px] w-[95%] md:w-full">
                          <Text
                            className="text-left text-white_A700 w-auto"
                            variant="body8"
                          >
                            Writer/s
                          </Text>
                          <div className="flex flex-row gap-[13px] items-start justify-start mt-[5px] w-auto">
                            <Text
                              className="font-bold text-left text-white_A700 w-auto"
                              variant="body11"
                            >
                              +
                            </Text>
                            <Text
                              className="font-normal not-italic text-left text-white_A700 w-auto"
                              variant="body13"
                              onClick={handleWritersInput}
                            >
                              Add a Person
                            </Text>
                          </div>
                        </div>
                        <Line className="bg-white_A700 h-px mt-[17px] w-full" />
                        <div>
                        {writers.map((x, i) => {
                          return (
                            <div className="flex flex-col gap-[41px] items-start justify-start mb-[13px] w-[99%] md:w-full">
                              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                                <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="mt-6 ml-6 flex flex-col gap-1.5 justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      First Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="FirstName" value={x.FirstName} onChange={e => handleWriterInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-6 flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="flex flex-col justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      Last Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="LastName" value={x.LastName} onChange={e => handleWriterInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-6 flex items-center justify-start w-[46%] md:w-full">
                                <div className="flex flex-col justify-start w-full">
                                  <Text
                                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                    variant="body26"
                                  >
                                    Photo{' '}
                                  </Text>
                                  <div className="mb-6">

                                    <input name="Photo" onChange={e => handleWriterInputChange(e, i)} type="file" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    {inputData ? <label className='text-white' htmlFor="file">Selected Picture : {x.Photo.path}</label> : ''}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray_800 flex items-center justify-start w-full">
                    <div className="flex flex-col gap-[41px] justify-start mb-[50px] mt-[17px] w-full">
                      <div className="flex flex-col justify-start w-full">
                        <div className="flex flex-row md:gap-10 items-end justify-between md:ml-[0] ml-[41px] w-[95%] md:w-full">
                          <Text
                            className="text-left text-white_A700 w-auto"
                            variant="body8"
                          >
                            Producer/s
                          </Text>
                          <div className="flex flex-row gap-[13px] items-start justify-start mt-[5px] w-auto">
                            <Text
                              className="font-bold text-left text-white_A700 w-auto"
                              variant="body11"
                            >
                              +
                            </Text>
                            <Text
                              className="font-normal not-italic text-left text-white_A700 w-auto"
                              variant="body13"
                              onClick={handleProducersInput}
                            >
                              Add a Person
                            </Text>
                          </div>
                        </div>
                        <Line className="bg-white_A700 h-px mt-[17px] w-full" />
                        <div>
                        {producers.map((x, i) => {
                          return (
                            <div className="flex flex-col gap-[41px] items-start justify-start mb-[13px] w-[99%] md:w-full">
                              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                                <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="mt-6 ml-6 flex flex-col gap-1.5 justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      First Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="FirstName" value={x.FirstName} onChange={e => handleProducersInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-6 flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="flex flex-col justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      Last Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="LastName" value={x.LastName} onChange={e => handleProducersInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-6 flex items-center justify-start w-[46%] md:w-full">
                                <div className="flex flex-col justify-start w-full">
                                  <Text
                                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                    variant="body26"
                                  >
                                    Photo{' '}
                                  </Text>
                                  <div className="mb-6">

                                    <input name="Photo" onChange={e => handleProducersInputChange(e, i)} type="file" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    {inputData ? <label className='text-white' htmlFor="file">Selected Picture : {x.Photo.path}</label> : ''}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </div>
                <div className="bg-gray_800 flex items-center justify-start w-full">
                    <div className="flex flex-col gap-[41px] justify-start mb-[50px] mt-[17px] w-full">
                      <div className="flex flex-col justify-start w-full">
                        <div className="flex flex-row md:gap-10 items-end justify-between md:ml-[0] ml-[41px] w-[95%] md:w-full">
                          <Text
                            className="text-left text-white_A700 w-auto"
                            variant="body8"
                          >
                            Cast
                          </Text>
                          <div className="flex flex-row gap-[13px] items-start justify-start mt-[5px] w-auto">
                            <Text
                              className="font-bold text-left text-white_A700 w-auto"
                              variant="body11"
                            >
                              +
                            </Text>
                            <Text
                              className="font-normal not-italic text-left text-white_A700 w-auto"
                              variant="body13"
                              onClick={handleCastInput}
                            >
                              Add a Person
                            </Text>
                          </div>
                        </div>
                        <Line className="bg-white_A700 h-px mt-[17px] w-full" />
                        <div>
                        {cast.map((x, i) => {
                          return (
                            <div className="flex flex-col gap-[41px] items-start justify-start mb-[13px] w-[99%] md:w-full">
                              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                                <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="mt-6 ml-6 flex flex-col gap-1.5 justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      First Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="FirstName" value={x.FirstName} onChange={e => handleCastInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-6 flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                  <div className="flex flex-col justify-start w-full">
                                    <Text
                                      className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                      variant="body26"
                                    >
                                      Last Name
                                    </Text>
                                    <div className="mb-6">
                                      <input name="LastName" value={x.LastName} onChange={e => handleCastInputChange(e, i)} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-6 flex items-center justify-start w-[46%] md:w-full">
                                <div className="flex flex-col justify-start w-full">
                                  <Text
                                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                    variant="body26"
                                  >
                                    Photo{' '}
                                  </Text>
                                  <div className="mb-6">

                                    <input name="Photo" onChange={e => handleCastInputChange(e, i)} type="file" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                                    {inputData ? <label className='text-white' htmlFor="file">Selected Picture : {x.Photo.path}</label> : ''}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </div>
                </List>
                <div className="flex sm:flex-col flex-row font-montserrat gap-6 items-center justify-start mt-10 w-[31%] md:w-full">
                  <Text
                    className="bg-gray_800 flex h-[60px] items-center justify-center sm:px-5 rounded-[50%] text-center text-white_A700 w-[60px]"
                    variant="body8"
                  >
                    5
                  </Text>
                  <Text
                    className="text-left text-white_A700 w-auto"
                    variant="body8"
                  >
                    Movie Specifications
                  </Text>
                </div>
                <div className="bg-gray_800 flex font-roboto items-center justify-start md:ml-[0] ml-[47px] mt-[19px] p-3 w-[97%] md:w-full">
                  <List
                className="flex-col gap-[15px] grid items-center w-[99%]"
                orientation="vertical"
              >
                <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                  <div className="flex md:flex-1 items-center justify-start md:mt-0 mt-0.5 w-[46%] md:w-full">
                    <div className="mt-6 flex flex-col gap-1.5 justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                         Movie Type
                      </Text>
                        <div>
                          <select className = "text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5" placeholder="Please select your role" name='movieSpecificationMovieType' onChange={handleInputChange} value={filmFestival.movieSpecificationMovieType}>
                            {movieType.map(item => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                    </div>
                  </div>
                  <div className="flex md:flex-1 items-center justify-start mb-0.5 w-[46%] md:w-full">
                    <div className="mt-6 flex flex-col gap-1.5 justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Genres{' '}
                      </Text>
                      <div>
                        <select className = "text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5" placeholder="Please select your role" name='genres' onChange={handleInputChange} value={filmFestival.genres}>
                        <option disabled={true} value="">
                         --Choose Genere--
                        </option>
                          {genres.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                  <div className="flex md:flex-1 items-center justify-start mb-[7px] w-[46%] md:w-full">
                    <div className="flex items-center justify-start w-full">
                      <div className="mt-6 lex flex-col gap-1.5 justify-start w-full">
                        <Text
                          className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                          Run Time
                        </Text>
                        <div className="container">
                        <div className="row">
                        <div className="col-md">
                        <select onChange={handleChangeHours} value={hours} className = "text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-100 p-2.5" placeholder="Please select your role" name='hours' >
                        <option value="">
                         Hours
                        </option>
                        {hour.map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                        </select>
                        </div>
                        <div className="col-md">
                        <select onChange={handleChangeMinutes} value={minutes} className = "text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-100 p-2.5" placeholder="Please select your role" name='minutes' >
                        <option value="">
                         Minutes
                        </option>
                        {minute.map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                        </select>
                        </div>
                        <div className="col-md">
                        <select onChange={handleChangeSeconds} value={seconds} className = "text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-100 p-2.5" placeholder="Please select your role" name='seconds' >
                        <option value="">
                         Seconds
                        </option>
                        {second.map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                        </select>
                        </div>
                        </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-1 items-center justify-start md:mt-0 mt-2 w-[46%] md:w-full">
                    <div className="mt-6 flex flex-col justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                      Completed Date (Certification Date)
                      </Text>
                       <div>
                          <input name = "completedDate" value = {filmFestival.completedDate} onChange = {handleInputChange} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                  <div className="flex md:flex-1 items-center justify-start mb-[7px] w-[46%] md:w-full">
                    <div className="flex items-center justify-start w-full">
                      <div className="flex flex-col gap-1.5 justify-start w-full">
                        <Text
                          className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                          Production Budget
                        </Text>
                        <div className="mb-6">
                            <input name = "productionBudget" value={filmFestival.productionBudget} onChange = {handleInputChange} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-1 items-center justify-start md:mt-0 mt-2 w-[46%] md:w-full">
                    <div className="flex flex-col justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                      Country of Origin
                      </Text>
                       <div>
                       <select className = "text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5" placeholder="Please select your role" name='countryOfOrigin' onChange={handleInputChange} value={filmFestival.countryOfOrigin}>
                          {countryOfOrigins.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                          ))}
                        </select>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                  <div className="flex md:flex-1 items-center justify-start mb-[7px] w-[46%] md:w-full">
                    <div className="flex items-center justify-start w-full">
                      <div className="flex flex-col gap-1.5 justify-start w-full">
                        <Text
                          className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                         State
                        </Text>
                        <div>
                        <select className = "text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5" placeholder="Please select your role" name='state' onChange={handleInputChange} value={filmFestival.state}>
                          {states.map(item => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                          ))}
                        </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-1 items-center justify-start md:mt-0 mt-2 w-[46%] md:w-full">
                    <div className="flex flex-col justify-start w-full">
                      <Text
                        className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Language
                      </Text>
                       <div className="mb-6">
                            <input name = "language" value = {filmFestival.language} onChange = {handleInputChange} type="text" id="default-input" className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5"></input>
                       </div>
                    </div>
                  </div>
                </div>
              </List>
                </div>
                <div className="flex sm:flex-col flex-row font-montserrat gap-6 items-center justify-start ml-0.5 md:ml-[0] mt-[70px] w-[32%] md:w-full">
                  <Text
                    className="bg-gray_800 flex h-[60px] items-center justify-center sm:px-5 rounded-[50%] text-center text-white_A700 w-[60px]"
                    variant="body8"
                  >
                    6
                  </Text>
                  <Text
                    className="text-left text-white_A700 w-auto"
                    variant="body8"
                  >
                    Movie File for Upload
                  </Text>
                </div>
                <List
                  className="sm:flex-col flex-row font-mulish gap-[29px] grid md:grid-cols-1 grid-cols-2 md:ml-[0] ml-[66px] mt-[30px] w-[95%]"
                  orientation="horizontal"
                >
                  <div className="bg-gray_800 flex flex-col gap-[23px] justify-start p-[43px] md:px-10 sm:px-5 rounded shadow-bs7 w-full">
                    <Text
                      className="md:ml-[0] ml-[118px] text-center text-white_A700 w-auto"
                      variant="body12"
                    >
                      Upload Movie File
                    </Text>
                    <div className="flex flex-col items-start justify-start mb-[33px] mx-auto w-[97%] md:w-full">
                      <div className="bg-gray_900 border border-blue_700_4c border-dashed flex flex-col items-center justify-end p-[31px] sm:px-5 rounded w-full">
                        <img
                          src="/images/img_download.svg"
                          className="h-16 w-auto"
                          alt="download"
                        />
                        <input type='file' onChange={selectMovie}></input>
                        <div className="flex items-start justify-start mt-[21px] p-[5.38px] self-stretch w-auto">
                          <Text
                            className="text-center text-white_A700 w-auto"
                            variant="body25"
                          ></Text>
                        </div>
                        <div className="flex items-start justify-start p-[5.38px] self-stretch w-auto">
                          <Text
                            className="not-italic text-center text-white_A700 w-auto"
                            variant="body32"
                          >
                            Supported formates: MP4, AI, Word, PPT
                          </Text>
                        </div>
                      </div>
                      <div className="flex h-[19px] md:h-auto items-start justify-start mt-[21px] w-[146px]">
                      {progress === 100
                        ? <Text
                       className="text-center text-white_A700 w-auto"
                       variant="body28"
                        >
                        Uploaded
                      </Text>
                        : <Text
                       className="text-center text-white_A700 w-auto"
                       variant="body28"
                        >
                        Uploading - 1files
                       </Text>}
                      </div>
                      <div className="flex flex-col items-start justify-start mt-2.5 w-full">
                        <div className="bg-gray_800 border border-gray_303 border-solid flex flex-row items-center justify-between p-2 rounded w-full">
                          <div className="flex items-start justify-start ml-0.5 self-stretch w-auto">
                            <Text
                              className="not-italic text-center text-white_A700 w-auto"
                              variant="body32"
                            >
                              { imageName }
                            </Text>
                          </div>
                          <CloseCircleFilled
                          onClick={cancelMovie}
                           className="h-[18px] mr-3 w-[17px]" />
                        </div>
                          {
                          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="bg-blue-600 text-xs font-medium text- blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: progress + '%' }}></div>
                          </div>
                          }
                      </div>
                      {movieFile
                        ? <> {movieFile.map((x) => {
                          return (
                            <label className='text-white' htmlFor="file">Selected Video : {x.path}</label>
                          );
                        })} </>
                        : <label className='text-white' htmlFor="file">No Movie Selected</label>
                        }
                      <Button onClick={videoAndTrailerUpload} className="bg-light_blue_A700_87 cursor-pointer font-bold h-12 mt-[33px] px-[15.07px] py-[9.69px] rounded text-[15.07px] text-center text-white_A700 uppercase w-[478px]">
                        Upload Files
                      </Button>

                    </div>
                  </div>
                  <div className="bg-gray_800 flex flex-col gap-8 items-center justify-start p-[35px] sm:px-5 rounded shadow-bs7 w-full">
                    <div className="flex h-[30px] md:h-auto items-start justify-start px-[10.76px] w-[143px]">
                      <Text
                        className="text-center text-white_A700 w-auto"
                        variant="body12"
                      >
                        Add Trailer
                      </Text>
                    </div>
                    <div className="flex flex-col items-start justify-start mb-[33px] mx-auto w-[97%] md:w-full">
                      <div className="bg-gray_900 border border-blue_700_4c border-dashed flex flex-col items-center justify-end p-[31px] sm:px-5 rounded w-full">
                        <Img
                          src="/images/img_download.svg"
                          className="h-16 w-auto"
                          alt="download"
                        />
                        <input type='file' onChange={selectTrailer}></input>
                        <div className="flex items-start justify-start mt-[21px] p-[5.38px] self-stretch w-auto">
                          <Text
                            className="text-center text-white_A700 w-auto"
                            variant="body25"
                          ></Text>
                        </div>
                        <div className="flex items-start justify-start p-[5.38px] self-stretch w-auto">
                          <Text
                            className="not-italic text-center text-white_A700 w-auto"
                            variant="body32"
                          >
                            Supported formates: MP4, AI, Word, PPT
                          </Text>
                        </div>
                      </div>
                      <div className="flex h-[19px] md:h-auto items-start justify-start mt-[21px] w-[146px]">
                      {trailerProgress === 100
                        ? <Text
                       className="text-center text-white_A700 w-auto"
                       variant="body28"
                        >
                        Uploaded
                      </Text>
                        : <Text
                       className="text-center text-white_A700 w-auto"
                       variant="body28"
                        >
                        Uploading - 1files
                       </Text>}
                      </div>
                      <div className="flex flex-col items-start justify-start mt-2.5 w-full">
                        <div className="bg-gray_800 border border-gray_303 border-solid flex flex-row items-center justify-between p-2 rounded w-full">
                          <div className="flex items-start justify-start ml-0.5 self-stretch w-auto">
                            <Text
                              className="not-italic text-center text-white_A700 w-auto"
                              variant="body32"
                            >
                              { trailerName }
                            </Text>
                          </div>
                          <CloseCircleFilled
                          onClick={cancelTrailer}
                           className="h-[18px] mr-3 w-[17px]" />
                        </div>
                         {
                          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: trailerProgress + '%' }}></div>
                          </div>
                         }
                      </div>
                       {trailerVideo
                         ? <> {trailerVideo.map((x) => {
                           return (
                            <label className='text-white' htmlFor="file">Selected Video : {x.path}</label>
                           );
                         })} </>
                         : <label className='text-white' htmlFor="file">No Movie Selected</label>
                        }
                      <Button onClick={trailerUpload} className="bg-light_blue_A700_87 cursor-pointer font-bold h-12 mt-[33px] px-[15.07px] py-[9.69px] rounded text-[15.07px] text-center text-white_A700 uppercase w-[478px]">
                        Upload Files
                      </Button>

                    </div>
                  </div>
                </List>
                <Text
                  className="cursor-pointer bg-green_A700 h-[95px] max-w-[1060px] md:max-w-full md:ml-[0] ml-[117px] mr-[88px] mt-[74px] pb-[33px] pt-[26px] sm:px-5 px-[35px] rounded text-center text-white_A700 w-full"
                  variant="body8"
                  onClick={saveFilmFestivalDetails}
                >
                  Save now
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmFestivalRegistration;
