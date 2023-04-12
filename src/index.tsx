import * as React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { AppProvider } from './providers/app';
import { AppRoutes } from '@/routes/index';


ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
