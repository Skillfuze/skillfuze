import axios from 'axios';
import AuthService from '../src/services/auth.service';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

axios.interceptors.request.use(function (config) {
  const token = new AuthService().getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const configureErrorInterceptor = (alert: (string) => void) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 500) {
        alert('An error occured, please try again.');
      }
      return Promise.reject(error);
    },
  );
};
