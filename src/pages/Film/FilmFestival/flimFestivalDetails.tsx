import React, { useEffect, useState } from "react";

import Header from "../../../components/MainScreenHeader/mainscreenheader";
import { Text, Img, Line, Button } from "../../../components/Elements/index";
import Footer from "../../../components/Footer/footer";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import AliceCarousel from "react-alice-carousel";

const FilmFestivalDetails: React.FC = () => {
  const navigate = useNavigate();

  const navigateToFilmFestivalRegistation = () => {
    navigate("/film/filmfestival/filmfestivalregistration");
  };

  const [flimPoster, setflimPoster] = useState([
    {
      image: "url",
      venue: "string",
      price: "number",
      dateandtime: "string",
      location: "string",
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
          <div className="flex gap-10 ml-20 mb-4">
            <div className="bg-yellow-300 text-black rounded p-2">
              <Button>Tickets</Button>
            </div>
            <div className="bg-yellow-300 text-black rounded p-2">
              <Button>About</Button>
            </div>
            <div className="bg-yellow-300 text-black rounded p-2">
              <Button>Photos</Button>
            </div>
            <div className="bg-yellow-300 text-black rounded p-2">
              <Button>Public Voting</Button>
            </div>
          </div>
          {flimPoster.map((data) => {
            return (
              <>
                <div className="event-details">
                  <p className="event-title">
                    Bengaluru International Film Festival - 14th Edition
                  </p>
                  <div className="event-info">
                    <p className="event-date">{data.dateandtime}</p>
                    <p className="event-location">
                      <img
                        src="https://cdn.icon-icons.com/icons2/1358/PNG/512/if-advantage-nearby-1034361_88844.png"
                        alt=""
                        height="20px"
                        width="20px"
                      />
                      {data.location}
                    </p>
                  </div>
                </div>
                <div className="movie-details">
                  <img
                    src={data.image}
                    alt=""
                    style={{ height: "250px", width: "400px" }}
                  />
                  <p className="movie-venue">
                    <span className="venue">
                      Bengaluru International Film Festival
                    </span>
                    <p>
                      {" "}
                      <span className="venue"> Venue : </span> {data.venue}
                    </p>

                    <div className="price-section">
                      <p className="price-label">Price :</p>
                      <p className="price-value">{data.price}</p>
                    </div>
                    <div className="quantity-section">
                      <p className="quantity-label">Qty</p>
                      <input type="number" className="quantity-input" min={1} />
                    </div>
                  </p>
                  <div className="button-section">
                    <button className="buttons">Buy Tickets</button> <br />
                    <button className="buttons">Submit the Movie</button>
                  </div>
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
