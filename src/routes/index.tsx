/* eslint-disable import/first */
import { Route, Routes } from 'react-router-dom'

import Page404 from '../pages/Page404'
import { SelectPreferenceForm } from '../pages/Film/Login/selectPreferences'
import { AdminLogin } from '../pages/Admin/Login'
import AboutusPage from '../pages/Film/Public/About_Us/aboutus'
import { LoginRegisterForm } from '../pages/Film/Login/loginRegisterForm'
import { FilmPersonRegister } from '../pages/Film/Register/Filmpersonregister/filmpersonregister'
import { SelectedIndustry } from '../pages/Film/Register/Filmpersonregister/selectedindustry'
import { MainScreen } from '../pages/Film/Public/MainScreen/mainscreen'
import UserListing from '../pages/Admin/Users/components/UserListing'
import ProfessionalTree from '../pages/Admin/ProfessionalTree/professionalTree'
import FormsBuilder from '../pages/FormBuilder/FormsBuilder'
import ProfessionForms from '../pages/Admin/ProfessionForms/ProfessionForms'
import AddEditForms from '../pages/Admin/DynamicForms/addEditForms'
import ProfessionalListing from '../pages/Admin/ProfessionalListing/professional'
import { SubCategoryUserForm } from '../pages/Film/Register/Filmpersonregister/subcategoryuserForm'
import MasterForms from '../pages/Admin/MasterForms/masterforms'
import ConnectProfessionAndMaster from '../pages/Admin/ConnectProfessionAndMaster/connectprofessionandmaster'
import { CustomForm } from '../pages/Admin/CustomForm/app'
import { CinemaFansForm } from '../pages/Film/Register/Filmpersonregister/cinemafansregister'
const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/film/login/selectpreference" element={<SelectPreferenceForm />} />
      <Route path="/film/login/loginregister" element={<LoginRegisterForm />} />
      <Route
        path="/film/register/filmpersonregister"
        element={<FilmPersonRegister />}
      />
      <Route
        path="/film/register/subcategoryuserform"
        element={<SubCategoryUserForm />}
      />

      <Route
        path="/film/register/cinemafansform"
        element={<CinemaFansForm />}
      />

      <Route
        path="/film/register/selectedindustry"
        element={<SelectedIndustry />}
      />
      <Route path="/film/public/aboutus" element={<AboutusPage />} />
      <Route path="/film/public/mainscreen" element={<MainScreen />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export const RoutesAdmin = () => {
  return (
    <Routes>
       <Route
        path="/film/register/subcategoryuserform"
        element={<SubCategoryUserForm />}
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/userlisting" element={<UserListing />} />
      <Route path="/admin/formbuilders" element={<FormsBuilder />} />
      <Route path="/admin/customform" element={<CustomForm />} />
      <Route path="/admin/professionallisting" element={<ProfessionalListing />} />
      <Route path="/admin/professionforms" element={<ProfessionForms />} />
      <Route path="/admin/masterforms" element={<MasterForms />} />
      <Route path="/admin/connectprofessionandmaster" element={<ConnectProfessionAndMaster />} />
      <Route path="/admin/professionaltree" element={<ProfessionalTree />} />
      <Route path="/admin/addform" element={<AddEditForms />} />
      <Route path="/admin/editform/:id" element={<AddEditForms />} />
    </Routes>
  )
}

export default RoutesMain
