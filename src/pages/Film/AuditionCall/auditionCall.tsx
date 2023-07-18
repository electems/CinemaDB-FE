/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';

import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { Text, Img, Button } from '../../../components/Elements';
import Footer from '../../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { storage } from '../../../storage/storage';
import { Modal } from 'react-bootstrap'
import { debounceTime } from 'rxjs/operators'
import { Subject } from 'rxjs'
import Pagination from './pagination';
import { LayoutGrid, List } from 'tabler-icons-react'
import { returnUniqueData } from '../../../services/filmservices'

const AuditionsCall: React.FC = () => {
  const [isShow, invokeModal] = React.useState(false)
  const [images, setImages] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [gridsView, setGridsView] = React.useState(true);
  const [listsView, setListsView] = React.useState(false);
  const [postsPerPage] = React.useState(6);
  const navigate = useNavigate();
  const [activeLastWeekAuditions, setActiveLastWeekAuditions] = React.useState(false)
  const [activeThisWeekAuditions, setActiveThisWeekAuditions] = React.useState(false)
  const [activeThisMonthAuditions, setActiveThisMonthAuditions] = React.useState(false)
  const loggedUser = storage.getLoggedUser()
  const lastWeekAudition = 'Last_Week_Auditions'
  const thisWeekAudition = 'This_week_Auditions'
  const thisMonthAudition = 'This_Month_Auditions'

  useEffect(() => {
    retriveBasedOnThisWeekAuditions()
  }, [])

  const retriveAllImages = async () => {
    let files: any = []
    if (loggedUser.role === 'PERSON') {
      const allFiles = await api.get(`/fileupload/auditionsposters/${loggedUser.id}`)
      files = allFiles.data
    }
    if (loggedUser.role === 'LOVER') {
      const allFiles = await api.get('/fileupload/auditionspostersforlovers')
      files = allFiles.data
    }
    return files
  }

  const retriveMovies = async () => {
    const movies = await api.get('userprofession/movies/auditionmovies/lovers')
    const response = await movies.data
    return response
  }

  const subject = new Subject();
  subject
    .asObservable()
    .pipe(debounceTime(100))
    .subscribe(data => {
      retriveBasedOnSearchString(data)
    })
  const onKeyUp = event => {
    subject.next(event.target.value)
  }

  const retriveBasedOnSearchString = async (searchString: any) => {
    if (searchString.length > 0) {
      const movies = await api.get(`auditioncall/search/${searchString}`)
      const auditionResponse = await movies.data
      const movieResponse = await retriveMovies()
      const movieHasAudition: any = [];
      const moviesWithImages: any = [];
      const imagesNames: any = []
      auditionResponse.forEach(arr1Obj => {
        const matchedObject = movieResponse.find(arr2Obj => arr2Obj.id === arr1Obj.movieFk);
        if (matchedObject) {
          movieHasAudition.push(matchedObject);
        }
      })
      const getOnlyUniqueDatas = await returnUniqueData(movieHasAudition)
      const imageResponse = await retriveAllImages()
      getOnlyUniqueDatas.forEach(arr1Obj => {
        const matchedObject = imageResponse.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
        if (matchedObject) {
          moviesWithImages.push(matchedObject);
        }
      })
      moviesWithImages.map(async (item) => {
        imagesNames.push(item.fileName)
      })
      await retriveImageUrls(imagesNames)
    } if (searchString.length === 0) {
      if (activeLastWeekAuditions === true) {
        await retriveBasedOnLastWeekAuditions()
      }
      if (activeThisWeekAuditions === true) {
        await retriveBasedOnThisWeekAuditions()
      }
      if (activeThisMonthAuditions === true) {
        await retriveBasedOnThisMonthAuditions()
      }
    }
  }

  const retriveBasedOnThisWeekAuditions = async () => {
    setActiveThisWeekAuditions(true)
    const auditions = await api.get(`auditioncall/getauditionbyweekandmonth/${thisWeekAudition}`)
    const auditionResponse = await auditions.data
    const getImagesFromDb = await retriveAllImages()
    const movieContainsImages: any = [];
    const imagesNames: any = []
    auditionResponse.forEach(arr1Obj => {
      const matchedObject = getImagesFromDb.find(arr2Obj => arr2Obj.table_fk === arr1Obj.id);
      if (matchedObject) {
        movieContainsImages.push(matchedObject);
      }
    })
    console.log(movieContainsImages)
    movieContainsImages.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    await retriveImageUrls(imagesNames)
  }
  // Retrive Pictures Urls To Display
  const retriveImageUrls = async (name) => {
    const items: any = []
    for (let i = 0; i < name.length; i++) {
      const movies = await api.get(`/fileupload/files/profile/${name[i]}`)
      items.push(movies.request.responseURL)
    }
    setImages(items)
  }

  const retriveBasedOnThisMonthAuditions = async () => {
    const movies = await api.get(`auditioncall/getauditionbyweekandmonth/${thisMonthAudition}`)
    const auditionResponse = await movies.data
    const movieContainsImages: any = [];
    const imagesNames: any = []
    const getImagesFromDb = await retriveAllImages()
    auditionResponse.forEach(arr1Obj => {
      const matchedObject = getImagesFromDb.find(arr2Obj => arr2Obj.table_fk === arr1Obj.id);
      if (matchedObject) {
        movieContainsImages.push(matchedObject);
      }
    })
    movieContainsImages.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    await retriveImageUrls(imagesNames)
  }

  const retriveBasedOnLastWeekAuditions = async () => {
    const movies = await api.get(`auditioncall/getauditionbyweekandmonth/${lastWeekAudition}`)
    const auditionResponse = await movies.data
    const movieContainsImages: any = [];
    const imagesNames: any = []
    const getImagesFromDb = await retriveAllImages()
    auditionResponse.forEach(arr1Obj => {
      const matchedObject = getImagesFromDb.find(arr2Obj => arr2Obj.table_fk === arr1Obj.id);
      if (matchedObject) {
        movieContainsImages.push(matchedObject);
      }
    })
    movieContainsImages.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    await retriveImageUrls(imagesNames)
  }

  const onClickOfThisWeekAudition = async () => {
    setActiveThisWeekAuditions(true)
    setActiveLastWeekAuditions(false)
    setActiveThisMonthAuditions(false)
    await retriveBasedOnThisWeekAuditions()
  }

  const onClickOfLastWeekAuditions = async () => {
    setActiveLastWeekAuditions(true)
    setActiveThisWeekAuditions(false)
    setActiveThisMonthAuditions(false)
    await retriveBasedOnLastWeekAuditions()
  }

  const onClickOfThisMonthAuditions = async () => {
    setActiveThisMonthAuditions(true)
    setActiveLastWeekAuditions(false)
    setActiveThisWeekAuditions(false)
    await retriveBasedOnThisMonthAuditions()
  }

  const navigateToAuditionCall = async (item) => {
    const data = item.split('/')
    const datas = await api.get(`fileupload/filename/${data[6]}`)
    const movieName = data[6].split('.')
    const response = datas.data
    navigate('/film/auditioncall/auditioncallsinglemovie', { state: { tableId: response.tableId, movieName: movieName[0] } })
  }

  const navigateToRegistrationPage = async () => {
    if (loggedUser && loggedUser.role === 'PERSON') {
      navigate('/film/auditioncall/auditioncallregistration')
    } else {
      modalOn()
    }
  }
  const modalOn = () => {
    return invokeModal(!false)
  }

  const modalOff = () => {
    return invokeModal(false)
  }

  const listView = () => {
    setGridsView(false)
    setListsView(true)
    console.log('list View')
  }

  const gridView = () => {
    setGridsView(true)
    setListsView(false)
    console.log('GridView')
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = images.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
        <>
      <div className="bg-gray_900 flex font-roboto items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
          <div className="flex md:flex-col font-montserrat md:gap-10 items-start justify-between max-w-[1176px] mt-[19px] mx-auto md:px-5 w-full">
            <Text
              className="font-bold text-amber_A400 text-left w-auto"
              variant="body11"
            >
              Audition Call
            </Text>
            <Button
              className="w-screen common-pointer bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[189px] py-[13px] rounded text-base text-center text-white_A700 w-auto"
              onClick={navigateToRegistrationPage}
            >
              Create New Audition Call
            </Button>
          </div>
          <div className="flex md:flex-col md:w-auto md:gap-10 items-start font-montserrat md:gap-5 items-start justify-end mt-[29px] md:w-full py-[13px]" style={{ marginRight: '80px' }}>
            <div
              className="form-field">
                <input className = "rounded text-base no-outline bg-bluegray_100 bg-cover bg-no-repeat flex h-7 items-end justify-end md:mt-0 mt-[5px]" type='text' onKeyUp={onKeyUp}/>
                <i className="fa fa-search absolute top-2 right-2 mt-1 mr-3" aria-hidden="true"></i>
            </div>
            <Button onClick={onClickOfLastWeekAuditions} className={activeLastWeekAuditions ? 'bg-red_A700 cursor-pointer font-normal leading-[normal] min-w-[214px] ml-6 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700' : 'bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[198px] ml-7 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto'}>
              Last Week Auditions
            </Button>
            <Button onClick={onClickOfThisWeekAudition} className={activeThisWeekAuditions ? 'bg-red_A700 cursor-pointer font-normal leading-[normal] min-w-[214px] ml-6 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto' : 'bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[198px] ml-7 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto'}>
              This week Auditions
            </Button>
            <Button onClick={onClickOfThisMonthAuditions} className={activeThisMonthAuditions ? 'bg-red_A700 cursor-pointer font-normal leading-[normal] min-w-[214px] ml-6 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto' : 'bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[198px] ml-7 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto'}>
                This month Auditions
            </Button>
            <LayoutGrid
              size={30}
              strokeWidth={2}
              className='cursor-pointer mt-0.5 ml-3'
              color={'#FFFFFF'}
              onClick ={gridView}
            />
            <List
              size={30}
              strokeWidth={2}
              className='cursor-pointer mt-0.5 ml-3'
              color={'#FFFFFF'}
              onClick ={listView}
            />
          </div>
          { gridsView
            ? <div className="md:gap-5 gap-[29px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center max-w-[1180px] min-h-[auto] mt-[31px] mx-auto md:px-5 w-full">
            {currentPosts.map((item) => {
              return (
              <>
              <Img
                src={item}
                className="flex-1 h-[455px] md:h-auto object-cover w-full"
                alt="rectangle"
                onClick={() => navigateToAuditionCall(item)}
            />
              </>
              )
            })}
          </div>
            : ''}
          { listsView
            ? <div className="grid gap-4 grid-cols-0 justify-center max-w-[500px] min-h-[auto] mt-[31px] mx-auto">
            {currentPosts.map((item) => {
              return (
              <>
              <Img
                src={item}
                className="flex-1 h-[455px] md:h-auto object-cover w-full"
                alt="rectangle"
                onClick={() => navigateToAuditionCall(item)}
            />
              </>
              )
            })}
          </div>
            : ''}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={images.length}
            paginate={paginate}
          />
          <Modal show={isShow} onHide={() => modalOn()}>
            <Modal.Body>You are not registered as film person so you cannot create audition</Modal.Body>
            <Button onClick={() => modalOff()}>OK</Button>
          </Modal>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[72px] md:px-5 w-full" />
        </div>
      </div>
        </>
  );
};

export default AuditionsCall;
