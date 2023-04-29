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
import React from 'react'
import FormListing from '../pages/Admin/FormListing/formlisting'
import AddEditForms from '../pages/Admin/DynamicForms/addEditForms'
import ProfessionalListing from '../pages/Admin/ProfessionalListing/professional'
import { SubCategoryUserForm } from '../pages/Film/Register/Filmpersonregister/subcategoryuserForm'

const RoutesMain = () => {
  return (
      <Routes>
        <Route path="/film/selectPreference" element={<SelectPreferenceForm />} />
        <Route path="/film/login/loginregister" element={<LoginRegisterForm />} />
        <Route
          path="/film/register/filmpersonregister"
          element={<FilmPersonRegister />}
        />
         <Route
          path="/film/register/subcategoryuserForm"
          element={<SubCategoryUserForm />}
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
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/admin/userListing" element={<UserListing />} />
        <Route path="/admin/formbuilders" element={<FormsBuilder />} />
        <Route path="/admin/professionalListing" element={<ProfessionalListing />} />
        <Route path="/admin/formlisitng" element={<FormListing />} />
        <Route path="/admin/professionalTree" element={<ProfessionalTree />} />
        <Route path="/admin/addForm" element={<AddEditForms/>} />
        <Route path="/admin/editForm/:id" element={<AddEditForms/>} />
        {/* </Route> */}
      </Routes>
  )
}

export default RoutesMain
