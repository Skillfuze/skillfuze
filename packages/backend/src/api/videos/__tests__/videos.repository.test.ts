import { VideosRepository } from '../videos.repository';

describe('VideosRepository', () => {
  it('should create new instance', () => {
    const repo = new VideosRepository();
    expect(repo).toBeInstanceOf(VideosRepository);
  });
});
