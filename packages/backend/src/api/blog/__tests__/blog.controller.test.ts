import { Test } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.entity';
import { BlogsEventEmitter } from '../blogs.eventemitter';
import { CreateBlogDTO } from '../dtos/create-blog.dto';

jest.mock('../blog.service');

describe('BlogController', () => {
  let controller: BlogController;
  let service: BlogService;
  let emitter: BlogsEventEmitter;
  let emitSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService, BlogsEventEmitter],
    }).compile();

    controller = module.get<BlogController>(BlogController);
    service = module.get<BlogService>(BlogService);
    emitter = module.get<BlogsEventEmitter>(BlogsEventEmitter);
    emitSpy = jest.spyOn(emitter, 'emit');
  });

  describe('getOne', () => {
    let findOneSpy: jest.SpyInstance;

    beforeEach(() => {
      findOneSpy = jest.fn();
      (service as any).findOne = findOneSpy;
    });

    it('should call service.findOne with the correct parameters', async () => {
      await controller.getOne('myBlogUrl');
      expect(findOneSpy).toBeCalledWith({ url: 'myBlogUrl' }, { relations: ['user'] });
    });
  });

  describe('createOne', () => {
    let createOneBaseSpy: jest.Mock;

    beforeEach(() => {
      createOneBaseSpy = jest.fn();
      const controllerBase = controller.base;
      const getBaseSpy = jest.spyOn(controller, 'base', 'get');
      getBaseSpy.mockImplementation(() => ({
        createOneBase: createOneBaseSpy,
        ...controllerBase,
      }));
    });

    it('should create a blog with the correct user', async () => {
      const payload = {
        title: 'Test Title',
        content: 'test content.',
        category: { id: 1, name: 'Category' },
      };

      const user = {
        id: 1,
      };

      await controller.createOne(undefined, payload, { user });
      expect(createOneBaseSpy).toBeCalledWith(undefined, { ...payload, user });
    });
  });

  describe('updateOne', () => {
    let updateOneBaseSpy: jest.Mock;
    let blogServiceFindOneSpy: jest.SpyInstance;
    const correctUserId = 2;

    beforeEach(() => {
      updateOneBaseSpy = jest.fn();
      const controllerBase = controller.base;
      const getBaseSpy = jest.spyOn(controller, 'base', 'get');
      getBaseSpy.mockImplementation(() => ({
        updateOneBase: updateOneBaseSpy,
        ...controllerBase,
      }));

      blogServiceFindOneSpy = jest.fn();
      Object.defineProperty(service, 'findOne', {
        get: () => blogServiceFindOneSpy,
      });

      blogServiceFindOneSpy.mockImplementation(() => {
        return {
          user: {
            id: correctUserId,
          },
        };
      });
    });

    it('should call updateOneBase with the correct params', async () => {
      const payload = {
        title: 'Updated Title',
      };

      const request = {
        user: { id: correctUserId },
        params: { id: '1' },
      };

      await controller.updateOne(undefined, payload as CreateBlogDTO, request);
      expect(updateOneBaseSpy).toBeCalledWith(undefined, payload);
    });

    it('should throw error when updating a blog with incorrect user', async () => {
      const payload = {
        title: 'Updated Title',
      };

      const wrongUserId = 1;

      const request = {
        user: { id: wrongUserId },
        params: { id: '1' },
      };

      await expect(controller.updateOne(undefined, payload as CreateBlogDTO, request)).rejects.toThrow(
        ForbiddenException,
      );

      expect(blogServiceFindOneSpy).toBeCalledWith({ id: '1' }, { relations: ['user'] });
    });

    it('should emit update event', async () => {
      const payload = {
        title: 'Updated Title',
      };

      const request = {
        user: { id: correctUserId },
        params: { id: '1' },
      };

      await controller.updateOne(undefined, payload as CreateBlogDTO, request);
      expect(emitSpy).toBeCalledWith('update', undefined);
    });
  });

  describe('deleteOne', () => {
    let deleteOneBaseSpy: jest.Mock;
    let blogServiceFindOneSpy: jest.SpyInstance;
    const correctUserId = 2;

    beforeEach(() => {
      deleteOneBaseSpy = jest.fn();
      const controllerBase = controller.base;
      const getBaseSpy = jest.spyOn(controller, 'base', 'get');
      getBaseSpy.mockImplementation(() => ({
        deleteOneBase: deleteOneBaseSpy,
        ...controllerBase,
      }));

      blogServiceFindOneSpy = jest.fn();
      Object.defineProperty(service, 'findOne', {
        get: () => blogServiceFindOneSpy,
      });

      blogServiceFindOneSpy.mockImplementation(() => {
        return {
          user: {
            id: correctUserId,
          },
        };
      });
    });

    it('should call deleteOneBase with the correct params', async () => {
      const payload = {
        id: 1,
      };

      const request = {
        user: { id: correctUserId },
        params: { id: payload.id },
      };

      await controller.deleteOne(undefined, request);
      expect(deleteOneBaseSpy).toBeCalledWith(undefined);
    });

    it('should throw error when deleting a blog with incorrect user', async () => {
      const payload = {
        id: 1,
      };

      const wrongUserId = 1;

      const request = {
        user: { id: wrongUserId },
        params: { id: payload.id },
      };

      await expect(controller.deleteOne(undefined, request)).rejects.toThrow(ForbiddenException);

      expect(blogServiceFindOneSpy).toBeCalledWith({ id: payload.id }, { relations: ['user'] });
    });

    it('should emit delete event', async () => {
      const payload = {
        id: 1,
      };

      const request = {
        user: { id: correctUserId },
        params: { id: payload.id },
      };

      await controller.deleteOne(undefined, request);
      expect(emitSpy).toBeCalledWith('delete', undefined);
    });
  });

  describe('publish', () => {
    const userId = 1;
    const blogId = '1';
    let servicePublishSpy: jest.SpyInstance;
    let blog: Blog;

    beforeEach(async () => {
      blog = await controller.publish({ user: { id: userId }, params: { id: blogId } });
      servicePublishSpy = jest.spyOn(service, 'publish');
    });

    it('should call and return service.publish', async () => {
      expect(servicePublishSpy).toBeCalledWith(blogId, userId);
      const serviceRes = service.publish(blogId, userId);
      expect(serviceRes).toBe(blog);
    });

    it('should emit publish event', async () => {
      expect(emitSpy).toBeCalledWith('publish', undefined);
    });
  });
});
