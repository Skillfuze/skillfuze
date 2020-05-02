import { NotFoundException } from '@nestjs/common';
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
            password: 'password',
            email: 'karim@gmail.com',
          };
          return stream;
        }
        return undefined;
      });
    });

    it('should return livestream data without streamKey on valid id', async () => {
      const res = await service.getOne('1');
      expect(res).toBeInstanceOf(Livestream);
      expect(res).not.toHaveProperty('streamKey');
    });

    it('should call findOne, fetch streamer and delete password', async () => {
      const res = await service.getOne('1');
      expect(repoFindOneSpy).toBeCalledWith('1', { relations: ['streamer'] });
      expect(res.streamer).not.toHaveProperty('password');
    });

    it('should throw 404 error when id is invalid', async () => {
      await expect(service.getOne('2')).rejects.toThrow(NotFoundException);
    });
  });
});
