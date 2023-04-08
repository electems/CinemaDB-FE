import { Route, Routes } from 'react-router-dom';

import { LoginRegister } from './LoginRegister';
import { SelectPreference } from './SelectPreference';

export const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="step1" element={<SelectPreference />} />
      <Route path="step2" element={<LoginRegister />} />
    </Routes>
  );
};
