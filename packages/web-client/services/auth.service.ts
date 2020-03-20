/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { parseError } from '../utils/parseError';

export default class AuthService {
  public user: undefined;

  private static _instance: AuthService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // public static getInstance(): AuthService {
  //   if (!this._instance) {
  //     this._instance = new AuthService();
  //   }
  //   return this._instance;
  // }

  static get instance(): AuthService {
    if (!this._instance) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  async login(payload: any): Promise<any> {
    try {
      const res = await axios.post('/api/v1/auth/login', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  }

  async register(payload: any): Promise<any> {
    try {
      const res = await axios.post('/api/v1/auth/register', payload);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  decodeJWT(token: string): any {
    return jwtDecode(token);
  }

  setToken(token: string): void {
    Cookie.set('token', token, { expires: 1 });
  }

  getToken(): string {
    return Cookie.get('token');
  }

  logout = () => {
    Cookie.remove('token');
    Router.push('/login');
  };
}
