/* eslint-disable import/first */
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import { SelectPreferenceForm } from "../pages/Film/Login/selectPreferences";
import { AdminLogin } from "../pages/Admin/Login";
import AboutusPage from "../pages/Film/Public/About_Us/aboutus";
import { LoginRegisterForm } from "../pages/Film/Login/loginRegisterForm";
import { FilmPersonRegister } from "../pages/Film/Register/Filmpersonregister/filmpersonregister";
import { SelectedIndustry } from "../pages/Film/Register/Filmpersonregister/selectedindustry";
import { OTT } from "../pages/Film/Public/Ott/Ott";

import UserListing from "../pages/Admin/Users/components/UserListing";
import Jsoneditor from "../pages/Admin/jsoneditor/editor";
import Professional from "../pages/Admin/professional/professional";
import Forms from "../pages/Admin/form/Forms";

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
      <Route path="/admin/user" element={<UserListing />} />
      <Route path="/admin/form" element={<Forms />} />
      <Route path="/admin/professional" element={<Professional />} />
      <Route path="/admin/editors" element={<Jsoneditor />} />
      <Route path="/admin/user/:id" element={<Forms />} />
      {/* </Route> */}
    </Routes>
  );
}

export default RoutesMain;
