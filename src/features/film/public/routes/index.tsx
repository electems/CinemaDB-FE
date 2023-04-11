import { Route, Routes } from 'react-router-dom';

import { AboutUsPage } from '../component/AboutUs';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="aboutus" element={<AboutUsPage />} />
    </Routes>
  );
};
