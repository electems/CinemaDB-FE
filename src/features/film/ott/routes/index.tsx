import { Route, Routes } from 'react-router-dom';

import { OTT } from '../component/Ott';

export const OttRoutes = () => {
  return (
    <Routes>
      <Route path="ott" element={<OTT />} />
    </Routes>
  );
};
