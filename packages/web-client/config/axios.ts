import axios from 'axios';
import AuthService from '../services/auth.service';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const token = AuthService.instance.getToken();
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common.Authorization;
}
