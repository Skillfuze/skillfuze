import { NotFoundException, ForbiddenException } from '@nestjs/common';
import * as shortid from 'shortid';
import { Livestream } from '../livestream.entity';

import { LivestreamsService } from '../livestreams.service';
import { LivestreamsRepository } from '../livestreams.repository';

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
      category: { id: 1, name: 'Category' },
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

    it('should call shortid.generate 3 times', async () => {
      await service.create(userId, payload);
      expect(shortid.generate).toBeCalledTimes(3);
    });

    it('should call repository.save once', async () => {
      await service.create(userId, payload);
      expect(repoSaveSpy).toBeCalledTimes(1);
    });
  });

  describe('getOne', () => {
    let repoFindOneSpy: jest.SpyInstance;

    beforeEach(() => {
      repoFindOneSpy = jest.spyOn(repository, 'findOne');
      repoFindOneSpy.mockImplementation((id: string) => {
        if (id === '1') {
          const stream = new Livestream();
          stream.id = '1';
          stream.streamer = {
            id: 1,
            firstName: 'Karim',
            lastName: 'Elsayed',
            email: 'karim@gmail.com',
            username: '',
            bio: '',
            avatarURL: '',
          };
          return stream;
        }
        return undefined;
      });
    });

    it('should return livestream data on valid id', async () => {
      const res = await service.getOne('1');
      expect(res).toBeInstanceOf(Livestream);
    });

    it('should call findOne, fetch streamer', async () => {
      await service.getOne('1');
      expect(repoFindOneSpy).toBeCalledWith('1', { relations: ['streamer', 'category'] });
    });

    it('should throw 404 error when id is invalid', async () => {
      await expect(service.getOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('isValidKey', () => {
    const validKey = 'validKey';
    const nonExistingKey = '404Key';
    const oldKey = 'oldKey';

    beforeEach(() => {
      jest.spyOn(repository, 'findOne').mockImplementation(((payload: any) => {
        if (payload.streamKey === validKey) {
          return {
            createdAt: new Date(Date.now()),
          };
        }
        if (payload.streamKey === oldKey) {
          return {
            createdAt: new Date(Date.parse('February 18, 2018 12:30 PM')),
          };
        }

        return undefined;
      }) as any);
    });

    it('should return true on valid key', async () => {
      expect(await service.isValidKey(validKey)).toBe(true);
    });

    it('should return false on non-existing key', async () => {
      expect(await service.isValidKey(nonExistingKey)).toBe(false);
    });

    it('should return false on key created before 24 hours', async () => {
      expect(await service.isValidKey(oldKey)).toBe(false);
    });
  });

  describe('start', () => {
    const validStreamKey = 'validStreamKey';
    const inValidStreamKey = 'inValidStreamKey';

    beforeEach(() => {
      jest.spyOn(repository, 'findOne').mockImplementation(((payload: any) => {
        if (payload.streamKey === validStreamKey) {
          return {
            createdAt: new Date(Date.now()),
          };
        }

        return undefined;
      }) as any);

      jest.spyOn(repository, 'save').mockImplementation((payload => payload) as any);
    });

    it('should set stream.isLive to true given an existing key', async () => {
      const stream = await service.start(validStreamKey);
      expect(stream.isLive).toBe(true);
    });

    it('should call repository.save given a valid key', async () => {
      await service.start(validStreamKey);
      expect(repository.save).toBeCalledTimes(1);
    });

    it('should throw NotFoundException given a non-existing key', async () => {
      await expect(service.start(inValidStreamKey)).rejects.toThrow(NotFoundException);
    });
  });

  describe('stop', () => {
    const validStreamKey = 'validStreamKey';
    const inValidStreamKey = 'inValidStreamKey';

    beforeEach(() => {
      jest.spyOn(repository, 'findOne').mockImplementation(((payload: any) => {
        if (payload.streamKey === validStreamKey) {
          return {
            createdAt: new Date(Date.now()),
            streamKey: 'I am not undefined',
          };
        }

        return undefined;
      }) as any);

      jest.spyOn(repository, 'save').mockImplementation((payload => payload) as any);
    });

    it('should set stream.isLive to false given an existing key', async () => {
      const stream = await service.stop(validStreamKey);
      expect(stream.isLive).toBe(false);
    });

    it('should remove streamKey given an existing key', async () => {
      const stream = await service.stop(validStreamKey);
      expect(stream.streamKey).toBe(null);
    });

    it('should call repository.save given a valid key', async () => {
      await service.stop(validStreamKey);
      expect(repository.save).toBeCalledTimes(1);
    });

    it('should throw NotFoundException given a non-existing key', async () => {
      await expect(service.stop(inValidStreamKey)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUserCurrentStream', () => {
    const LiveUserId = 1;
    const notLiveUserId = 2;
    const livestream = {
      title: 'Livestream Title',
      description: 'Livestream Description',
      category: { id: 1, name: 'Category' },
      isLive: false,
    };

    beforeAll(async () => {
      await service.create(notLiveUserId, livestream);
      livestream.isLive = true;
      await service.create(LiveUserId, livestream);
    });
    beforeEach(() => {
      jest.spyOn(repository, 'findOne').mockImplementation((payload: any) => {
        if (payload.where.streamer === LiveUserId) return payload;
        return undefined;
      });
    });

    it('should return the current Livestream for the given userId if found', async () => {
      const res = await service.getUserCurrentStream(LiveUserId);
      expect(res).not.toBeUndefined();
    });

    it('should return undefined when the given userId isnot currently live', async () => {
      const res = await service.getUserCurrentStream(notLiveUserId);
      expect(res).toBeUndefined();
    });

    it('should call findOne once with the select query', async () => {
      await service.getUserCurrentStream(LiveUserId);

      expect(repository.findOne).toBeCalledTimes(1);
      expect(repository.findOne).toBeCalledWith({
        where: { streamer: LiveUserId, isLive: true },
      });
    });
  });

  describe('update', () => {
    const userId = 1;
    const streamId = '1';
    const stream = {
      title: 'stream Title',
      streamer: {
        id: userId,
      },
    };
    let res: Livestream;
    let getOneSpy: jest.SpyInstance;
    let repoUpdateSpy: jest.SpyInstance;
    let repoFindOneSpy: jest.SpyInstance;
    const payload = {
      id: streamId,
      title: 'stream updated',
      category: { id: 1, name: 'category' },
      streamer: {
        id: userId,
      },
    };
    beforeEach(async () => {
      getOneSpy = jest.spyOn(service, 'getOne');
      repoUpdateSpy = jest.spyOn(repository, 'update');
      repoFindOneSpy = jest.spyOn(repository, 'findOne');
      repoFindOneSpy.mockReturnValue(payload);
      getOneSpy.mockReturnValue(stream);
      res = await service.update(userId, streamId, payload);
    });

    it('should call getOne once', async () => {
      expect(getOneSpy).toBeCalledTimes(1);
    });

    it('should throw forbiddenException when userId not equal stream.streamer.id', async () => {
      await expect(service.update(2, streamId, payload)).rejects.toThrow(ForbiddenException);
    });

    it('should call repo.update once', async () => {
      expect(repoUpdateSpy).toBeCalledTimes(1);
    });

    it('should call repo.findOne and return the updated stream', async () => {
      expect(repoFindOneSpy).toBeCalledTimes(1);
      expect(res).toBe(payload);
    });
  });
});
