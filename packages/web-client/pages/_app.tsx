/* eslint-disable react/prop-types */
import '../assets/css/reset.css';
import '../assets/css/tailwind.css';
import '../assets/css/openSans.css';

import React, { useEffect } from 'react';
import axios from 'axios';
import AuthService from '../services/auth.service';

const MyApp = ({ Component, pageProps }) => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  const authService = AuthService.getInstance();
  useEffect(() => {
    const token = authService.getToken();
    authService.user = authService.decodeJWT(token);
  }, []);
  return <Component {...pageProps} />;
};
export default MyApp;
