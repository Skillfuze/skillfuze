/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { UserLoginDTO, LoginResponseDTO, UserRegisterDTO, User } from '@skillfuze/types';
import { parseError } from '../utils/parseError';

export default class AuthService {
  async login(payload: UserLoginDTO): Promise<LoginResponseDTO> {
    try {
      const res = await axios.post<LoginResponseDTO>('/api/v1/auth/login', payload);
      return res.data;
    } catch (err) {
      throw err.response;
    }
  }

  async register(payload: UserRegisterDTO): Promise<User> {
    try {
      const res = await axios.post<User>('/api/v1/auth/register', payload);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  decodeJWT(token: string): User {
    return jwtDecode<User>(token);
  }

  setToken(token: string): void {
    Cookie.set('token', token, { expires: 1 });
  }

  getToken(): string {
    return Cookie.get('token');
  }

  public static logout(): void {
    Cookie.remove('token');
    Router.reload();
  }
}
