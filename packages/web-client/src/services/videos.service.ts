import axios from 'axios';
import { Video, CreateVideoDTO } from '@skillfuze/types';

import { parseError } from '../utils/parseError';

export class VideosService {
  public static async create(uploadedVideo: CreateVideoDTO): Promise<Video> {
    try {
      const { data: video } = await axios.post<Video>('api/v1/videos', uploadedVideo);
      return video;
    } catch (error) {
      throw parseError(error.response.data);
    }
  }

  public static async getOne(id: string): Promise<Video> {
    const { data: video } = await axios.get<Video>(`api/v1/videos/${id}`);
    return video;
  }

  public static async delete(id: string): Promise<void> {
    await axios.delete(`api/v1/videos/${id}`);
  }
}
