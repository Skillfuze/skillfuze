import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';

jest.mock('../categories.service.ts');

describe('Categories Controller', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get(CategoriesService);
  });

  describe('getAll', () => {
    const serviceReturnValue = [{ id: 1, name: 'Category 1' }];
    let result: any;

    beforeAll(async () => {
      jest.spyOn(service, 'getAll').mockReturnValue(new Promise((resolve) => resolve(serviceReturnValue)));
      result = await controller.getAll();
    });

    it('should return all categories', () => {
      expect(result).toBe(serviceReturnValue);
    });

    it('should call service.getAll once', () => {
      expect(service.getAll).toBeCalledTimes(1);
    });
  });
});
