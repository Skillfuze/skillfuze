import { VideosController } from '../videos.controller';
import { VideosService } from '../videos.service';
import { VideosRepository } from '../videos.repository';
import { CreateVideoDTO } from '../dtos/create-video.dto';

jest.mock('../videos.repository');
jest.mock('../videos.service');

describe('Videos Controller', () => {
  let controller: VideosController;
  let service: VideosService;
  let repository: VideosRepository;
  beforeEach(async () => {
    repository = new VideosRepository();
    service = new VideosService(repository);
    controller = new VideosController(service);
    jest.clearAllMocks();
  });

  describe('createOne', () => {
    const createReturn = 'CREATED';
    let res;
    const userId = 1;
    const payload = {
      title: 'Video Title',
    };
    let serviceCreateSpy: jest.SpyInstance;
    beforeEach(async () => {
      serviceCreateSpy = jest.spyOn(service, 'create');
      serviceCreateSpy.mockReturnValue(createReturn);
      res = await controller.createOne({ user: { id: userId } }, payload as CreateVideoDTO);
    });

    it('should call service.create once', async () => {
      expect(serviceCreateSpy).toBeCalledTimes(1);
    });

    it('should  return service.create', async () => {
      expect(res).toBe(createReturn);
    });
  });
});
