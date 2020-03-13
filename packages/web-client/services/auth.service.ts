/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthService {
  public user: null;

  private static _instance: AuthService;

  public static get instance(): AuthService {
    if (this._instance === undefined) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  async login(payload: any): Promise<any> {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/login', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  }

  decodeJWT(token: string): any {
    try {
      return jwtDecode(token);
    } catch (err) {
      return err;
    }
  }
}
export default new AuthService();
