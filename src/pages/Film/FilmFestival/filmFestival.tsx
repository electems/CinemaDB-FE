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
const time = new Date().toLocaleTimeString()
const initialFilmFestivalState = {
  id: null,
  filmFestivalName: '',
  address: '',
  chairman_Headedby: '',
  aboutUs: '',
  startDate: '',
  endDate: '',
  movieTittle: '',
  movieType: '',
  genres: '',
  runTime: time,
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
  userId: null
};
interface InputData {
  id,
}
const FilmFestivalRegistration: React.FC = () => {
  const [currentFile, setCurrentFile] = React.useState('');
  const [addCategory, setAddCategory] = React.useState([{ Category1: '', Category2: '' }]);
  const [director, setDirector] = React.useState([{ FirstName: '', LastName: '', Photo: '' }])
  const [writers, setWriters] = React.useState([{ FirstName: '', LastName: '', Photo: '' }])
  const [producers, setProducers] = React.useState([{ FirstName: '', LastName: '', Photo: '' }])
  const [cast, setCast] = React.useState([{ FirstName: '', LastName: '', Photo: '' }])
  const [filmFestival, setFilmFestival] = React.useState(initialFilmFestivalState);
  const [backendData, setbackendData] = React.useState([]);
  const [progress, setProgress] = React.useState(0)
  const [previewImage, setPreviewImage] = React.useState(undefined);
  const [imageName, setImageName] = React.useState<string>('');
  const inputData = useLocation().state as InputData
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
    formData.append('image', file)
    const fileUpload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: data => {
      // Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total))
      }
    })
    return fileUpload.data
  }

  const videoAndTrailerUpload = async () => {
    const formData = new FormData()
    formData.append('image', currentFile)
    const fileUpload = await api.post('/fileupload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: data => {
      // Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total))
      }
    })
    return fileUpload.data
  }
  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setImageName(event.target.files[0].name)
    setPreviewImage(event.target.files[0]);
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFilmFestival({ ...filmFestival, [name]: value });
  };
  const handleDirectorInputChange = async (e, index) => {
    let { name, value } = e.target;
    const list = [...director];
    list[index][name] = value;
    setDirector(list);
    if (name === 'Photo') {
      value = e.target.files[0]
      await fileUpload(value)
    }
  };

  const handleWriterInputChange = async (e, index) => {
    let { name, value } = e.target;
    const list = [...writers];
    list[index][name] = value;
    setWriters(list);
    if (name === 'Photo') {
      value = e.target.files[0]
      await fileUpload(value)
    }
  };

  const handleProducersInputChange = async (e, index) => {
    let { name, value } = e.target;
    const list = [...producers];
    list[index][name] = value;
    setProducers(list);
    if (name === 'Photo') {
      value = e.target.files[0]
      await fileUpload(value)
    }
  };

  const handleCastInputChange = async (e, index) => {
    let { name, value } = e.target;
    const list = [...cast];
    list[index][name] = value;
    setCast(list);
    if (name === 'Photo') {
      value = e.target.files[0]
      await fileUpload(value)
    }
  };

  const handleCategoryInput = () => {
    setAddCategory([...addCategory, { Category1: '', Category2: '' }]);
  };
  const handleDirectorInput = () => {
    setDirector([...director, { FirstName: '', LastName: '', Photo: '' }]);
  };
  const handleWritersInput = () => {
    setWriters([...writers, { FirstName: '', LastName: '', Photo: '' }]);
  };
  const handleProducersInput = () => {
    setProducers([...producers, { FirstName: '', LastName: '', Photo: '' }]);
  };

  const handleCastInput = () => {
    setCast([...cast, { FirstName: '', LastName: '', Photo: '' }]);
  };

  // Load Saved Category From Backend For Checking Person fetching using userid column in film festival table
  const loadFromBackend = async () => {
    const loadFilmFestivalFormFromBackend = await api.get(`filmfestival/${inputData.id}`)
    const responseFromBackend = await loadFilmFestivalFormFromBackend.data
    setbackendData(responseFromBackend)
    let filmFestival: typeof initialFilmFestivalState = {} as typeof initialFilmFestivalState
    responseFromBackend.map((item) => {
      filmFestival = item
      setFilmFestival(item)
    })
    setAddCategory(filmFestival.category)
    setDirector(filmFestival.directors)
    setWriters(filmFestival.writers)
    setProducers(filmFestival.producers)
    setCast(filmFestival.cast)
  }

  const saveFilmFestivalDetails = async () => {
    const filmFestivalObject: IFIlmFestival = {
      filmFestivalName: filmFestival.filmFestivalName,
      address: filmFestival.address,
      chairman_Headedby: filmFestival.chairman_Headedby,
      aboutUs: filmFestival.aboutUs,
      startDate: filmFestival.startDate,
      endDate: filmFestival.endDate,
      movieTittle: filmFestival.movieTittle,
      movieType: filmFestival.movieType,
      genres: filmFestival.genres,
      briefSynopsis: filmFestival.briefSynopsis,
      movieSpecificationMovieType: filmFestival.movieSpecificationMovieType,
      completedDate: filmFestival.completedDate,
      productionBudget: filmFestival.productionBudget,
      countryOfOrigin: filmFestival.countryOfOrigin,
      state: filmFestival.state,
      runTime: filmFestival.runTime,
      language: filmFestival.language,
      category: addCategory,
      directors: director,
      writers: writers,
      producers: producers,
      cast: cast
    }
    if (backendData.length > 0) {
      filmFestivalObject.id = inputData.id
      filmFestival.status = 'Approved'
    }
    api.post('/filmfestival/createfilmfestival', filmFestivalObject)
  }
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
                            <input name = "filmFestivalName" value = {filmFestival.filmFestivalName} onChange = {handleInputChange}type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                            <input name = "address" value = {filmFestival.address} onChange = {handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                            <input name = "startDate" value={filmFestival.startDate} onChange = {handleInputChange} type="date" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                            <input name = "chairman_Headedby" value = {filmFestival.chairman_Headedby} onChange = {handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                            <input name = "endDate" data-date-format="YYYY MM DD" onChange = {handleInputChange} type="date" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                            <input name = "aboutUs" onChange = {handleInputChange} value = {filmFestival.aboutUs} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                        className='placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={x.Category1}
                        onChange={e => handleCategoryInputChange(e, i)}
                      />
                      <input
                        className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            <input name = "movieTittle" value={filmFestival.movieTittle} onChange = {handleInputChange }type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                            <input name = "movieType" value={filmFestival.movieType} onChange = {handleInputChange }type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                            <input name = "briefSynopsis" value={filmFestival.briefSynopsis} onChange = {handleInputChange }type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                                <div className="flex flex-col gap-1.5 justify-start w-full">
                                  <Text
                                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                    variant="body26"
                                  >
                                    First Name
                                  </Text>
                                  <div className="mb-6">
                                    <input name="FirstName" value={x.FirstName} onChange={e => handleDirectorInputChange(e, i)} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                  </div>
                                </div>
                              </div>
                              <div className="flex md:flex-1 items-center justify-start w-[46%] md:w-full">
                                <div className="flex flex-col justify-start w-full">
                                  <Text
                                    className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                                    variant="body26"
                                  >
                                    Last Name
                                  </Text>
                                  <div className="mb-6">
                                    <input name="LastName" value={x.LastName} onChange={e => handleDirectorInputChange(e, i)} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                                  Photo{' '}
                                </Text>
                                  <div className="mb-6">
                                    <input name="Photo" onChange={e => handleDirectorInputChange(e, i)} type="file" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
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
                    <div className="flex flex-col gap-[41px] justify-start mb-[49px] mt-[21px] w-full">
                      <div className="flex flex-col items-center justify-start w-full">
                        <div className="flex flex-row md:gap-10 items-start justify-between w-[95%] md:w-full">
                          <Text
                            className="text-left text-white_A700 w-auto"
                            variant="body8"
                          >
                            Writer/s
                          </Text>
                          <div className="flex flex-row gap-[13px] items-start justify-start w-auto">
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
                        <Line className="bg-white_A700 h-px mt-[13px] w-full" />
                        <div className="flex md:flex-col flex-row font-roboto md:gap-[43px] items-center justify-between mt-6 w-[93%] md:w-full">
                        {writers.map((x, i) => {
                          return (
                              <div className="mb-6">
                                <input
                                  name="FirstName"
                                  className='placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={x.FirstName}
                                  onChange={e => handleWriterInputChange(e, i)}
                                />
                                <input
                                  className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  name="LastName"
                                  value={x.LastName}
                                  onChange={e => handleWriterInputChange(e, i)}
                                />
                                <input name="Photo" value = {x.Photo} type="file" onChange={e => handleWriterInputChange(e, i)} />
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
                        <div className="flex md:flex-col flex-row font-roboto gap-10 items-center justify-start ml-6 md:ml-[0] mt-6 w-[90%] md:w-full">
                          {producers.map((x, i) => {
                            return (
                              <div className="mb-6">
                                <input
                                  name="FirstName"
                                  className='placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={x.FirstName}
                                  onChange={e => handleProducersInputChange(e, i)}
                                />
                                <input
                                  className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  name="LastName"
                                  value={x.LastName}
                                  onChange={e => handleProducersInputChange(e, i)}
                                />
                                <input name="Photo" value = {x.Photo} type="file" onChange={e => handleProducersInputChange(e, i)} />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="h-[367px] relative w-full">
                    <div className="absolute bg-gray_800 flex h-full inset-[0] items-center justify-center m-auto p-[18px] w-full">
                      <div className="flex flex-col gap-10 items-start justify-start mb-8 w-[99%] md:w-full">
                        <div className="flex flex-col gap-[43px] justify-start w-full">
                          <div className="flex flex-row md:gap-10 items-start justify-between md:ml-[0] ml-[17px] w-[99%] md:w-full">
                            <Text
                              className="text-left text-white_A700 w-auto"
                              variant="body8"
                            >
                              Cast
                            </Text>
                            <div className="flex flex-row gap-[13px] items-start justify-start mt-1 w-auto">
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
                        </div>
                        {cast.map((x, i) => {
                          return (
                              <div className="mb-6">
                                <input
                                  name="FirstName"
                                  className='placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                  value={x.FirstName}
                                  onChange={e => handleCastInputChange(e, i)}
                                />
                                <input
                                  className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  name="LastName"
                                  value={x.LastName}
                                  onChange={e => handleCastInputChange(e, i)}
                                />
                                <input name="Photo" value = {x.Photo} type="file" onChange={e => handleCastInputChange(e, i)} />
                              </div>
                          );
                        })}
                      </div>
                    </div>
                    <Line className="absolute bg-white_A700 h-px inset-x-[0] mx-auto top-[19%] w-full" />
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
                    <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Movie Type
                    </Text>
                      <div className="mb-6">
                                 <input name='movieSpecificationMovieType' value = {filmFestival.movieSpecificationMovieType} onChange={handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                      </div>
                      <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                           Run Time
                    </Text>
                      <div className="mb-6">
                            <input name = 'runTime' value = {filmFestival.runTime} onChange={handleInputChange} type="time" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                      </div>
                  <div className="flex flex-col items-center justify-start mb-4 w-[95%] md:w-full">
                    <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                      </div>
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                        <div className="flex flex-col gap-1.5 justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Genres
                          </Text>
                              <div className="mb-6">
                                 <input name = "genres" value ={filmFestival.genres} onChange={handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                              </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mt-[51px] w-full">
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                      </div>
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                        <div className="flex flex-col gap-[5px] justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Completed Date (Certification Date)
                          </Text>
                            <div className="mb-6">
                                 <input name = "completedDate" onChange={handleInputChange} value ={filmFestival.completedDate} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mt-[52px] w-full">
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                        <div className="flex flex-col justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Production Budget
                          </Text>
                             <div className="mb-6">
                                 <input name = "productionBudget" value ={filmFestival.productionBudget} onChange={handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                             </div>
                        </div>
                      </div>
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                        <div className="flex flex-col justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Country of Origin
                          </Text>
                            <div className="mb-6">
                                 <input name = "countryOfOrigin" value ={filmFestival.countryOfOrigin} onChange={handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between mt-[30px] w-full">
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                        <div className="flex flex-col gap-1.5 justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            State
                          </Text>
                            <div className="mb-6">
                                 <input name = "state" value ={filmFestival.state} onChange={handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                        </div>
                      </div>
                      <div className="flex md:flex-1 items-center justify-start w-[47%] md:w-full">
                        <div className="flex flex-col justify-start w-full">
                          <Text
                            className="font-normal ml-2.5 md:ml-[0] not-italic text-left text-white_A700 w-auto"
                            variant="body26"
                          >
                            Language
                          </Text>
                            <div className="mb-6">
                                 <input name = "language" value ={filmFestival.language} onChange={handleInputChange} type="text" id="default-input" className="placeholder-red-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        {/* <Img
                          src="images/img_download.svg"
                          className="h-16 w-auto"
                          alt="download"
                        /> */}
                        <input type='file' onChange={selectFile}></input>
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
                        <Text
                          className="text-center text-white_A700 w-auto"
                          variant="body28"
                        >
                          Uploading - 1files
                        </Text>
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
                          <Img
                            src={currentFile}
                            className="h-[18px] mr-3 w-[17px]"
                            alt="Image Alt"
                            loading="lazy"
                          />
                        </div>
                        {
                          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: progress + '%' }}></div>
                          </div>}
                        {/* <Line className="bg-blue_400 h-[3px] ml-0.5 md:ml-[0] rounded-[1px] w-[62%]" /> */}
                      </div>
                      <img src={currentFile}/>
                      {/* {progress &&
                       <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                       <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: progress + '%' }}></div>
                     </div>} */}
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
                    <div className="flex flex-col items-start justify-start mb-[42px] w-[94%] md:w-full">
                      <div className="bg-gray_900 border border-blue_700_4c border-dashed flex flex-col items-center justify-end p-[31px] sm:px-5 rounded w-full">
                        <Img
                          src="images/img_download.svg"
                          className="h-16 w-auto"
                          alt="download"
                        />
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
                        <Text
                          className="text-center text-white_A700 w-auto"
                          variant="body28"
                        >
                          Uploading -1 files
                        </Text>
                      </div>
                      <div className="flex flex-col items-start justify-start mt-2.5 w-full">
                        <div className="bg-gray_800 border border-gray_303 border-solid flex flex-row items-center justify-between p-2 rounded w-full">
                          <div className="flex items-start justify-start ml-0.5 self-stretch w-auto">
                            <Text
                              className="not-italic text-center text-white_A700 w-auto"
                              variant="body32"
                            >
                              Andrew_passport.png
                            </Text>
                          </div>
                          <Img
                            src="images/img_close_gray_302.svg"
                            className="h-[18px] mr-0.5 w-[17px]"
                            alt="close"
                          />
                        </div>
                        <Line className="bg-blue_400 h-[3px] ml-0.5 md:ml-[0] rounded-[1px] w-[62%]" />
                      </div>
                      <Button className="bg-light_blue_A700_87 cursor-pointer font-bold h-12 mt-[33px] px-[15.07px] py-[9.69px] rounded text-[15.07px] text-center text-white_A700 uppercase w-[478px]">
                        Upload Files
                      </Button>
                    </div>
                  </div>
                </List>
                <Text
                  className="text-end common-pointer bg-green_A700 h-[95px] max-w-[1060px] md:max-w-full md:ml-[0] ml-[117px] mr-[88px] mt-[74px] pb-[33px] pt-[26px] sm:px-5 px-[35px] rounded text-left text-white_A700 w-full"
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
