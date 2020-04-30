/* eslint-disable react/prop-types */
import '../assets/css/reset.css';
import '../assets/css/tailwind.css';
import '../assets/css/openSans.css';
import '../assets/css/editor.css';

import React from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { Alert } from '@skillfuze/ui-components';

import '../config/axios';

const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE,
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <AlertProvider template={Alert} {...options}>
      <Component {...pageProps} />
    </AlertProvider>
  );
};

export default MyApp;
