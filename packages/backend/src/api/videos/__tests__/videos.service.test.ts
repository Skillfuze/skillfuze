import * as shortid from 'shortid';
import { NotFoundException } from '@nestjs/common';

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
});
