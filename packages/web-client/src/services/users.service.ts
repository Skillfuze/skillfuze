import { User, Video, Blog } from '@skillfuze/types';
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

export class UsersService {
  static async getProfileInfo(username: string): Promise<User> {
    const res = await axios.get(`/api/v1/users/${username}/profile`);
    return res.data;
  }

  static async getVideos(username: string): Promise<Video[]> {
    const res = await axios.get(`/api/v1/users/${username}/videos`);
    return res.data;
  }

  static async getBlogs(username: string): Promise<Blog[]> {
    const res = await axios.get(`/api/v1/users/${username}/blogs`);
    return res.data;
  }
}
