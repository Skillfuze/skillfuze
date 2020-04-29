/* eslint-disable no-underscore-dangle */
import axios from 'axios';

export default class LivestreamService {
  public user: undefined;

  private static _instance: LivestreamService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static get instance(): LivestreamService {
    if (!this._instance) {
      this._instance = new LivestreamService();
    }
    return this._instance;
  }

  async create(payload: any): Promise<any> {
    try {
      const res = await axios.post('/api/v1/livestreams', payload);
      return res.data;
    } catch (err) {
      throw err.response;
    }
  }
}
