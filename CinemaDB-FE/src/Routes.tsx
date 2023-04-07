import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
const Penman = React.lazy(() => import("pages/Penman"));
const Payments = React.lazy(() => import("pages/Payments"));
const Payments12cards = React.lazy(() => import("pages/Payments12cards"));
const DEMOREGISTRATIONFORMforFFTwo = React.lazy(
  () => import("pages/DEMOREGISTRATIONFORMforFFTwo")
);
const Privacypolicy = React.lazy(() => import("pages/Privacypolicy"));
const PromotionTermconduction = React.lazy(
  () => import("pages/PromotionTermconduction")
);
const DEMOREGISTRATIONFORMforCinemaFANS = React.lazy(
  () => import("pages/DEMOREGISTRATIONFORMforCinemaFANS")
);
const DEMOREGISTRATIONFORMforFF1 = React.lazy(
  () => import("pages/DEMOREGISTRATIONFORMforFF1")
);
const EventsRegistration = React.lazy(() => import("pages/EventsRegistration"));
const EventTickets = React.lazy(() => import("pages/EventTickets"));
const Disclaimer = React.lazy(() => import("pages/Disclaimer"));
const QA = React.lazy(() => import("pages/QA"));
const Offers = React.lazy(() => import("pages/Offers"));
const RegistrationFormSix = React.lazy(
  () => import("pages/RegistrationFormSix")
);
const RegistrationFormThree = React.lazy(
  () => import("pages/RegistrationFormThree")
);
const UploadtoFilimFestivalTwo = React.lazy(
  () => import("pages/UploadtoFilimFestivalTwo")
);
const UploadtoFilimFestivalOne = React.lazy(
  () => import("pages/UploadtoFilimFestivalOne")
);
const TermsConditions = React.lazy(() => import("pages/TermsConditions"));
const Copyright = React.lazy(() => import("pages/Copyright"));
const UploadPremieryourmovieonCinemaDBScom = React.lazy(
  () => import("pages/UploadPremieryourmovieonCinemaDBScom")
);
const RegistrationFormFive = React.lazy(
  () => import("pages/RegistrationFormFive")
);
const LoginRegisterCinemaProfessionalTwo = React.lazy(
  () => import("pages/LoginRegisterCinemaProfessionalTwo")
);
const RegistrationFormTwo = React.lazy(
  () => import("pages/RegistrationFormTwo")
);
const LoginRegisterFilmLover = React.lazy(
  () => import("pages/LoginRegisterFilmLover")
);
const LoginRegisterIndustrySelectionOne = React.lazy(
  () => import("pages/LoginRegisterIndustrySelectionOne")
);
const Notification = React.lazy(() => import("pages/Notification"));
const Career = React.lazy(() => import("pages/Career"));
const UploadDragFileFileUpload = React.lazy(
  () => import("pages/UploadDragFileFileUpload")
);
const Watchlist = React.lazy(() => import("pages/Watchlist"));
const UploadtoOTTPricePlan = React.lazy(
  () => import("pages/UploadtoOTTPricePlan")
);
const UploadMyComputerFileUpload = React.lazy(
  () => import("pages/UploadMyComputerFileUpload")
);
const Profile = React.lazy(() => import("pages/Profile"));
const MenuOne = React.lazy(() => import("pages/MenuOne"));
const Menu = React.lazy(() => import("pages/Menu"));
const Filmupdates = React.lazy(() => import("pages/Filmupdates"));
const FilmIndusry = React.lazy(() => import("pages/FilmIndusry"));
const MainScreenOne = React.lazy(() => import("pages/MainScreenOne"));
const AwardNews = React.lazy(() => import("pages/AwardNews"));
const FilimFestival = React.lazy(() => import("pages/FilimFestival"));
const FilmFestivalRegistration = React.lazy(
  () => import("pages/FilmFestivalRegistration")
);
const FilimFestivalOne = React.lazy(() => import("pages/FilimFestivalOne"));
const PlansTwo = React.lazy(() => import("pages/PlansTwo"));
const PlansOne = React.lazy(() => import("pages/PlansOne"));
const RegistrationFormSeven = React.lazy(
  () => import("pages/RegistrationFormSeven")
);
const Auditionscallpage = React.lazy(() => import("pages/Auditionscallpage"));
const AuditionscallpageOne = React.lazy(
  () => import("pages/AuditionscallpageOne")
);
const AuditionsCallRegistration = React.lazy(
  () => import("pages/AuditionsCallRegistration")
);
const PromoteMaster = React.lazy(() => import("pages/PromoteMaster"));
const RegistrationFormFour = React.lazy(
  () => import("pages/RegistrationFormFour")
);
const RegistrationFormOne = React.lazy(
  () => import("pages/RegistrationFormOne")
);
const LoginRegisterProductionHouseCompany = React.lazy(
  () => import("pages/LoginRegisterProductionHouseCompany")
);
const LoginRegisterAdAgencyPromoter = React.lazy(
  () => import("pages/LoginRegisterAdAgencyPromoter")
);
const LoginRegisterCinemaProfessionalOne = React.lazy(
  () => import("pages/LoginRegisterCinemaProfessionalOne")
);
const LoginRegisterIndustrySelection = React.lazy(
  () => import("pages/LoginRegisterIndustrySelection")
);
const LoginRegisterFilmPerson = React.lazy(
  () => import("pages/LoginRegisterFilmPerson")
);
const Legendsofindustry2 = React.lazy(() => import("pages/Legendsofindustry2"));
const LivingLegends = React.lazy(() => import("pages/LivingLegends"));
const LegendsoftheindustryOne = React.lazy(
  () => import("pages/LegendsoftheindustryOne")
);
const LoginRegisterOne = React.lazy(() => import("pages/LoginRegisterOne"));
const Contactus = React.lazy(() => import("pages/Contactus"));
const Signout = React.lazy(() => import("pages/Signout"));
const MainScreen = React.lazy(() => import("pages/MainScreen"));
const Searchpanel = React.lazy(() => import("pages/Searchpanel"));
const MyProfile = React.lazy(() => import("pages/MyProfile"));
const TrainingInstitutes = React.lazy(() => import("pages/TrainingInstitutes"));
const PublicRatingTwo = React.lazy(() => import("pages/PublicRatingTwo"));
const Birthday = React.lazy(() => import("pages/Birthday"));
const LegacyoftheSandalwood = React.lazy(
  () => import("pages/LegacyoftheSandalwood")
);
const Aboutus = React.lazy(() => import("pages/Aboutus/aboutus"));
const OTT = React.lazy(() => import("pages/OTT/ott"));
const ProjectRoutes = () => {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <React.Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route path="/" element={<OTT />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route
              path="/legacyofthesandalwood"
              element={<LegacyoftheSandalwood />}
            />
            <Route path="/birthday" element={<Birthday />} />
            <Route path="/publicratingtwo" element={<PublicRatingTwo />} />
            <Route
              path="/traininginstitutes"
              element={<TrainingInstitutes />}
            />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/searchpanel" element={<Searchpanel />} />
            <Route path="/mainscreen" element={<MainScreen />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/loginregisterone" element={<LoginRegisterOne />} />
            <Route
              path="/legendsoftheindustryone"
              element={<LegendsoftheindustryOne />}
            />
            <Route path="/livinglegends" element={<LivingLegends />} />
            <Route
              path="/legendsofindustry2"
              element={<Legendsofindustry2 />}
            />
            <Route
              path="/loginregisterfilmperson"
              element={<LoginRegisterFilmPerson />}
            />
            <Route
              path="/loginregisterindustryselection"
              element={<LoginRegisterIndustrySelection />}
            />
            <Route
              path="/loginregistercinemaprofessionalone"
              element={<LoginRegisterCinemaProfessionalOne />}
            />
            <Route
              path="/loginregisteradagencypromoter"
              element={<LoginRegisterAdAgencyPromoter />}
            />
            <Route
              path="/loginregisterproductionhousecompany"
              element={<LoginRegisterProductionHouseCompany />}
            />
            <Route
              path="/registrationformone"
              element={<RegistrationFormOne />}
            />
            <Route
              path="/registrationformfour"
              element={<RegistrationFormFour />}
            />
            <Route path="/promotemaster" element={<PromoteMaster />} />
            <Route
              path="/auditionscallregistration"
              element={<AuditionsCallRegistration />}
            />
            <Route
              path="/auditionscallpageone"
              element={<AuditionscallpageOne />}
            />
            <Route path="/auditionscallpage" element={<Auditionscallpage />} />
            <Route
              path="/registrationformseven"
              element={<RegistrationFormSeven />}
            />
            <Route path="/plansone" element={<PlansOne />} />
            <Route path="/planstwo" element={<PlansTwo />} />
            <Route path="/filimfestivalone" element={<FilimFestivalOne />} />
            <Route
              path="/filmfestivalregistration"
              element={<FilmFestivalRegistration />}
            />
            <Route path="/filimfestival" element={<FilimFestival />} />
            <Route path="/awardnews" element={<AwardNews />} />
            <Route path="/mainscreenone" element={<MainScreenOne />} />
            <Route path="/filmindusry" element={<FilmIndusry />} />
            <Route path="/filmupdates" element={<Filmupdates />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menuone" element={<MenuOne />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/uploadmycomputerfileupload"
              element={<UploadMyComputerFileUpload />}
            />
            <Route
              path="/uploadtoottpriceplan"
              element={<UploadtoOTTPricePlan />}
            />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route
              path="/uploaddragfilefileupload"
              element={<UploadDragFileFileUpload />}
            />
            <Route path="/career" element={<Career />} />
            <Route path="/notification" element={<Notification />} />
            <Route
              path="/loginregisterindustryselectionone"
              element={<LoginRegisterIndustrySelectionOne />}
            />
            <Route
              path="/loginregisterfilmlover"
              element={<LoginRegisterFilmLover />}
            />
            <Route
              path="/registrationformtwo"
              element={<RegistrationFormTwo />}
            />
            <Route
              path="/loginregistercinemaprofessionaltwo"
              element={<LoginRegisterCinemaProfessionalTwo />}
            />
            <Route
              path="/registrationformfive"
              element={<RegistrationFormFive />}
            />
            <Route
              path="/uploadpremieryourmovieoncinemadbscom"
              element={<UploadPremieryourmovieonCinemaDBScom />}
            />
            <Route path="/copyright" element={<Copyright />} />
            <Route path="/termsconditions" element={<TermsConditions />} />
            <Route
              path="/uploadtofilimfestivalone"
              element={<UploadtoFilimFestivalOne />}
            />
            <Route
              path="/uploadtofilimfestivaltwo"
              element={<UploadtoFilimFestivalTwo />}
            />
            <Route
              path="/registrationformthree"
              element={<RegistrationFormThree />}
            />
            <Route
              path="/registrationformsix"
              element={<RegistrationFormSix />}
            />
            <Route path="/offers" element={<Offers />} />
            <Route path="/qa" element={<QA />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/eventtickets" element={<EventTickets />} />
            <Route
              path="/eventsregistration"
              element={<EventsRegistration />}
            />
            <Route
              path="/demoregistrationformforff1"
              element={<DEMOREGISTRATIONFORMforFF1 />}
            />
            <Route
              path="/demoregistrationformforcinemafans"
              element={<DEMOREGISTRATIONFORMforCinemaFANS />}
            />
            <Route
              path="/promotiontermconduction"
              element={<PromotionTermconduction />}
            />
            <Route path="/privacypolicy" element={<Privacypolicy />} />
            <Route
              path="/demoregistrationformforfftwo"
              element={<DEMOREGISTRATIONFORMforFFTwo />}
            />
            <Route path="/payments12cards" element={<Payments12cards />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/penman" element={<Penman />} />
            <Route path="/dhiwise-dashboard" element={<Home />} />
          </Routes>
        </Router>
      </React.Suspense>
    </html>
  );
};
export default ProjectRoutes;
