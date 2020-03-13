/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../assets/css/reset.css';
import '../assets/css/tailwind.css';
import '../assets/css/openSans.css';

import React from 'react';

interface Props {
  Component: any;
  pageProps: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default MyApp;
