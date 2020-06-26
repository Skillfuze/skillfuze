import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from '../courses.controller';
import { CoursesService } from '../courses.service';

jest.mock('../courses.service');

describe('Courses Controller', () => {
  let controller: CoursesController;
  let service: CoursesService;
  const userId = 1;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService],
    }).compile();

    controller = module.get(CoursesController);
    service = module.get(CoursesService);
  });

  describe('createOne', () => {
    let serviceCreateSpy: jest.SpyInstance;

    beforeAll(async () => {
      serviceCreateSpy = jest.spyOn(service, 'create');
      await controller.createOne(userId, {});
    });

    it('should call service.create once with correct params', () => {
      expect(serviceCreateSpy).toBeCalledTimes(1);
      expect(serviceCreateSpy).toBeCalledWith(1, {});
    });
  });

  describe('getOne', () => {
    let serviceGetByIdOrSlugSpy: jest.SpyInstance;
    const validId = 'VALID_ID';

    beforeAll(async () => {
      serviceGetByIdOrSlugSpy = jest.spyOn(service, 'getByIdOrSlug');
      await controller.getOne(validId);
    });

    it('should call service.getBySlug once with correct params', () => {
      expect(serviceGetByIdOrSlugSpy).toBeCalledTimes(1);
      expect(serviceGetByIdOrSlugSpy).toBeCalledWith(validId);
    });
  });

  describe('deleteOne', () => {
    let serviceDeleteSpy: jest.SpyInstance;
    const validId = 'VALID_ID';

    beforeAll(async () => {
      serviceDeleteSpy = jest.spyOn(service, 'delete');
      await controller.deleteOne(userId, validId);
    });

    it('should call service.getBySlug once with correct params', () => {
      expect(serviceDeleteSpy).toBeCalledTimes(1);
      expect(serviceDeleteSpy).toBeCalledWith(userId, validId);
    });
  });

  describe('updateOne', () => {
    let serviceUpdateSpy: jest.SpyInstance;
    const validId = 'VALID_ID';
    const payload = { title: 'NEW_TITLE' };

    beforeAll(async () => {
      serviceUpdateSpy = jest.spyOn(service, 'update');
      await controller.updateOne(userId, validId, payload);
    });

    it('should call service.getBySlug once with correct params', () => {
      expect(serviceUpdateSpy).toBeCalledTimes(1);
      expect(serviceUpdateSpy).toBeCalledWith(userId, validId, payload);
    });
  });

  describe('publish', () => {
    let servicePublishSpy: jest.SpyInstance;
    const validId = 'VALID_ID';

    beforeAll(async () => {
      servicePublishSpy = jest.spyOn(service, 'publish');
      await controller.publish(validId, userId);
    });

    it('should call service.getBySlug once with correct params', () => {
      expect(servicePublishSpy).toBeCalledTimes(1);
      expect(servicePublishSpy).toBeCalledWith(validId, userId);
    });
  });
});
