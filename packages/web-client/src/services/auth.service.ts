/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { IUserLoginDTO, ILoginResponseDTO, IUserRegisterDTO, IUser } from '@skillfuze/types';
import { parseError } from '../utils/parseError';

export default class AuthService {
  async login(payload: IUserLoginDTO): Promise<ILoginResponseDTO> {
    try {
      const res = await axios.post<ILoginResponseDTO>('/api/v1/auth/login', payload);
      return res.data;
    } catch (err) {
      throw err.response;
    }
  }

  async register(payload: IUserRegisterDTO): Promise<IUser> {
    try {
      const res = await axios.post<IUser>('/api/v1/auth/register', payload);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  decodeJWT(token: string): IUser {
    return jwtDecode<IUser>(token);
  }

  setToken(token: string): void {
    Cookie.set('token', token, { expires: 1 });
  }

  getToken(): string {
    return Cookie.get('token');
  }

  logout = (): void => {
    Cookie.remove('token');
    Router.push('/login');
  };
}
