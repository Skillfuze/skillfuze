import axios from 'axios';
import { CreateLivestreamDTO, Livestream } from '@skillfuze/types';
import { parseError } from '../utils/parseError';

export default class LivestreamService {
  async create(payload: CreateLivestreamDTO): Promise<Livestream> {
    try {
      const res = await axios.post<Livestream>('/api/v1/livestreams', payload);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  async getOne(streamId: string): Promise<Livestream> {
    try {
      const res = await axios.get<Livestream>(`/api/v1/livestreams/${streamId}`);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }
}
