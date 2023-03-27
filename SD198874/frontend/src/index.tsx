import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

import router from './routes';
import './index.scss';
import MyAppContextProvider from './app-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <MyAppContextProvider>
        <RouterProvider router={router} />
      </MyAppContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
