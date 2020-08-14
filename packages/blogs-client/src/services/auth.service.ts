import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { UserTokenPayload } from '@skillfuze/types';

export default class AuthService {
  public static getUser(): UserTokenPayload | undefined {
    return this.decodeJWT(this.getToken());
  }

  private static decodeJWT(token: string): UserTokenPayload | undefined {
    try {
      return jwtDecode<UserTokenPayload>(token);
    } catch (error) {
      return undefined;
    }
  }

  private static getToken(): string {
    return Cookie.get('token') as string;
  }

  public static logout(): void {
    Cookie.remove('token');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
}
