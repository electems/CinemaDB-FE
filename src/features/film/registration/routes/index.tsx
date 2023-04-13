import { Route, Routes } from 'react-router-dom';

import { App } from '../component/filmpersonregister';
import Header from '../component/filmregisterselectedindustry';

export const FilmRoutes = () => {
  const url = 'Ad agency/ Promoter';
  return (
    <Routes>
      <Route path="film" element={<App />} />
      <Route path={url} element={<Header />} />
    </Routes>
  );
};
