import { User } from '@skillfuze/types';
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

export class UsersService {
  static async getProfileInfo(username: string): Promise<User> {
    const res = await axios.get(`/api/v1/users/${username}/profile`);
    return res.data;
  }
}
