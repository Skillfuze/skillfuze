import axios from 'axios';
import { LivestreamDTO, Livestream } from '@skillfuze/types';
import { parseError } from '../utils/parseError';

export class LivestreamService {
  public static async create(payload: LivestreamDTO): Promise<Livestream> {
    try {
      const res = await axios.post<Livestream>('/api/v1/livestreams', payload);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  public static async getOne(streamId: string): Promise<Livestream> {
    try {
      const res = await axios.get<Livestream>(`/api/v1/livestreams/${streamId}`);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  public static async update(id: string, updatedLivestream: LivestreamDTO): Promise<Livestream> {
    try {
      const { data: livestream } = await axios.patch<Livestream>(`api/v1/livestreams/${id}`, updatedLivestream);
      return livestream;
    } catch (error) {
      throw parseError(error.response.data);
    }
  }
}
