import axios from 'axios';
import { parseError } from '../utils/parseError';

export class VideosService {
  public static async create(uploadedVideo: any): Promise<any> {
    try {
      const { data: video } = await axios.post('api/v1/videos', uploadedVideo);
      return video;
    } catch (error) {
      throw parseError(error.response.data);
    }
  }

  public static async getOne(id: string): Promise<any> {
    const { data: video } = await axios.get(`api/v1/videos/${id}`);
    return video;
  }
}
