import { Test, TestingModule } from '@nestjs/testing';

import { LivestreamsController } from '../livestreams.controller';
import { LivestreamsService } from '../livestreams.service';
import { LivestreamsRepository } from '../livestreams.repository';

jest.mock('../livestreams.service');
jest.mock('../livestreams.repository');

describe('Livestreams Controller', () => {
  let controller: LivestreamsController;
  let service: LivestreamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivestreamsController],
      providers: [LivestreamsService, LivestreamsRepository],
    }).compile();

    controller = module.get<LivestreamsController>(LivestreamsController);
    service = module.get<LivestreamsService>(LivestreamsService);
    jest.clearAllMocks();
  });

  describe('createOne', () => {
    const createReturn = 'CREATED';
    const userId = 1;
    const payload = {
      title: 'Livestream Title',
    };
    let serviceCreateSpy: jest.SpyInstance;

    beforeEach(async () => {
      serviceCreateSpy = jest.spyOn(service, 'create');
      serviceCreateSpy.mockReturnValue(createReturn);
    });

    it('should call and return service.create', async () => {
      const res = await controller.createOne({ user: { id: userId } }, payload);
      expect(serviceCreateSpy).toBeCalledTimes(1);
      expect(res).toBe(createReturn);
    });
  });

  describe('getOne', () => {
    const getOneReturn = 'Stream';
    const streamId = '1';
    let serviceGetOneSpy: jest.SpyInstance;

    beforeEach(async () => {
      serviceGetOneSpy = jest.spyOn(service, 'getOne');
      serviceGetOneSpy.mockReturnValue(getOneReturn);
    });

    it('should call and return service.getOne', async () => {
      const res = await controller.getOne(streamId);
      expect(serviceGetOneSpy).toBeCalledTimes(1);
      expect(res).toBe(getOneReturn);
    });
  });
});
