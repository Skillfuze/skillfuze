import * as shortid from 'shortid';

import { LivestreamsService } from '../livestreams.service';
import { LivestreamsRepository } from '../livestreams.repository';
import { Livestream } from '../livestream.entity';

jest.mock('shortid');
jest.mock('../livestreams.repository');

describe('LivestreamsService', () => {
  let service: LivestreamsService;
  let repository: LivestreamsRepository;

  beforeEach(async () => {
    repository = new LivestreamsRepository();
    service = new LivestreamsService(repository);

    jest.clearAllMocks();
  });

  describe('create', () => {
    let repoSaveSpy: jest.SpyInstance;
    const shortIdReturn = 'randomID';
    const userId = 1;
    const payload = {
      title: 'Livestream Title',
      description: 'Livestream Description',
    };

    beforeEach(() => {
      jest.spyOn(shortid, 'generate').mockImplementation(() => {
        return shortIdReturn;
      });

      repoSaveSpy = jest.spyOn(repository, 'save');
    });

    it('should return livestream on successful create', async () => {
      const stream = await service.create(userId, payload);
      expect(stream).toBeInstanceOf(Livestream);
    });

    it('should return set streamKey on successful create', async () => {
      const stream = await service.create(userId, payload);
      expect(stream.streamKey).toBe(shortIdReturn);
    });

    it('should call shortid.generate twice', async () => {
      await service.create(userId, payload);
      expect(shortid.generate).toBeCalledTimes(2);
    });

    it('should call repository.save once', async () => {
      await service.create(userId, payload);
      expect(repoSaveSpy).toBeCalledTimes(1);
    });
  });
});
