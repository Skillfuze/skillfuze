import axios from 'axios';
import AuthService from '../src/services/auth.service';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const token = new AuthService().getToken();
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common.Authorization;
}
