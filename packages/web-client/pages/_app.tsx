/* eslint-disable react/prop-types */
import '../assets/css/reset.css';
import '../assets/css/tailwind.css';
import '../assets/css/openSans.css';

import React, { useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  useEffect(() => {
    console.log(pageProps.user);
    if (pageProps.user) {
      Router.push('/');
    }
  }, []);
  return <Component {...pageProps} />;
};

export default MyApp;
