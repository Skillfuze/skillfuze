import axios from 'axios';
import {
  UpdateLivestreamDTO,
  CreateLivestreamDTO,
  Livestream,
  PaginationOptions,
  PaginatedResponse,
} from '@skillfuze/types';
import qs from 'qs';
import { parseError } from '../utils/parseError';

export class LivestreamService {
  public static async create(payload: CreateLivestreamDTO): Promise<Livestream> {
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

  public static async delete(id: string): Promise<void> {
    try {
      await axios.delete(`api/v1/livestreams/${id}`);
    } catch (error) {
      throw parseError(error.response.data);
    }
  }

  public static async update(id: string, updatedLivestream: UpdateLivestreamDTO): Promise<Livestream> {
    try {
      const { data: livestream } = await axios.patch<Livestream>(`api/v1/livestreams/${id}`, updatedLivestream);
      return livestream;
    } catch (error) {
      throw parseError(error.response.data);
    }
  }

  public static async getAllLivestreams(options?: PaginationOptions): Promise<PaginatedResponse<Livestream>> {
    const res = await axios.get(`/api/v1/livestreams?${qs.stringify(options)}`);
    return res.data;
  }
}
