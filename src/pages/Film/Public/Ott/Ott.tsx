/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Text, Img, Button } from "../../../../components/Elements/index";
import { api } from "../../../../services/api";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Header from "../../../../components/Header/header";
import Footer from "../../../../components/Footer/footer";
let moviesOfATitle = [
  {
    title: "",
    image: [
      {
        id: 0,
        title: "",
        image: "",
      },
    ],
  },
];
let titles = [
  {
    id: 0,
    code: "",
    title: "",
    image: [
      {
        image: "",
      },
    ],
  },
];
const carosual = [
  {
    id: 0,
    image: "",
  },
];

export const MainScreen: React.FC = () => {
  const [moviesGroupedByTitle, setMoviesGroupedByTitle] =
    useState(moviesOfATitle);
  const [mainScreenSections, setMainScreenSections] = useState(moviesOfATitle);
  const [filmImages, setFilmImages] = useState(moviesOfATitle);
  const [carousal, setCarosualImage] = useState(carosual);
  useEffect(() => {
    retrieveFilmSections("EN", "mainscreensections");
    retrieveFilmMovies("EN", "ottscreenimages");
    retrieveCorusalImages("EN", "carousal");
  }, []);

  const retrieveFilmSections = async (language: string, formLayout: string) => {
    let sections = await api.get(`form/${language}/${formLayout}`);
    setMainScreenSections(sections.data);
    mainScreenSections.map(async (section) => {});
  };
  /*This has to be come from backend for now testing purpose i build json like this but the images are from the public api */
  const retrieveFilmMovies = async (language: string, formLayout: string) => {
    await api
      .get(`form/${language}/${formLayout}`)
      .then((response) => {
        setFilmImages(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveCorusalImages = async (
    language: string,
    formLayout: string
  ) => {
    await api
      .get(`form/${language}/${formLayout}`)
      .then((response) => {
        setCarosualImage(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleCarousal = (e: { preventDefault: () => any }) =>
    e.preventDefault();
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
    );
  });
  return (
    <>
      <Header />
      <div className="bg-gray_900 flex items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="h-[578px] md:h-[609px] max-w-[1312px] mt-[31px] mx-auto md:px-5 relative w-full">
            <div className="">
              <AliceCarousel
                mouseTracking
                disableButtonsControls
                items={items}
                disableDotsControls
                infinite
                autoPlay
              />
            </div>
          </div>
          <div className="ltr start-0 ... font-montserrat gap-6 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-6 mt-[35px] md:px-5 w-[53%] md:w-full">
            <Button className=" bg-red_A700 font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Kannada
            </Button>
            <Button className="float-left bg-gray_800 font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Tulu
            </Button>
            <Button className="bg-gray_800 font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Coorgi
            </Button>
            <Button className="bg-gray_800 font-bold leading-[normal] min-w-[112psx] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Telugu
            </Button>
            <Button className="bg-gray_800 font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Tamil
            </Button>
            <Button className="bg-gray_800 font-bold leading-[normal] min-w-[112px] py-[7px] rounded text-base text-center text-white_A700 w-full">
              Malayalam
            </Button>
          </div>
          <div className="flex font-montserrat items-center justify-start max-w-[1303px] mt-[51px] mx-auto md:px-5 w-full">
            <div className="flex flex-col gap-[22px] justify-start w-full">
              {sectionImages &&
                sectionImages.map((item) => {
                  return (
                    <div className="flex flex-col gap-[22px] justify-start w-full">
                      <Text
                        className="font-bold text-left text-white_A700 w-auto"
                        variant="body26"
                      >
                        {item.title}
                      </Text>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
