import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { Contatos } from "../pages/Contatos";
import ListaDeProfissionais from "../pages/DashboardOngs";
import { DashboardProfissionalSaude } from "../pages/DashboardProfissionalSaude";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import { PerfilDoProfissional } from "../pages/PerfilDoProfissional";
import Register from "../pages/Register";
import SobrePage from "../pages/Sobre";
import { SelectPreferenceForm } from "../pages/Film/Login/selectPreferences";
import { Admin } from "../pages/Admin";
import AboutusPage from "../pages/Film/About_Us/aboutus";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/register/:ong" element={<Register />} />
      <Route path="/selectPreference" element={<SelectPreferenceForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Admin />} />
       <Route path="/about" element={<AboutusPage />} />
      

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
