import { Route, Routes } from 'react-router-dom';

import ProductionHouse from '../forms/ProductionHouse';

export const RegistrationRoutes = () => {
  return (
    <Routes>
      <Route path="productionhouse" element={<ProductionHouse />} />
    </Routes>
  );
};
