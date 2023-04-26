import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { registerLicense } from '@syncfusion/ej2-base';

import { store } from './app/store';
import App from './App.jsx'
import Auth from './components/containers/auth/Auth'
import ImageEditor from './components/containers/redactor/ImageEditor'
import './index.scss'

// Registering Syncfusion license key
registerLicense(import.meta.env.VITE_REACT_APP_SYNCFUSION_LICENSE);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: 'auth',
    element: <Auth />
  },
  {
    path: 'editor',
    element: <ImageEditor />
  },
  // {
  //   path: 'auth/reset-password',
  //   element: <Reset />
  // },
  // {
  //   path: 'auth/reset-password/:token',
  //   element: <NewPassword />,
  // }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
