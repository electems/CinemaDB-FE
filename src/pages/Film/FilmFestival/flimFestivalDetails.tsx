import React, { useEffect, useRef, useState } from "react";

import Header from "../../../components/MainScreenHeader/mainscreenheader";
import { Text, Img, Line, Button } from "../../../components/Elements/index";
import Footer from "../../../components/Footer/footer";
import { api } from "../../../services/api";
import AliceCarousel from "react-alice-carousel";
import PhotoSection from "./PhotoSection";
import './style.css'
import AboutSection from "./AboutSection"; 
import EventDetails from "./EventDetails";
import NavigationButtons from "./NavigationButtons";
import TicketDetails from "./TicketDetails";

const FilmFestivalDetails: React.FC = () => {
  const photoRef = useRef(null);
  const aboutRef = useRef(null);
  const ticketRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [flimPoster, setflimPoster] = useState([
    {
      image: "url",
      venue: "string",
      price: "number",
      dateandtime: "string",
      location: "string",
      about: "string",
      photos: [{ photo: "url" }],
    },
  ]);

  useEffect(() => {
    retrieveFlimImages("EN", "flimfestivalposter");
  }, []);

  const retrieveFlimImages = async (language: string, formLayout: string) => {
    const response = await api.get(`auth/${language}/${formLayout}`);

    setflimPoster(response.data);
  };

  const handleflimposter = (e: { preventDefault: () => any }) =>
    e.preventDefault();

  const items = flimPoster.map((flimfestivalposter) => {
    return (
      <div className="">
        <Img
          src={flimfestivalposter.image}
          onDragStart={handleflimposter}
          className="h-[578px] md:h-auto object-cover w-full"
          role="presentation"
        />
      </div>
    );
  });

  return (
    <>
      <div className="bg-gray_900 flex items-center justify-start mx-auto w-full">
        <div className="flex flex-col justify-start w-full">
          <Header className="bg-gray_800 flex flex-row font-roboto items-center justify-center md:px-5 w-full" />

          <div className="font-montserrat h-[655px] md:h-[668px] max-w-[1287px] mt-[13px] mx-auto md:px-5 relative w-full">
            <div className="absolute flex inset-x-[0] items-center justify-start mx-auto top-[0.5%] w-full">
              <div className="flex flex-col gap-[20px] items-start justify-start w-full">
                <div className="h-[300px] md:h-[300px] max-w-[1312px] mt-[61px] mx-auto md:px-5 relative w-full">
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
              </div>
            </div>
          </div>

          <NavigationButtons
            scrollToPhoto={() => scrollToSection(photoRef)}
            scrollToAbout={() => scrollToSection(aboutRef)}
            scrollToticket={() => scrollToSection(ticketRef)}
          />

          {flimPoster.map((data) => {
            return (
              <>
                <EventDetails data={data} />

                <div ref={ticketRef}>
                  <TicketDetails data={data} />
                </div>

                <div ref={aboutRef}>
                  <AboutSection data={data} />
                </div>

                <div ref={photoRef}>
                  <PhotoSection data={data} />
                </div>
              </>
            );
          })}

          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[70px] md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default FilmFestivalDetails;
