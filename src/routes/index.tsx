import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { Contatos } from "../pages/Contatos";
import ListaDeProfissionais from "../pages/DashboardOngs";
import { DashboardProfissionalSaude } from "../pages/DashboardProfissionalSaude";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import { PerfilDoProfissional } from "../pages/PerfilDoProfissional";
import SobrePage from "../pages/Sobre";
import { SelectPreferenceForm } from "../pages/Film/Login/selectPreferences";
import { AdminLogin } from "../pages/Admin/Login";
import AboutusPage from "../pages/Film/Public/About_Us/aboutus";
import { LoginRegisterForm } from "../pages/Film/Login/loginRegisterForm";
import { FilmPersonRegister } from "../pages/Film/Register/Filmpersonregister/filmpersonregister";
import { OTT } from "../pages/Film/Public/Ott/Ott";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/film/selectPreference" element={<SelectPreferenceForm />} />
      <Route path="/film/loginregister" element={<LoginRegisterForm />} />
      <Route path="/film/filmpersonregister" element={<FilmPersonRegister />} />

      <Route path="/film/public/aboutus" element={<AboutusPage />} />
      <Route path="/film/public/ott" element={<OTT />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/perfil" element={<DashboardProfissionalSaude />} />
        <Route path="/dashboard" element={<ListaDeProfissionais />} />
        <Route
          path="/visualizarPerfil/:id"
          element={<PerfilDoProfissional />}
        />
      </Route>
      <Route path="*" element={<Page404 />} />
      <Route path="/contatos" element={<Contatos />} />
      <Route path="/sobre" element={<SobrePage />} />
    </Routes>
  );
};

export default RoutesMain;
