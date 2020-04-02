import { NotFoundException, ForbiddenException } from '@nestjs/common';
import * as slugify from 'slugify';
import * as shortid from 'shortid';

import { BlogService } from '../blog.service';
import { BlogRepository } from '../blog.repository';

jest.mock('../blog.repository');
jest.mock('@nestjsx/crud-typeorm');
jest.mock('shortid');
jest.mock('slugify');

describe('BlogService', () => {
  let updateSpy: jest.SpyInstance;

  const repository = new BlogRepository();
  const service = new BlogService(repository);

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
    const blogId = 1;

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
      const wrongBlogId = 2;
      await expect(service.publish(wrongBlogId, userId)).rejects.toThrow(NotFoundException);
    });

    it('should create the correct url for the blog', async () => {
      const expectUrl = 'title-randomID';

      const res = await service.publish(blogId, userId);
      expect(res.url).toBe(expectUrl);
    });
  });
});
