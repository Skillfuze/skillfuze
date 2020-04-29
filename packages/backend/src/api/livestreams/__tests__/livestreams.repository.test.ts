import { LivestreamsRepository } from '../livestreams.repository';

describe('LivestreamsRepository', () => {
  it('should create new instance', () => {
    const repo = new LivestreamsRepository();
    expect(repo).toBeInstanceOf(LivestreamsRepository);
  });
});
