import { Test } from '@nestjs/testing';
import { BlogController } from '../blog.controller';
import { BlogService } from '../blog.service';

jest.mock('../blog.service');

describe('BlogController', () => {
  let controller: BlogController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
    }).compile();

    controller = module.get<BlogController>(BlogController);
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

    it('should create a blog with its user', async () => {
      const payload = {
        title: 'Test Title',
        content: 'test content.',
      };

      const user = {
        id: 1,
      };

      await controller.createOne(undefined, payload, { user });
      expect(createOneBaseSpy).toBeCalledWith(undefined, { ...payload, user });
    });
  });
});
