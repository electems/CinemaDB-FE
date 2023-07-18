/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { Img, Button, Text } from '../../../../components/Elements/index'
import { api } from '../../../../services/api'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Header from '../../../../components/Header/header'
import Footer from '../../../../components/Footer/footer'

export interface Section {
  name: string;
  movies: Movie[];
}

export interface Movie {
  id: string;
  movies: string;
}

export const MainScreen: React.FC = () => {
  const [carousal, setCarosualImage] = useState([
    {
      image: 'url'
    }
  ])
  const [moviesAndSection, setMoviesAndSection] = useState([
    {
      name: '',
      movies: [
        {
          id: 'Movie1',
          movies: 'Img'
        }
      ]
    }
  ])

  useEffect(() => {
    retrieveFilmSections('EN', 'mainscreensections')
    retrieveCorusalImages('EN', 'carousal')
  }, [])

  const retrieveFilmSections = async (language: string, formLayout: string) => {
    const sections = await api.get(`auth/${language}/${formLayout}`)
    let executeOnlyOnce = false
    sections.data.map(async (section:any) => {
      const movies = await retrieveFilmMovies(language, 'ottscreenimages')
      if (movies !== null) {
        if (!executeOnlyOnce) {
          setMoviesAndSection((moviesAndSection) => [
            {
              name: section.title,
              movies: movies.data
            }
          ])
          executeOnlyOnce = true
        } else {
          setMoviesAndSection((moviesAndSection) => [
            ...moviesAndSection,
            {
              name: section.title,
              movies: movies.data
            }
          ])
        }
      }
    })
  }
  const retrieveFilmMovies = async (language: string, formLayout: string) => {
    return await api.get(`auth/${language}/${formLayout}`)
  }

  const retrieveCorusalImages = async (
    language: string,
    formLayout: string
  ) => {
    const response = await api.get(`auth/${language}/${formLayout}`)

    setCarosualImage(response.data)
  }

  const handleCarousal = (e: { preventDefault: () => any }) =>
    e.preventDefault()

  const items = carousal.map((carosual) => {
    return (
      <div className="">
        <Img
          src={carosual.image}
          onDragStart={handleCarousal}
          className="h-[578px] md:h-auto object-cover w-full"
          role="presentation"
        />
      </div>
    )
  })
  return (
    <>
    <div className="bg-gray_900 flex items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <Header className="bg-gray_800 flex flex-row font-roboto items-center justify-center md:px-5 w-full" />
          <div className="h-[578px] md:h-[609px] max-w-[1312px] mt-[61px] mx-auto md:px-5 relative w-full">
          <div>
            <AliceCarousel
             mouseTracking
             disableButtonsControls
             items={items}
             disableDotsControls
             autoPlay
              />
          </div>
          </div>
          <div className="font-montserrat gap-6 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-6 items-center justify-start mt-[35px] md:px-5 w-[53%] md:w-full">
            <Button className="bg-red_A700 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Kannada
            </Button>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Tulu
            </Button>
            <Button
              className="bg-gray_800 font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full"
            >
              Coorgi
            </Button>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Telugu
            </Button>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Tamil
            </Button>
            <Button className="bg-gray_800 cursor-pointer font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Malayalam
            </Button>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1303px] mt-[51px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
            {moviesAndSection.map(section => {
              return (
                  <div className="flex flex-col gap-[22px] justify-start w-full">
                  <Text
                      className="font-montserrat font-bold text-left text-white_A700 w-auto"
                      variant="body26"
                    >

                      {section.name}
                    </Text>
                    <div className="gap-[26px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between md:ml-[0] ml-[21px] w-[99%] md:w-full">
                        {section.movies.map((movie) => {
                          return (
                            <div className="">
                              <Img
                                src={movie.movies}
                                className="h-[168px] md:h-auto object-cover w-full"
                                alt="React Image"
                                loading="lazy"
                              />
                            </div>
                          )
                        })}
                      </div>
                  </div>
              )
            })}
            </div>
          </div>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[50px] md:px-5 w-full" />
        </div>
      </div>
    </>
  )
}
