import * as shortid from 'shortid';
import { NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { CreateVideoDTO } from '../dtos/create-video.dto';
import { Video } from '../video.entity';
import { VideosService } from '../videos.service';
import { VideosRepository } from '../videos.repository';

jest.mock('shortid');
jest.mock('../videos.repository');

describe('VideosService', () => {
  let service: VideosService;
  let repository: VideosRepository;
  const shortIdReturn = 'randomID';

  beforeAll(async () => {
    repository = new VideosRepository();
    service = new VideosService(repository);
    jest.spyOn(shortid, 'generate').mockImplementation(() => {
      return shortIdReturn;
    });
  });

  describe('create', () => {
    let repoSaveSpy: jest.SpyInstance;
    let video;
    const userId = 1;
    const payload = {
      title: 'Video Title',
      description: 'Video Description',
    };

    beforeAll(async () => {
      repoSaveSpy = jest.spyOn(repository, 'save');
      video = await service.create(userId, payload as CreateVideoDTO);
    });

    it('should return a video on valid data', async () => {
      expect(video).toBeInstanceOf(Video);
    });

    it('should return the user data with the video on valid data', async () => {
      expect(video.uploader).not.toBeUndefined();
    });

    it('should set the video.id to shortid', async () => {
      expect(video.id).toBe(shortIdReturn);
    });

    it('should call repository.save once', async () => {
      expect(repoSaveSpy).toBeCalledTimes(1);
    });
  });

  describe('getOne', () => {
    const validId = '1';
    const invalidId = 'invalidId';

    it('should return the video on valid id', async () => {
      const video = await service.getOne(validId);
      expect(video).toBeInstanceOf(Video);
    });

    it('should return the video.uploader with the video on valid id', async () => {
      const video = await service.getOne(validId);
      expect(video.uploader).toBeInstanceOf(User);
      expect(video.uploader.id).not.toBe(undefined);
    });

    it('should throw NotFound Exception on invalid id', async () => {
      await expect(service.getOne(invalidId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    const userId = 1;
    const videoId = '1';
    const video = {
      title: 'Video Title',
      uploader: {
        id: userId,
      },
    };
    let res: HttpStatus;
    let getOneSpy: jest.SpyInstance;
    let repoSoftDeleteSpy: jest.SpyInstance;

    beforeEach(async () => {
      jest.clearAllMocks();
      repoSoftDeleteSpy = jest.spyOn(repository, 'softDelete');
      getOneSpy = jest.spyOn(service, 'getOne');
      getOneSpy.mockReturnValue(video);

      res = await service.delete(userId, videoId);
    });

    it('should call getOne once', async () => {
      expect(getOneSpy).toBeCalledTimes(1);
    });

    it('should call repo.softDelete once', async () => {
      expect(repoSoftDeleteSpy).toBeCalledTimes(1);
    });

    it('should return HttpStatus.OK (200)', async () => {
      expect(res).toBe(HttpStatus.OK);
    });

    it('should throw forbiddenException when userId not equal video.uploader.id', async () => {
      await expect(service.delete(2, videoId)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getUserVideos', () => {
    const username = 'USERNAME';

    beforeAll(() => {
      jest.spyOn(repository, 'findAndCount').mockReturnValue(Promise.resolve([[new Video()], 1]));
    });

    it('should return videos array and count = 1', async () => {
      const res = await service.getUserVideos(username);
      expect(res.data[0]).toBeInstanceOf(Video);
      expect(res.count).toBe(1);
    });
  });

  describe('update', () => {
    const userId = 1;
    const videoId = '1';
    const video = {
      title: 'Video Title',
      uploader: {
        id: userId,
      },
    };
    const payload = {
      id: videoId,
      title: 'Video updated',
      category: { id: 1, name: 'category' },
      uploader: {
        id: userId,
      },
    };
    let res: Video;
    let getOneSpy: jest.SpyInstance;
    let repoUpdateSpy: jest.SpyInstance;
    let repoFindOneSpy: jest.SpyInstance;

    beforeEach(async () => {
      jest.clearAllMocks();
      getOneSpy = jest.spyOn(service, 'getOne');
      repoUpdateSpy = jest.spyOn(repository, 'update');
      repoFindOneSpy = jest.spyOn(repository, 'findOne');
      repoFindOneSpy.mockReturnValue(payload);
      getOneSpy.mockReturnValue(video);

      res = await service.update(userId, videoId, payload);
    });

    it('should call getOne once', async () => {
      expect(getOneSpy).toBeCalledTimes(1);
    });

    it('should call repo.update once', async () => {
      expect(repoUpdateSpy).toBeCalledTimes(1);
    });

    it('should throw forbiddenException when userId not equal video.uploader.id', async () => {
      await expect(service.update(2, videoId, payload)).rejects.toThrow(ForbiddenException);
    });

    it('should call repo.findOne and return the updated video', async () => {
      expect(repoFindOneSpy).toBeCalledTimes(1);
      expect(res).toBe(payload);
    });
  });

  describe('addView', () => {
    const videoId = '1';
    const userId = 1;
    let getOneSpy: jest.SpyInstance;
    const video = {
      title: 'Video Title',
      views: 0,
      uploader: {
        id: userId,
      },
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      getOneSpy = jest.spyOn(service, 'getOne');
      getOneSpy.mockReturnValue(video);

      await service.addView(videoId);
    });

    it('should call getOne once', async () => {
      expect(getOneSpy).toBeCalledTimes(1);
    });
  });
});
