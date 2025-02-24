import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyles from './styles/globalStyles'
import { router } from './routes';

import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppProvider from './hooks';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AppProvider>
    <RouterProvider router={router} />
   <GlobalStyles />
   <ToastContainer autoClos={2000} theme='dark'/>
   </AppProvider>
  </  React.StrictMode>
);
