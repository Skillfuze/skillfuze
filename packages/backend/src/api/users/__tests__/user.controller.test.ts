import { LivestreamsRepository } from '../../livestreams/livestreams.repository';
import { HashingService } from '../../auth/services/hashing.service';
import { LivestreamsService } from '../../livestreams/livestreams.service';
import { UsersController } from '../user.controller';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { VideosService } from '../../videos/videos.service';
import { VideosRepository } from '../../videos/videos.repository';
import { BlogService } from '../../blog/blog.service';
import { BlogRepository } from '../../blog/blog.repository';
import { BlogsEventEmitter } from '../../blog/blogs.eventemitter';

jest.mock('../user.repository');
jest.mock('../user.service');
jest.mock('../../blog/blog.service');
jest.mock('../../videos/videos.service');

describe('User Controller', () => {
  let userService: UserService;
  let controller: UsersController;

  beforeAll(() => {
    userService = new UserService(
      new UserRepository(),
      new HashingService(),
      new LivestreamsService(new LivestreamsRepository()),
    );
    controller = new UsersController(
      userService,
      new VideosService(new VideosRepository()),
      new BlogService(new BlogRepository(), new BlogsEventEmitter()),
    );
  });

  describe('getUser', () => {
    let getProfileInfoSpy: jest.SpyInstance;
    beforeAll(() => {
      getProfileInfoSpy = jest.spyOn(userService, 'getProfileInfo');
      getProfileInfoSpy.mockReturnValue('User');
    });

    it('should return a user on valid username', async () => {
      const res = await controller.getProfile('username');
      expect(res).toBe('User');
    });
  });
});
