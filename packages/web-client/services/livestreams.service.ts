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
}
