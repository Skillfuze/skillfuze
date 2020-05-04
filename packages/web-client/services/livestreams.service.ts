import axios from 'axios';
import { parseError } from '../utils/parseError';

export default class LivestreamService {
  async create(payload: any): Promise<any> {
    try {
      const res = await axios.post('/api/v1/livestreams', payload);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  async getOne(streamId: string): Promise<any> {
    try {
      const res = await axios.get(`/api/v1/livestreams/${streamId}`);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }
}
