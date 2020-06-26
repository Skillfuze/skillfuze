import { NotFoundException, ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import * as slugify from 'slugify';
import * as shortid from 'shortid';

import { BlogService } from '../blog.service';
import { BlogRepository } from '../blog.repository';
import { BlogsEventEmitter } from '../blogs.eventemitter';
import config from '../../../../config';
import { Blog } from '../blog.entity';

jest.mock('../blog.repository');
jest.mock('@nestjsx/crud-typeorm');
jest.mock('shortid');
jest.mock('slugify');
jest.mock('axios');

describe('BlogService', () => {
  let updateSpy: jest.SpyInstance;

  const repository = new BlogRepository();
  const emitter = new BlogsEventEmitter();
  const service = new BlogService(repository, emitter);

  beforeEach(() => {
    updateSpy = jest.spyOn(repository, 'update');
    const nowDate = Date.now();
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return nowDate;
    });

    jest.spyOn(slugify, 'default').mockImplementation(() => {
      return 'title';
    });

    jest.spyOn(shortid, 'generate').mockImplementation(() => {
      return 'randomID';
    });
  });

  describe('publish', () => {
    const userId = 1;
    const blogId = '1';

    it('should set publish date to now', async () => {
      const blog = await service.publish(blogId, userId);
      expect(blog.publishedAt).toMatchObject(new Date(Date.now()));
      expect(updateSpy).toBeCalled();
    });

    it('should throw Forbidden on trying to publish another user blog', async () => {
      const wrongUserId = 2;
      await expect(service.publish(blogId, wrongUserId)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFound on trying to publish non existing blog', async () => {
      const wrongBlogId = '2';
      await expect(service.publish(wrongBlogId, userId)).rejects.toThrow(NotFoundException);
    });

    it('should create the correct url for the blog', async () => {
      const expectUrl = 'title-1';

      const res = await service.publish(blogId, userId);
      expect(res.url).toBe(expectUrl);
    });
  });

  describe('buildGatsby', () => {
    let buildGatsbySpy: jest.SpyInstance;

    beforeAll(() => {
      buildGatsbySpy = jest.spyOn(service, 'buildGatsby');
    });

    beforeEach(() => {
      config.gatsby.buildHookURL = 'buildHookURL';
      buildGatsbySpy.mockClear();
      ((axios.post as any) as jest.SpyInstance).mockClear();
    });

    it('should make a post request to the hook url', async () => {
      await service.buildGatsby();
      expect(axios.post).toBeCalled();
    });

    it('should not trigger a build request if hook url is empty', async () => {
      config.gatsby.buildHookURL = undefined;
      await service.buildGatsby();
      expect(axios.post).not.toBeCalled();
    });

    it('should be triggered from blog publish event', () => {
      emitter.emit('publish', {});
      expect(buildGatsbySpy).toBeCalled();
    });

    it('should be triggered from blog delete event', () => {
      emitter.emit('delete', {});
      expect(buildGatsbySpy).toBeCalled();
    });

    it('should be triggered from blog update event on published blog', () => {
      emitter.emit('update', { publishedAt: new Date(Date.now()) });
      expect(buildGatsbySpy).toBeCalled();
    });

    it('should not be triggered from blog update event on unpublished blog', () => {
      emitter.emit('update', {});
      expect(buildGatsbySpy).not.toBeCalled();
    });
  });

  describe('getUserBlogs', () => {
    const username = 'USERNAME';

    beforeAll(() => {
      jest.spyOn(repository, 'find').mockReturnValue(Promise.resolve([new Blog()]));
    });

    it('should return blogs array', async () => {
      const videos = await service.getUserBlogs(username);
      expect(videos.length).toBe(1);
      expect(videos[0]).toBeInstanceOf(Blog);
    });
  });
});
