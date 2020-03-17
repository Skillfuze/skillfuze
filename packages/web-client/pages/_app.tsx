/* eslint-disable react/prop-types */
import '../assets/css/reset.css';
import '../assets/css/tailwind.css';
import '../assets/css/openSans.css';

import React from 'react';
import axios from 'axios';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { Alert } from '@skillfuze/ui-components';

const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE,
};

const MyApp = ({ Component, pageProps }) => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  return (
    <AlertProvider template={Alert} {...options}>
      <Component {...pageProps} />
    </AlertProvider>
  );
};

export default MyApp;
