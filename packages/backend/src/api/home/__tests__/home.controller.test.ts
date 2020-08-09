import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from '../home.controller';
import { HomeService } from '../home.service';

jest.mock('../home.service');

describe('Home Controller', () => {
  let controller: HomeController;
  let serviceSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeService],
    }).compile();

    controller = module.get<HomeController>(HomeController);
    serviceSpy = jest.spyOn(module.get(HomeService), 'getRecommendedMaterial');
  });

  it('should call the service once', async () => {
    await controller.getRecommendations();
    expect(serviceSpy).toBeCalledTimes(1);
  });
});
