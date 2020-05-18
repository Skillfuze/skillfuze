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
}
