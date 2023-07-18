import React, { useEffect } from 'react';

import { Button, Img, Text } from '../../../components/Elements/index';
import Header from '../../../components/MainScreenHeader/mainscreenheader';
import Footer from '../../../components/Footer/footer';
import { storage } from '../../../storage/storage';
import { api } from '../../../services/api';

import { LayoutGrid, List } from 'tabler-icons-react'

import { useNavigate } from 'react-router-dom';
import { Subject } from 'rxjs';

import Pagination from '../AuditionCall/pagination';

const TrainingInstitutesPage: React.FC = () => {
  const loggedInUser = storage.getLoggedUser();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(9);
  const [isEnableCreateButton, setEnableCreateButton] = React.useState(loggedInUser.role === 'PERSON')
  const [images, setImages] = React.useState([]);
  useEffect(() => {
    retriveAllPostersOfInstitute()
  }, [])
  const trainingInstitutesPostersNames: string [] = [];
  const navigate = useNavigate();
  const [gridsView, setGridsView] = React.useState(true);
  const [listsView, setListsView] = React.useState(false);

  const retriveAllPostersOfInstitute = async () => {
    let currentUsersInstitutePosters: any
    if (loggedInUser && loggedInUser.role === 'PERSON') {
      currentUsersInstitutePosters = await api.get(`fileupload/filmInstitutePosters/${loggedInUser.id}`)
    } else {
      currentUsersInstitutePosters = await api.get('fileupload/filmInstitutePostersForLover')
    }

    console.log(currentUsersInstitutePosters.data)
    const trainingIntitutePosters = currentUsersInstitutePosters.data
    trainingIntitutePosters.map(async (poster) => {
      trainingInstitutesPostersNames.push(poster.fileName)
    })
    retriveImageUrls(trainingInstitutesPostersNames)
  }

  const retriveImageUrls = async (name) => {
    const items: any = []
    for (let i = 0; i < name.length; i++) {
      const movies = await api.get(`/fileupload/files/profile/${name[i]}`)
      items.push(movies.request.responseURL)
    }
    setImages(items)
  }

  const navigateToRegistrationPage = async () => {
    if (loggedInUser && loggedInUser.role === 'PERSON') {
      navigate('/film/filminstitutetraining/filminstituteregistration')
    }
  }

  const navigateToEventCreatePage = async () => {
    if (loggedInUser && loggedInUser.role === 'PERSON') {
      navigate('/film/filminstitutetraining/FilmTrainingInstituteEventsRegistrationForm')
    }
  }

  const subject = new Subject();

  const onKeyUp = event => {
    subject.next(event.target.value)
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

  const navigateToInstituteDetailsPage = async (item) => {
    const data = item.split('/')
    const filmInstituteRecord = await api.get(`filminsitutetraining/filmInstituteDetailsByFileName/${data[6]}`)
    const response = filmInstituteRecord.data
    navigate(`/film/filminstitutetraining/filminstitutedetails/${data[6]}`, { state: { filmInstituteId: response.id, file: item } })
  }

  // pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = images.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex md:flex-col flex-row md:gap-5 items-center justify-center md:px-5 w-full" />
          <div className="flex md:flex-col space-x-4 space-y-1 font-montserrat md:gap-7 items-top items-start justify-start max-w-[1171px] mt-10 mx-auto md:px-6 w-full">
            <Text
              className="font-bold text-lg md:text-[22px] text-amber_A400 sm:text-lg"

            >
              Film Training Institutes
            </Text>

            { isEnableCreateButton
              ? <Button
            className="border-gray-300 shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-4 bg-red_A700 cursor-pointer font-bold rounded text-white_A700"

            onClick={navigateToRegistrationPage}
          >
            Create Training Institute
          </Button>

              : ''}

           { isEnableCreateButton
             ? <Button
            className="border-gray-300 shadow-sm font-medium focus:outline-none hover:opacity-80 py-2 px-4 bg-red_A700 cursor-pointer font-bold rounded text-white_A700"

            onClick={navigateToEventCreatePage}
          >
            Create an Event
          </Button>

             : ''}

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

           <div
              className="form-field">
                <input className = "flex rounded no-outline bg-bluegray_100 bg-cover bg-no-repeat h-10 items-end justify-end md:mt-0 mt-[6px]" type='text' onKeyUp={onKeyUp}

            />
                <i className="fa fa-search absolute top-2 right-2 mt-2.5 mr-3" aria-hidden="true"></i>
            </div>
          </div>
          { gridsView
            ? <div className="md:gap-5 gap-[29px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center max-w-[1187px] min-h-[auto] mt-[35px] mx-auto md:px-5 w-full">
          { currentPosts.map((item) => {
            return (
              <>
              <Img
                src={item}
                className="cursor-pointer flex-1 h-[455px] md:h-auto object-cover w-full"
                alt="rectangle"
                onClick={() => navigateToInstituteDetailsPage(item)}
            />
              </>
            )
          })}
          </div>
            : ''}
           { listsView
             ? <div className="md:gap-5 gap-[29px] grid sm:grid-row-1 md:grid-row-2 grid-row-3 justify-center max-w-[1187px] min-h-[auto] mt-[35px] mx-auto md:px-5 w-full">
          { currentPosts.map((item) => {
            return (
              <>
              <Img
                src={item}
                className="cursor-pointer flex-1 h-[455px] md:h-auto object-cover w-full"
                alt="rectangle"
                onClick={() => navigateToInstituteDetailsPage(item)}
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
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[97px] md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default TrainingInstitutesPage;
