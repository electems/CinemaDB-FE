import React, { useEffect } from 'react';

import Header from '../../../../components/MainScreenHeader/mainscreenheader';
import { Text, Button, Img } from '../../../../components/Elements/index';
import { api } from '../../../../services/api';

const Watchlist: React.FC = () => {
  const [images, setImages] = React.useState([]);
  const [activeLastWeekRelease, setActiveLastWeekRelease] = React.useState(false)
  const [activeThisWeekRelease, setActiveThisWeekRelease] = React.useState(false)
  const [activeThisMonthRelease, setActiveThisMonthRelease] = React.useState(false)
  useEffect(() => {
    retriveAllMoviesForThisWeek()
  }, [])

  const retriveImageUrls = async (name) => {
    const items: any = []
    for (let i = 0; i < name.length; i++) {
      const movies = await api.get(`/fileupload/files/profile/${name[i]}`)
      items.push(movies.request.responseURL)
    }
    return items
  }

  const retriveAllMoviePictures = async () => {
    const moviesOfMovieType = await api.get('/fileupload/getallfilesbymovietype')
    const movies = moviesOfMovieType.data
    return movies
  }

  const retriveAllMoviesForThisWeek = async () => {
    setActiveThisWeekRelease(true)
    const movieHasAudition: any = [];
    const imagesNames: any = []
    const moviesBasedOnThisWeek = await api.get('/userprofession/getmoviesbyweekmonthand30days/This_Week_Release')
    const movies = moviesBasedOnThisWeek.data
    const allMovies = await retriveAllMoviePictures()
    movies.forEach(arr1Obj => {
      const matchedObject = allMovies.find(arr2Obj => arr2Obj.tableId ===
        arr1Obj.id);
      if (matchedObject) {
        movieHasAudition.push(matchedObject, arr1Obj.value);
      }
    })
    movieHasAudition.map(async (item) => {
      if (item.fileName) {
        imagesNames.push(item.fileName)
      }
    })
    const data = await retriveImageUrls(imagesNames)
    setImages(data)
  }

  const retriveAllMoviesForLastWeek = async () => {
    const movieHasAudition: any = [];
    const imagesNames: any = []
    const moviesBasedOnThisWeek = await api.get('/userprofession/getmoviesbyweekmonthand30days/Last_Week_Release')
    const movies = moviesBasedOnThisWeek.data
    const allMovies = await retriveAllMoviePictures()
    movies.forEach(arr1Obj => {
      const matchedObject = allMovies.find(arr2Obj => arr2Obj.tableId ===
        arr1Obj.id);
      if (matchedObject) {
        movieHasAudition.push(matchedObject, arr1Obj.value);
      }
    })
    movieHasAudition.map(async (item) => {
      if (item.fileName) {
        imagesNames.push(item.fileName)
      }
    })
    const data = await retriveImageUrls(imagesNames)
    setImages(data)
  }

  const retriveAllMoviesForThisMonth = async () => {
    const movieHasAudition: any = [];
    const imagesNames: any = []
    const moviesBasedOnThisWeek = await api.get('/userprofession/getmoviesbyweekmonthand30days/This_Month_Release')
    const movies = moviesBasedOnThisWeek.data
    const allMovies = await retriveAllMoviePictures()
    movies.forEach(arr1Obj => {
      const matchedObject = allMovies.find(arr2Obj => arr2Obj.tableId ===
        arr1Obj.id);
      if (matchedObject) {
        movieHasAudition.push(matchedObject, arr1Obj.value);
      }
    })
    movieHasAudition.map(async (item) => {
      if (item.fileName) {
        imagesNames.push(item.fileName)
      }
    })
    const data = await retriveImageUrls(imagesNames)
    setImages(data)
  }
  const onClickOfThisWeekRelease = async () => {
    setActiveThisWeekRelease(true)
    setActiveLastWeekRelease(false)
    setActiveThisMonthRelease(false)
    await retriveAllMoviesForThisWeek()
  }

  const onClickOfLastWeekRelease = async () => {
    setActiveLastWeekRelease(true)
    setActiveThisWeekRelease(false)
    setActiveThisMonthRelease(false)
    await retriveAllMoviesForLastWeek()
  }

  const onClickOfThisMonthRelease = async () => {
    setActiveThisMonthRelease(true)
    setActiveThisWeekRelease(false)
    setActiveLastWeekRelease(false)
    await retriveAllMoviesForThisMonth()
  }
  return (
    <>
      <div className="bg-gray_900 flex font-roboto items-center justify-start mx-auto pb-[129px] w-full">
        <div className="flex flex-col gap-[38px] items-center justify-start w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
          <div className="flex flex-col font-montserrat justify-start max-w-[1290px] mx-auto md:px-5 w-full">
            <Text
              className="font-bold text-amber_A400 text-left w-auto"
              variant="body11"
            >
              Plan Your Entertainment
            </Text>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start ml-0.5 md:ml-[0] mt-[51px] w-[99%] md:w-full">
              <div className="flex flex-row gap-2 items-start justify-between md:mt-0 mt-[3px] w-[14%] md:w-full">
                <Text
                  className="font-bold text-left text-white_A700 w-auto"
                  variant="body22"
                >
                  Watchlist
                </Text>
                <Text
                  className="font-normal mt-0.5 not-italic text-left text-white_A700 w-auto"
                  variant="body26"
                >
                  20 Movies
                </Text>
              </div>
              <div className='flex flex-row ml-[20%]'>
              <Button onClick = {onClickOfLastWeekRelease} className= {activeLastWeekRelease ? 'bg-red_A700 cursor-pointer font-normal leading-[normal] min-w-[214px] ml-6 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto' : 'bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[198px] ml-7 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto'}>
                Last Week Release
              </Button>
              <Button onClick = {onClickOfThisWeekRelease} className={activeThisWeekRelease ? 'bg-red_A700 cursor-pointer font-normal leading-[normal] min-w-[214px] ml-6 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto' : 'bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[198px] ml-7 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto'}>
                This week Release
              </Button>
              <Button onClick = {onClickOfThisMonthRelease} className={activeThisMonthRelease ? 'bg-red_A700 cursor-pointer font-normal leading-[normal] min-w-[214px] ml-6 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto' : 'bg-gray_800 cursor-pointer font-normal leading-[normal] min-w-[198px] ml-7 md:ml-[0] not-italic py-[7px] rounded-sm text-base text-center text-white_A700 w-auto'}>
                This Month Release
              </Button>
              <div className="flex flex-row gap-3.5 items-start justify-between ml-6 md:ml-[0] w-[7%] md:w-full">
                <Img
                  src="/images/img_menu_white_a700.svg"
                  className="h-8 w-8"
                  alt="menu_Two"
                />
                <Text
                  className="font-normal mt-[3px] not-italic text-left text-white_A700 w-auto"
                  variant="body26"
                >
                  Sort
                </Text>
              </div>
              </div>
            </div>
            <Text
              className="font-normal ml-2.5 md:ml-[0] mt-[41px] not-italic text-left text-white_A700 w-auto"
              variant="body26"
            >
              Now plan how you want to be entertained using this entertainment
              kitty box. There are freebies in the kitty. Create your Kitty
              entertainment for the weeks to come.
            </Text>
            <Text
              className="font-normal ml-2.5 md:ml-[0] mt-2 not-italic text-left text-white_A700 w-auto"
              variant="body26"
            >
              Buy tickets and be the part of solving social problems by
              contributing your part while buying your favourite movie tickets.
            </Text>
            <div className="gap-3.5 md:gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] md:ml-[0] ml-[9px] mt-[51px] w-[99%]">
              {images.map((item: any) => {
                return (<>
                <div className="flex items-center justify-start w-full">
                <div className="flex items-center justify-start w-full">
                  <div className="flex flex-col gap-3.5 justify-start w-full">
                    <div className="flex flex-col gap-[13px] justify-start w-full">
                      <div className="h-[168px] relative w-full">
                        <Img
                          src={item}
                          className="h-[168px] m-auto object-cover w-full"
                          alt="rectangle518"
                        />
                        <div className="absolute bg-gray_900_7f flex h-full inset-[0] items-center justify-center m-auto p-16 md:px-10 sm:px-5 w-full">
                          <Img
                            src="/images/img_polygon1.svg"
                            className="h-[38px] rounded-sm w-auto"
                            alt="polygonOne"
                          />
                        </div>
                      </div>
                      <Text
                        className="font-medium ml-5 md:ml-[0] text-left text-white_A700 w-auto"
                        variant="body22"
                      >
                        KGF
                      </Text>
                    </div>
                    <div className="flex flex-row gap-[50px] items-start justify-start md:ml-[0] ml-[11px] w-[79%] md:w-full">
                      <Text
                        className="font-semibold text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Buy Tickets
                      </Text>
                      <Text
                        className="font-medium text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        Free Tickets{' '}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
                </>)
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
