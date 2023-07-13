import React, { useEffect } from 'react';

import Header from '../../../../components/Header/header';
import { Text, Img, List, Line } from '../../../../components/Elements/index';
import Footer from '../../../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import ReactPlayer from 'react-player'
import { api } from '../../../../services/api';
import AliceCarousel from 'react-alice-carousel'

const MainScreenBeforeLogin: React.FC = () => {
  const [images, setImages] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const [activeToday, setActiveToday] = React.useState(false)
  const [activeThisWeek, setActiveThisWeek] = React.useState(false)
  const [activeLast30Days, setActiveLast30Days] = React.useState(false)
  const navigate = useNavigate();
  const Today = 'Today'
  const thisWeek = 'Last_30_Days'
  const last30Days = 'This_Week'

  useEffect(() => {
    retriveBasedOnToday()
  }, [])

  const selectOptions = [
    { value: 'option1', label: 'Option1' },
    { value: 'option2', label: 'Option2' },
    { value: 'option3', label: 'Option3' }
  ];

  const retriveAllImages = async () => {
    const allFiles = await api.get('/fileupload/getallfilesbymovietype')
    const files = allFiles.data
    return files
  }

  const onClickToday = async () => {
    setActiveToday(true)
    setActiveThisWeek(false)
    setActiveLast30Days(false)
  }

  const onClickThisWeek = async () => {
    setActiveToday(false)
    setActiveThisWeek(true)
    setActiveLast30Days(false)
    await retriveBasedOnThisWeek()
  }

  const onClickLast30Days = async () => {
    setActiveToday(false)
    setActiveThisWeek(false)
    setActiveLast30Days(true)
    await retriveBasedOnLast30Days()
  }

  const retriveBasedOnToday = async () => {
    setActiveToday(true)
    const allFiles = await api.get(`/userprofession/getmoviesbyweekmonthand30days/${Today}`)
    const files = allFiles.data
    const movieResponse = await retriveAllImages()
    const imagesOfMovies: any = [];
    files.forEach(arr1Obj => {
      const matchedObject = movieResponse.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
      if (matchedObject) {
        imagesOfMovies.push(matchedObject);
      }
    })
    await retriveImageUrls(imagesOfMovies)
  }

  const retriveBasedOnThisWeek = async () => {
    const allFiles = await api.get(`/userprofession/getmoviesbyweekmonthand30days/${thisWeek}`)
    const files = allFiles.data
    const movieResponse = await retriveAllImages()
    const imagesOfMovies: any = [];
    files.forEach(arr1Obj => {
      const matchedObject = movieResponse.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
      if (matchedObject) {
        imagesOfMovies.push(matchedObject);
      }
    })
    await retriveImageUrls(imagesOfMovies)
  }

  const retriveBasedOnLast30Days = async () => {
    const allFiles = await api.get(`/userprofession/getmoviesbyweekmonthand30days/${last30Days}`)
    const files = allFiles.data
    const movieResponse = await retriveAllImages()
    const imagesOfMovies: any = [];
    files.forEach(arr1Obj => {
      const matchedObject = movieResponse.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
      if (matchedObject) {
        imagesOfMovies.push(matchedObject);
      }
    })
    await retriveImageUrls(imagesOfMovies)
  }

  const retriveImageUrls = async (name) => {
    const items: any = []
    for (let i = 0; i < name.length; i++) {
      const movies = await api.get(`/fileupload/files/profile/${name[i].fileName}`)
      const split = name[i].fileName.split('.');
      items.push({
        urls: movies.request.responseURL,
        name: split[0]
      })
    }
    console.log(items)
    setImages(items)
  }

  const onExpandOfImage = async () => {
    setExpand(true)
  }
  const handleDragStart = (e) => e.preventDefault();

  const items = images.map((carosual: any) => {
    return (
      <>
      <Img
      src={carosual.urls}
      onDragStart={handleDragStart}
      className="h-[736px] m-auto object-cover w-full"
      alt="rectangle514"
    />
    </>
    )
  })
  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto items-center justify-start mx-auto pt-0.5 w-full">
        <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        <div className="flex flex-col items-center justify-start max-w-[1323px] mt-[18px] mx-auto md:px-5 w-full">
          <div className="flex font-montserrat items-center justify-start w-[99%] md:w-full">
            <div className="bg-gray_800 flex sm:flex-col flex-row gap-7 items-center justify-start p-[17px] rounded w-full">
              <Text
                className="font-bold ml-2 sm:ml-[0] text-amber_A400 text-left w-auto"
                variant="body22"
              >
                CinemaDBS Updates :
              </Text>
              <Text
                className="font-bold text-left text-white_A700 w-auto"
                variant="body22"
              >
                Kanthara Movie Is Now Streaming on CinemaDBS OTT
              </Text>
            </div>
          </div>
          <div className="h-[736px] md:h-[746px] sm:h-[782px] mt-2.5 relative w-[99%] md:w-full">
               <AliceCarousel
             mouseTracking
             disableButtonsControls
             items={items}
             disableDotsControls
             autoPlay
              />
            <div className="absolute bottom-[2%] gap-2 grid sm:grid-cols-1 grid-cols-10 md:grid-cols-5 inset-x-[0] items-center justify-start mx-auto w-[98%]">
            </div>
          </div>
          <div className="flex md:flex-col flex-row font-montserrat md:gap-5 items-start justify-start mt-[21px] w-[97%] md:w-full">
            <Text
              className="font-semibold md:mt-0 mt-[9px] text-left text-red_A700 w-auto"
              variant="body22"
            >
              <span onClick={onClickToday} className={activeToday ? 'cursor-pointer text-red_A700 font-montserrat text-left font-semibold' : 'cursor-pointer text-white_A700 font-montserrat text-left font-semibold'}>
                Today{'    '}
              </span>
              <span className="ml-3 text-white_A700 font-montserrat text-left font-semibold">
              {' '} /
              </span>
            </Text>
            <Text
              className="font-semibold ml-2 md:ml-[0] md:mt-0 mt-2 text-left text-red_A700 w-auto"
              variant="body22"
            >
              <span onClick={onClickThisWeek} className= {activeThisWeek ? 'cursor-pointer text-red_A700 font-montserrat text-left font-semibold' : 'cursor-pointer text-white_A700 font-montserrat text-left font-semibold'}>
                This Week{' '}
              </span>
              <span className="ml-3 text-white_A700 font-montserrat text-left font-semibold">
              {' '} /
              </span>
            </Text>
            <Text
            onClick={onClickLast30Days}
              className={ activeLast30Days ? 'cursor-pointer font-semibold ml-3  md:ml-[0] md:mt-0 mt-2.5 text-left text-red_A700 w-auto' : 'cursor-pointer font-semibold ml-3  md:ml-[0] md:mt-0 mt-2.5 text-left text-white_A700 w-auto'}
              variant="body22"
            >
              Last 30 Days
            </Text>
            <div className="flex flex-row gap-[19px] items-end justify-between mb-[3px] md:ml-[0] ml-[847px] w-[8%] md:w-full">
              <Text
                className="font-semibold mt-1.5 text-left text-white_A700 w-auto"
                variant="body22"
              >
                Genre
              </Text>
              <Img
                src="/images/img_arrowdown.svg"
                className="h-6 mb-1 w-6"
                alt="arrowdown_Two"
              />
            </div>
          </div>
          <div className="flex md:flex-col flex-row font-montserrat md:gap-[45px] items-start justify-between mt-9 w-[96%] md:w-full">
            <List
              className="sm:flex-col flex-row gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 w-[81%] md:w-full"
              orientation="horizontal"
            >
              {images.map((item:any) => {
                return (
                  <>
                    <div className="flex items-center justify-start sm:ml-[0] w-full" onClick={onExpandOfImage}>
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="flex items-center justify-start pb-0.5 w-full">
                          <Img
                                src={item.urls}
                                className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                                alt="rectangle515"
                              />
                            </div>
                            <Text
                              className="font-normal mt-3.5 not-italic text-left text-white_A700 w-auto"
                              variant="body31"
                            >
                              Romatic
                            </Text>
                            <Text
                              className="font-semibold mt-2.5 text-left text-white_A700 w-auto"
                              variant="body26"
                            >
                              {item.name}
                            </Text>
                          </div>
                        </div>
                  </>
                )
              })}
              <div className="flex items-center justify-start sm:ml-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-3.5 not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    Romatic
                  </Text>
                  <Text
                    className="font-semibold mt-2.5 text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Love Mocktail 2
                  </Text>
                </div>
              </div>
            </List>
            <div className="flex items-center justify-start md:mt-0 mt-[68px] w-[17%] md:w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-row gap-[33px] items-center justify-between w-full">
                  <Line className="bg-white_A700 h-px my-[5px] w-3/5" />
                  <Text
                    className="font-medium text-amber_A400 text-left w-auto"
                    variant="body41"
                  >
                    <>View All &gt;</>
                  </Text>
                </div>
                <Text
                  className="font-bold mt-[23px] text-amber_A400 text-left"
                  variant="body11"
                >
                  <>
                    Newly <br />
                    Added Movies
                  </>
                </Text>
                <Img
                  src="/images/img_minimize.svg"
                  className="h-[30px] mt-[18px] w-auto"
                  alt="minimize"
                />
                <Line className="bg-white_A700 h-px mt-[33px] w-[95%]" />
              </div>
            </div>
          </div>
          { expand
            ? <>
            <div className="font-montserrat h-[301px] sm:h-[340px] md:h-[656px] mt-[39px] relative w-[98%] md:w-full">
            <div className="flex flex-row h-full items-center justify-center ml-auto mr-[233px] mt-[42px] w-[23%]">
              <div className="flex items-center justify-start w-[51%]">
                <div className="flex flex-row gap-2 items-center justify-between w-full">
                  <Text
                    className="font-medium text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    CDBS RATING
                  </Text>
                  <Text
                    className="font-medium text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    4.5 / 5
                  </Text>
                </div>
              </div>
              <Img
                src="/images/img_iconparkoutlinelike.svg"
                className="h-6 ml-[11px] w-6"
                alt="iconparkoutline"
              />
              <Img
                src="/images/img_ticket.svg"
                className="h-6 ml-[13px] w-auto"
                alt="ticket"
              />
            </div>
            <div className="absolute flex md:flex-col flex-row gap-5 h-full inset-[0] items-center justify-center m-auto w-full">
              <div className="flex md:flex-1 items-center justify-start w-[83%] md:w-full">
                <div className="flex items-center justify-start w-full">
                  <div className="flex md:flex-col flex-row md:gap-[46px] items-center justify-between w-full">
                    <div className="h-[296px] relative w-[44%] md:w-full">
                      <ReactPlayer
                      className='react-player'
                        url="https://www.youtube.com/watch?v=yT8H8x8iTTk"
                        playing
                        controls
                        width='100%'
                        height='100%'
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-end justify-start w-[53%] md:w-full">
                      <div className="flex items-center justify-start w-auto md:w-full">
                        <Text
                          className="font-semibold text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                          KGF
                        </Text>
                      </div>
                      <Text
                        className="font-normal mt-[55px] not-italic text-justify text-white_A700 w-full"
                        variant="body36"
                      ></Text>
                      <List
                        className="sm:flex-col flex-row gap-2.5 grid sm:grid-cols-1 grid-cols-6 justify-center mt-[26px] w-[98%]"
                        orientation="horizontal"
                      >
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_80x80.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_1.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_2.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_3.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_4.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                      </List>
                      <div className="flex flex-row gap-5 items-center justify-start mt-[21px] w-[15%] md:w-full">
                        <Img
                          src="/images/img_clock.svg"
                          className="h-[30px] w-[30px]"
                          alt="clock"
                        />
                        <Img
                          src="/images/img_arrowright_white_a700.svg"
                          className="h-[30px] w-[30px]"
                          alt="arrowright"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray_600 flex md:flex-1 items-center justify-end p-[90px] md:px-10 sm:px-5 w-auto md:w-full">
                <Text
                  className="font-medium h-[13px] mb-[34px] mt-[71px] text-left text-white_A700 w-auto"
                  variant="body41"
                >
                  Ad
                </Text>
              </div>
            </div>
          </div>
                </>
            : ''}
          {/* <div className="font-montserrat h-[301px] sm:h-[340px] md:h-[656px] mt-[39px] relative w-[98%] md:w-full">
            <div className="flex flex-row h-full items-center justify-center ml-auto mr-[233px] mt-[42px] w-[23%]">
              <div className="flex items-center justify-start w-[51%]">
                <div className="flex flex-row gap-2 items-center justify-between w-full">
                  <Text
                    className="font-medium text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    CDBS RATING
                  </Text>
                  <Text
                    className="font-medium text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    4.5 / 5
                  </Text>
                </div>
              </div>
              <Img
                src="/images/img_iconparkoutlinelike.svg"
                className="h-6 ml-[11px] w-6"
                alt="iconparkoutline"
              />
              <Img
                src="/images/img_ticket.svg"
                className="h-6 ml-[13px] w-auto"
                alt="ticket"
              />
            </div>
            <div className="absolute flex md:flex-col flex-row gap-5 h-full inset-[0] items-center justify-center m-auto w-full">
              <div className="flex md:flex-1 items-center justify-start w-[83%] md:w-full">
                <div className="flex items-center justify-start w-full">
                  <div className="flex md:flex-col flex-row md:gap-[46px] items-center justify-between w-full">
                    <div className="h-[296px] relative w-[44%] md:w-full">
                      <ReactPlayer
                      className='react-player'
                        url="https://www.youtube.com/watch?v=yT8H8x8iTTk"
                        playing
                        controls
                        width='100%'
                        height='100%'
                      />
                    </div>
                    <div className="flex md:flex-1 flex-col items-end justify-start w-[53%] md:w-full">
                      <div className="flex items-center justify-start w-auto md:w-full">
                        <Text
                          className="font-semibold text-left text-white_A700 w-auto"
                          variant="body26"
                        >
                          KGF
                        </Text>
                      </div>
                      <Text
                        className="font-normal mt-[55px] not-italic text-justify text-white_A700 w-full"
                        variant="body36"
                      ></Text>
                      <List
                        className="sm:flex-col flex-row gap-2.5 grid sm:grid-cols-1 grid-cols-6 justify-center mt-[26px] w-[98%]"
                        orientation="horizontal"
                      >
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_80x80.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_1.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_2.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_3.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                        <div className="h-20 relative w-full">
                          <Img
                            src="/images/img_rectangle770_4.png"
                            className="h-20 m-auto object-cover w-20"
                            alt="rectangle770"
                          />
                          <Text
                            className="absolute bottom-[0] left-[5%] text-left text-white_A700 w-auto"
                            as="h5"
                            variant="h5"
                          >
                            Yash
                          </Text>
                        </div>
                      </List>
                      <div className="flex flex-row gap-5 items-center justify-start mt-[21px] w-[15%] md:w-full">
                        <Img
                          src="/images/img_clock.svg"
                          className="h-[30px] w-[30px]"
                          alt="clock"
                        />
                        <Img
                          src="/images/img_arrowright_white_a700.svg"
                          className="h-[30px] w-[30px]"
                          alt="arrowright"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray_600 flex md:flex-1 items-center justify-end p-[90px] md:px-10 sm:px-5 w-auto md:w-full">
                <Text
                  className="font-medium h-[13px] mb-[34px] mt-[71px] text-left text-white_A700 w-auto"
                  variant="body41"
                >
                  Ad
                </Text>
              </div>
            </div>
          </div> */}
          <Dropdown
          options={selectOptions}
          placeholder="Movie Bites"
          className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5 py-[17px] px-[34px] mt-10"
          />
           <Dropdown
          options={selectOptions}
          placeholder="Other Details"
          className="text-white border border-1 border-white_A700_33 bg-gray_800 text-sm rounded-lg block w-full p-2.5 py-[17px] px-[34px] mt-10"
          />
          <div className="flex md:flex-col flex-row font-montserrat md:gap-10 items-start justify-between mt-12 w-[98%] md:w-full">
            <div className="flex items-center justify-start md:mt-0 mt-[68px] w-[16%] md:w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-row gap-[33px] items-center justify-between w-full">
                  <Line className="bg-white_A700 h-px my-[5px] w-3/5" />
                  <Text
                    className="font-medium text-amber_A400 text-left w-auto"
                    variant="body41"
                  >
                    <>View All &gt;</>
                  </Text>
                </div>
                <Text
                  className="font-bold mt-[23px] text-amber_A400 text-left"
                  variant="body11"
                >
                  <>
                    Today&#39;s <br />
                    Birthdays
                  </>
                </Text>
                <Img
                  src="/images/img_minimize.svg"
                  className="h-[30px] mt-[18px] w-auto"
                  alt="minimize_One"
                />
                <Line className="bg-white_A700 h-px mt-[33px] w-[95%]" />
              </div>
            </div>
            <List
              className="sm:flex-col flex-row gap-[19px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 w-4/5 md:w-full"
              orientation="horizontal"
            >
              <div className="flex items-center justify-start mb-1 sm:ml-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_3.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[11px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Siva Raj Kumar
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start sm:ml-[0] sm:mt-0 mt-1.5 w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_4.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Yash
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start mb-1 sm:ml-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_5.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[11px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Sudeep
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start mb-1 sm:ml-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_6.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[11px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Upendra Rao
                  </Text>
                </div>
              </div>
            </List>
          </div>
          <div className="flex md:flex-col flex-row font-montserrat md:gap-10 items-start justify-between mt-[38px] w-[98%] md:w-full">
            <div className="flex items-center justify-start md:mt-0 mt-[3px] rotate-[90deg] w-1/4 md:w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex items-center justify-start w-full">
                  <Img
                    src="/images/img_rectangle595.png"
                    className="common-pointer h-[172px] md:h-auto mb-1.5 object-cover rounded-[3px] w-full"
                    onClick={() => navigate('/filimfestival')}
                    alt="rectangle595"
                  />
                </div>
                <Text
                  className="mt-[13px] not-italic rotate-[-90deg] text-left text-white_A700 w-auto"
                  variant="body40"
                >
                  12 July 2023
                </Text>
                <Text
                  className="mt-2 rotate-[-90deg] text-left text-white_A700 w-auto"
                  variant="body35"
                >
                  Bengaluru International Film Festival
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-start rotate-[90deg] w-[26%] md:w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex items-center justify-start w-full">
                  <Img
                    src="/images/img_rectangle667.png"
                    className="h-44 md:h-auto mb-1 object-cover w-full"
                    alt="rectangle667"
                  />
                </div>
                <Text
                  className="mt-3 not-italic rotate-[-90deg] text-left text-white_A700 w-auto"
                  variant="body38"
                >
                  12 July 2023
                </Text>
                <Text
                  className="mt-[7px] rotate-[-90deg] text-left text-white_A700 w-auto"
                  variant="body33"
                >
                  Behindwoods Gold Medals
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-start rotate-[90deg] w-1/4 md:w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex items-center justify-start w-full">
                  <Img
                    src="/images/img_rectangle667.png"
                    className="h-44 md:h-auto mb-1 object-cover w-full"
                    alt="rectangle667_One"
                  />
                </div>
                <Text
                  className="mt-3.5 not-italic rotate-[-90deg] text-left text-white_A700 w-auto"
                  variant="body39"
                >
                  12 July 2023
                </Text>
                <Text
                  className="mt-[9px] rotate-[-90deg] text-left text-white_A700 w-auto"
                  variant="body34"
                >
                  Bengaluru International Film Festival
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-start md:mt-0 mt-[3px] w-[16%] md:w-full">
              <div className="flex items-center justify-start w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row gap-[33px] items-center justify-between w-full">
                    <Line className="bg-white_A700 h-px my-[5px] w-3/5" />
                    <Text
                      className="font-medium text-amber_A400 text-left w-auto"
                      variant="body41"
                    >
                      <>View All &gt;</>
                    </Text>
                  </div>
                  <Text
                    className="font-bold mt-[23px] text-amber_A400 text-left"
                    variant="body11"
                  >
                    <>
                      Film <br />
                      Festivals
                    </>
                  </Text>
                  <Img
                    src="/images/img_minimize.svg"
                    className="h-[30px] mt-[18px] w-auto"
                    alt="minimize_Two"
                  />
                  <Line className="bg-white_A700 h-px mt-[33px] w-[95%]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row font-montserrat md:gap-[54px] items-start justify-between mt-[39px] w-[98%] md:w-full">
            <div className="flex items-center justify-start md:mt-0 mt-[68px] w-[17%] md:w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-row gap-[33px] items-center justify-start w-[96%] md:w-full">
                  <Line className="bg-white_A700 h-px my-[5px] w-3/5" />
                  <Text
                    className="font-medium text-amber_A400 text-left w-auto"
                    variant="body41"
                  >
                    <>View All &gt;</>
                  </Text>
                </div>
                <Text
                  className="font-bold mt-[23px] text-amber_A400 text-left"
                  variant="body11"
                >
                  <>
                    On Cinema DBS <br />
                    OTT
                  </>
                </Text>
                <Img
                  src="/images/img_minimize.svg"
                  className="h-[30px] mt-[18px] w-auto"
                  alt="minimize_Three"
                />
                <Line className="bg-white_A700 h-px mt-[33px] w-[90%]" />
              </div>
            </div>
            <List
              className="sm:flex-col flex-row gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 w-4/5 md:w-full"
              orientation="horizontal"
            >
              <div className="flex items-center justify-start mb-1.5 sm:ml-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_7.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Raider
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start sm:ml-[0] sm:mt-0 mt-1.5 w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_8.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Mufthi
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start mb-[5px] sm:ml-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_9.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Rekke
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start mb-1.5 sm:ml-[0] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_10.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Bond Ravi
                  </Text>
                </div>
              </div>
            </List>
          </div>
          <div className="flex md:flex-col flex-row font-montserrat md:gap-10 items-center justify-between mt-[39px] w-[98%] md:w-full">
            <List
              className="sm:flex-col flex-row gap-14 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 w-4/5 md:w-full"
              orientation="horizontal"
            >
              <div className="h-[169px] relative w-full">
                <Img
                  src="/images/img_rectangle531.png"
                  className="h-[168px] m-auto object-cover w-full"
                  alt="rectangle531"
                />
                <div className="absolute bg-gray_900_7f flex h-full inset-[0] items-start justify-center m-auto p-[19px] w-full">
                  <Text
                    className="font-medium md:ml-[0] ml-[13px] mt-[102px] text-justify text-white_A700 w-auto"
                    variant="body13"
                  >
                    Coorgi
                  </Text>
                </div>
              </div>
              <div className="h-[169px] relative w-full">
                <Img
                  src="/images/img_rectangle531_168x301.png"
                  className="h-[168px] m-auto object-cover w-full"
                  alt="rectangle531"
                />
                <div className="absolute bg-gray_900_7f flex h-full inset-[0] items-start justify-center m-auto p-[21px] sm:px-5 w-full">
                  <Text
                    className="font-medium md:ml-[0] ml-[11px] mt-[98px] text-justify text-white_A700 w-auto"
                    variant="body13"
                  >
                    Tulu
                  </Text>
                </div>
              </div>
              <div className="h-[169px] relative w-full">
                <Img
                  src="/images/img_rectangle529.png"
                  className="absolute h-[168px] inset-[0] justify-center m-auto object-cover w-[99%]"
                  alt="rectangle529"
                />
                <div className="absolute bg-gray_900_7f flex h-full inset-[0] items-start justify-center m-auto p-2.5 w-auto">
                  <Text
                    className="font-medium mb-[15px] mt-[106px] text-justify text-white_A700 w-auto"
                    variant="body13"
                  >
                    Telugu
                  </Text>
                </div>
              </div>
            </List>
            <div className="flex items-center justify-start w-[16%] md:w-full">
              <div className="flex items-center justify-start w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row gap-[33px] items-center justify-between w-full">
                    <Line className="bg-white_A700 h-px my-[5px] w-3/5" />
                    <Text
                      className="font-medium text-amber_A400 text-left w-auto"
                      variant="body41"
                    >
                      <>View All &gt;</>
                    </Text>
                  </div>
                  <Text
                    className="font-bold mt-[23px] text-amber_A400 text-left"
                    variant="body11"
                  >
                    <>
                      Other <br />
                      Film Industries
                    </>
                  </Text>
                  <Img
                    src="/images/img_minimize.svg"
                    className="h-[30px] mt-[18px] w-auto"
                    alt="minimize_Four"
                  />
                  <Line className="bg-white_A700 h-px mt-[33px] w-[95%]" />
                </div>
              </div>
            </div>
          </div>
          <List
            className="flex-col font-montserrat gap-10 grid items-center mt-[39px] w-[98%]"
            orientation="vertical"
          >
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start w-full">
              <div className="flex md:flex-1 items-center justify-start md:mt-0 mt-[68px] w-[16%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row gap-[33px] items-center justify-between w-full">
                    <Line className="bg-white_A700 h-px my-[5px] w-3/5" />
                    <Text
                      className="font-medium text-amber_A400 text-left w-auto"
                      variant="body41"
                    >
                      <>View All &gt;</>
                    </Text>
                  </div>
                  <Text
                    className="font-bold mt-[23px] text-amber_A400 text-left"
                    variant="body11"
                  >
                    <>
                      Recently <br />
                      Viewed
                    </>
                  </Text>
                  <Img
                    src="/images/img_minimize.svg"
                    className="h-[30px] mt-[18px] w-auto"
                    alt="minimize"
                  />
                  <Line className="bg-white_A700 h-px mt-[33px] w-[95%]" />
                </div>
              </div>
              <div className="flex md:flex-1 items-center justify-start ml-16 md:ml-[0] w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_7.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Raider
                  </Text>
                </div>
              </div>
              <div className="flex md:flex-1 items-center justify-start ml-5 md:ml-[0] md:mt-0 mt-1.5 w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_8.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515_One"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Mufthi
                  </Text>
                </div>
              </div>
              <div className="flex md:flex-1 items-center justify-start mb-[5px] ml-5 md:ml-[0] w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_9.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515_Two"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Rekke
                  </Text>
                </div>
              </div>
              <div className="flex md:flex-1 items-center justify-start ml-5 md:ml-[0] w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_10.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515_Three"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[17px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    12 july 1964
                  </Text>
                  <Text
                    className="font-semibold mt-[9px] text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Bond Ravi
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start w-[99%] md:w-full">
              <div className="flex items-center justify-start w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515"
                    />
                  </div>
                  <Text
                    className="font-normal mt-3.5 not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    Romatic
                  </Text>
                  <Text
                    className="font-semibold mt-2.5 text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Love Mocktail 2
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start ml-5 md:ml-[0] w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start w-full">
                    <Img
                      src="/images/img_rectangle515_311x240.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515_One"
                    />
                  </div>
                  <Text
                    className="font-normal mt-[15px] not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    Action ,Drama
                  </Text>
                  <Text
                    className="font-semibold mt-1.5 text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    KGF
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start ml-5 md:ml-[0] w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_1.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515_Two"
                    />
                  </div>
                  <Text
                    className="font-normal mt-3.5 not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    Action ,Drama
                  </Text>
                  <Text
                    className="font-semibold mt-2.5 text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Kabzaa
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start ml-5 md:ml-[0] w-[19%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex items-center justify-start pb-0.5 w-full">
                    <Img
                      src="/images/img_rectangle515_2.png"
                      className="h-[311px] md:h-auto object-cover rounded-[3px] w-full"
                      alt="rectangle515_Three"
                    />
                  </div>
                  <Text
                    className="font-normal mt-3.5 not-italic text-left text-white_A700 w-auto"
                    variant="body31"
                  >
                    Action ,Drama
                  </Text>
                  <Text
                    className="font-semibold mt-2.5 text-left text-white_A700 w-auto"
                    variant="body26"
                  >
                    Head Bush
                  </Text>
                </div>
              </div>
              <div className="flex items-center justify-start md:ml-[0] ml-[45px] md:mt-0 mt-[68px] w-[17%] md:w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row gap-[33px] items-center justify-between w-full">
                    <Line className="bg-white_A700 h-px my-[5px] w-3/5" />
                    <Text
                      className="font-medium text-amber_A400 text-left w-auto"
                      variant="body41"
                    >
                      <>View All &gt;</>
                    </Text>
                  </div>
                  <Text
                    className="font-bold mt-[23px] text-left text-white_A700"
                    variant="body11"
                  >
                    <>
                      Sponsored
                      <br />
                      Movies
                    </>
                  </Text>
                  <Img
                    src="/images/img_minimize.svg"
                    className="h-[30px] mt-[18px] w-auto"
                    alt="minimize"
                  />
                  <Line className="bg-white_A700 h-px mt-[33px] w-[95%]" />
                </div>
              </div>
            </div>
          </List>
          <div className="flex font-montserrat items-center justify-start mt-[41px] w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex sm:flex-col flex-row sm:gap-10 items-center justify-between w-full">
                <Line className="bg-gray_800 h-1 sm:mt-0 my-[13px] w-[33%]" />
                <Text
                  className="text-amber_A400 text-justify w-auto"
                  variant="body9"
                >
                  Legacy of the Sandalwood
                </Text>
                <Line className="bg-gray_800 h-1 sm:mt-0 my-[13px] w-[33%]" />
              </div>
              <Text
                className="font-medium mt-1.5 text-justify text-white_A700 w-auto"
                variant="body17"
              >
                ಕನ್ನಡ ಫಿಲ್ಮ್ ಇಂಡಸ್ಟ್ರಿ
              </Text>
              <Text
                className="font-medium mt-[22px] text-center text-white_A700 w-3/5 sm:w-full"
                variant="body36"
              >
                <>
                  Kannada cinema, also known as Sandalwood,or Chandanavana, is
                  the segment of Indian cinema dedicated to the production of
                  motion pictures in the Kannada language widely spoken in the
                  state of Karnataka. &gt;&gt; Read more
                </>
              </Text>
              <Line className="bg-gray_800 h-px mt-6 w-[58%]" />
            </div>
          </div>
          <Text
            className="font-normal font-roboto mt-[57px] not-italic text-amber_A400 text-left w-auto"
            variant="body41"
          >
            Sponsored{' '}
          </Text>
          <div className="flex items-center justify-start mt-[7px] w-[65%] md:w-full">
            <Img
              src="/images/img_image24.png"
              className="h-64 md:h-auto object-cover w-full"
              alt="imageTwentyFour"
            />
          </div>
        </div>
        <div className="flex items-center justify-start mt-20 w-full">
          <Footer className="bg-gray_800 flex flex-col items-center justify-end pt-1.5 w-full" />
        </div>
      </div>
    </>
  );
};

export default MainScreenBeforeLogin;
