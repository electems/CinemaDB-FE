/* eslint-disable import/first */
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";;
import { SelectPreferenceForm } from "../pages/Film/Login/selectPreferences";
import { AdminLogin } from "../pages/Admin/Login";
import AboutusPage from "../pages/Film/Public/About_Us/aboutus";
import { LoginRegisterForm } from "../pages/Film/Login/loginRegisterForm";
import { FilmPersonRegister } from "../pages/Film/Register/Filmpersonregister/filmpersonregister";
import { SelectedIndustry } from "../pages/Film/Register/Filmpersonregister/selectedindustry";
import { OTT } from "../pages/Film/Public/Ott/Ott";
import Forms from "../pages/Admin/Forms/Forms";
import UserListing from "../pages/Admin/Users/components/UserListing";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/film/selectPreference" element={<SelectPreferenceForm />} />
      <Route path="/film/login/loginregister" element={<LoginRegisterForm />} />
      <Route
        path="/film/register/filmpersonregister"
        element={<FilmPersonRegister />}
      />
      <Route
        path="/film/register/Adagency/Promoter"
        element={<SelectedIndustry />}
      />

      <Route path="/film/public/aboutus" element={<AboutusPage />} />
      <Route path="/film/public/ott" element={<OTT />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};


export const RoutesAdmin = () => {
  return (
    <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
     
      {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/admin/form" element={<Forms />} />
        <Route path="/admin/user/:id" element={<Forms />} />
        <Route path="/admin/user" element={<UserListing />} />

      {/* </Route> */}
    </Routes>
  );
};


export default RoutesMain;
