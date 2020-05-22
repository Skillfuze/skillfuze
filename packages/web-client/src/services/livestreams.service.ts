import axios from 'axios';
import { ICreateLivestreamDTO, ILivestream } from '@skillfuze/types';
import { parseError } from '../utils/parseError';

export default class LivestreamService {
  async create(payload: ICreateLivestreamDTO): Promise<ILivestream> {
    try {
      const res = await axios.post<ILivestream>('/api/v1/livestreams', payload);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  async getOne(streamId: string): Promise<ILivestream> {
    try {
      const res = await axios.get<ILivestream>(`/api/v1/livestreams/${streamId}`);
      return res.data;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }
}
