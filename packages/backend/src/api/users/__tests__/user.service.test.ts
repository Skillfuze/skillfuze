import { NotFoundException } from '@nestjs/common';
import { LivestreamsRepository } from '../../livestreams/livestreams.repository';
import { LivestreamsService } from '../../livestreams/livestreams.service';
import { HashingService } from '../../auth/services/hashing.service';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

jest.mock('../user.repository');
jest.mock('../../livestreams/livestreams.service');
jest.mock('../../auth/services/hashing.service');

describe('User Service', () => {
  let service: UserService;
  let hashingService: HashingService;
  let livestreamService: LivestreamsService;
  beforeAll(async () => {
    hashingService = new HashingService();
    livestreamService = new LivestreamsService(new LivestreamsRepository());
    service = new UserService(new UserRepository(), hashingService, livestreamService);
  });

  describe('register', () => {
    let hashPasswordSpy: jest.SpyInstance;
    const hashedPassword = 'hashed';
    const payload = {
      firstName: 'Khaled',
      lastName: 'Mohamed',
      email: 'khaled@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };

    beforeEach(() => {
      hashPasswordSpy = jest.spyOn(hashingService, 'hashPassword');
      hashPasswordSpy.mockImplementation(() => {
        return hashedPassword;
      });
    });

    it('should register the user successfully', async () => {
      const user = await service.register(payload);
      expect(user).toBeInstanceOf(User);
    });

    it('should call hashingService.hashPassword', async () => {
      const res = await service.register(payload);
      expect(hashPasswordSpy).toBeCalled();
      expect(res.password).toBe(hashedPassword);
    });
  });

  describe('findByEmail', () => {
    it('should return the correct user', async () => {
      const user = await service.findByEmail('test@gmail.com');
      expect(user).toBeInstanceOf(User);
    });

    it('should return undefined in case of incorrect email', async () => {
      const user = await service.findByEmail('nonexistent@gmail.com');
      expect(user).toBe(undefined);
    });
  });

  describe('findByUsername', () => {
    it('should return the correct user', async () => {
      const user = await service.findByUsername('user-test');
      expect(user).toBeInstanceOf(User);
    });

    it('should return undefined in case of incorrect username', async () => {
      const res = await service.findByUsername('user-notFound');
      expect(res).toBe(undefined);
    });
  });

  describe('getProfileInfo', () => {
    let findByUsernameSpy: jest.SpyInstance;
    let getUserCurrentStreamSpy: jest.SpyInstance;
    let response;
    const user = {
      id: 1,
      firstName: 'Karim',
      lastName: 'Elsayed',
      password: 'password',
      email: 'karim@gmail.com',
      username: 'user-test',
      bio: '',
      avatarURL: '',
    };
    const livestream = { id: '1', title: 'Livestream-Test', isLive: true };

    beforeAll(async () => {
      findByUsernameSpy = jest.spyOn(service, 'findByUsername');
      getUserCurrentStreamSpy = jest.spyOn(livestreamService, 'getUserCurrentStream');

      findByUsernameSpy.mockImplementation((username: string) => {
        if (username === user.username) {
          return user;
        }
        return undefined;
      });
      getUserCurrentStreamSpy.mockImplementation((userId: number) => {
        if (userId === user.id) {
          return livestream;
        }
        return undefined;
      });

      response = await service.getProfileInfo('user-test');
    });

    it('should return user profile data with currently livestream if found on valid username', async () => {
      expect(response).toMatchObject({ ...user, livestreams: [livestream] });
    });

    it('should call findByUsername once', async () => {
      expect(findByUsernameSpy).toBeCalledTimes(1);
    });

    it('should call getCurrentlyStream once', async () => {
      expect(getUserCurrentStreamSpy).toBeCalledTimes(1);
    });

    it('should throw 404 error on invalid username', async () => {
      await expect(service.getProfileInfo('user-notFound')).rejects.toThrow(NotFoundException);
    });
  });
});
