import axios from 'axios';
import { HomeResponseDTO } from '@skillfuze/types';

export class HomeService {
  public static async getAll(): Promise<HomeResponseDTO> {
    const { data } = await axios.get<HomeResponseDTO>(`api/v1/home`);
    return data;
  }
}
