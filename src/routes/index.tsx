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
import FilmFestivalRegistration from '../pages/Film/FilmFestival/filmFestivalRegistration'
import FilmFestivalForms from '../pages/Admin/FilmFestival/filmFestival'
import MainScreenAfterLogin from '../pages/Film/Public/MainScreenAfterLogin/mainScreenAfterLogin'
import FilmFestival from '../pages/Film/FilmFestival/filmFestival'
import AuditionsCall from '../pages/Film/AuditionCall/auditionCall'
import AuditionsCallRegistration from '../pages/Film/AuditionCall/auditionCallRegistration'
import AuditionsCallSingleMovie from '../pages/Film/AuditionCall/auditionCallSingleMovie'
import Notification from '../pages/Film/Public/Notification/notification'
import MainScreenBeforeLogin from '../pages/Film/Public/MainScreenBeforeLogin/mainscreenbeforelogin'

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

      <Route
        path="/film/filmfestival/filmfestivalregistration"
        element={<FilmFestivalRegistration />}
      />
      <Route
        path="/film/filmfestival/filmfestival"
        element={<FilmFestival />}
      />
      <Route path="/film/auditioncall/auditioncall" element={<AuditionsCall />} />
      <Route
        path="/film/auditioncall/auditioncallregistration"
        element={<AuditionsCallRegistration />}
      />
      <Route
        path="/film/auditioncall/auditioncallsinglemovie"
        element={<AuditionsCallSingleMovie />}
      />

      <Route path="/film/public/aboutus" element={<AboutusPage />} />
      <Route path="/film/public/mainscreen" element={<MainScreen />} />
      <Route path="/film/public/mainscreenafterlogin" element={<MainScreenAfterLogin />} />
      <Route path="/film/public/mainscreenbeforelogin" element={<MainScreenBeforeLogin/>} />
      <Route path="/film/public/notification" element={<Notification />} />

      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<MainScreenBeforeLogin />} />
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
      <Route
        path="/film/filmfestival/filmfestivalregistration"
        element={<FilmFestivalRegistration />}
      />
      <Route path="/admin/userlisting" element={<UserListing />} />
      <Route path="/admin/formbuilders" element={<FormsBuilder />} />
      <Route path="/admin/customform" element={<CustomForm />} />
      <Route path="/admin/professionallisting" element={<ProfessionalListing />} />
      <Route path="/admin/professionforms" element={<ProfessionForms />} />
      <Route path="/admin/masterforms" element={<MasterForms />} />
      <Route path="/admin/connectprofessionandmaster" element={<ConnectProfessionAndMaster />} />
      <Route path="/admin/filmfestivalforms" element={<FilmFestivalForms />} />
      <Route path="/admin/professionaltree" element={<ProfessionalTree />} />
      <Route path="/admin/addform" element={<AddEditForms />} />
      <Route path="/admin/editform/:id" element={<AddEditForms />} />
    </Routes>
  )
}

export default RoutesMain
