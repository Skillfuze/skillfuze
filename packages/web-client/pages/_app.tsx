/* eslint-disable react/prop-types */
import '../assets/css/reset.css';
import '../assets/css/tailwind.css';
import '../assets/css/openSans.css';

import React from 'react';
import axios from 'axios';

const MyApp = ({ Component, pageProps }) => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  return <Component {...pageProps} />;
};
export default MyApp;
