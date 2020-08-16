import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/user.entity';
import { LivestreamsService } from '../../livestreams/livestreams.service';
import { LivestreamsRepository } from '../../livestreams/livestreams.repository';
import { HashingService } from '../services/hashing.service';

import { UserRepository } from '../../users/user.repository';
import { UserService } from '../../users/user.service';
import { AuthService } from '../services/auth.service';
import { LoginResponseDTO } from '../dtos/login-response.dto';

jest.mock('@nestjs/jwt');
jest.mock('../../users/user.repository');

describe('Auth Service', () => {
  let authService: AuthService;
  let hashingService: HashingService;
  let userService: UserService;
  let jwtService: JwtService;
  let findByEmailSpy: jest.SpyInstance;
  let signSpy: jest.SpyInstance;
  let matchingPasswordSpy: jest.SpyInstance;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService, HashingService],
    }).compile();
    jwtService = module.get<JwtService>(JwtService);
    hashingService = module.get<HashingService>(HashingService);
    userService = new UserService(
      new UserRepository(),
      hashingService,
      new LivestreamsService(new LivestreamsRepository()),
    );
    userRepository = new UserRepository();
    authService = new AuthService(userService, hashingService, jwtService, userRepository);
  });

  beforeEach(async () => {
    signSpy = jest.spyOn(jwtService, 'sign');
    findByEmailSpy = jest.spyOn(userService, 'findByEmail');
    matchingPasswordSpy = jest.spyOn(hashingService, 'matchingPassword');

    findByEmailSpy.mockImplementation((email: string) => {
      if (email === 'duplicate@gmail.com') {
        const user = new User();
        user.id = 1;
        user.firstName = 'Karim';
        user.lastName = 'Elsayed';
        user.email = 'karim@skillfuze.com';
        user.password = '123456789';
        return user;
      }
      return undefined;
    });

    matchingPasswordSpy.mockImplementation((payload: any) => {
      return payload;
    });

    signSpy.mockImplementation((payload: any) => {
      return payload;
    });
  });

  describe('generateToken', () => {
    const user = {
      id: 1,
      firstName: 'Karim',
      lastName: 'Elsayed',
      email: 'karim@skillfuze.com',
      password: '123456789',
      username: 'user-1',
      avatarURL: '',
      bio: '',
    };

    it('should generate token successfully', async () => {
      const res = authService.generateToken(user as User);
      expect(res).toMatchObject({
        id: 1,
        firstName: 'Karim',
        lastName: 'Elsayed',
        email: 'karim@skillfuze.com',
        username: 'user-1',
        avatarURL: '',
        bio: '',
      });
    });
    it('should call jwt.sign', async () => {
      await authService.generateToken(user as User);
      expect(signSpy).toBeCalled();
      expect(signSpy).toBeCalledWith({
        id: 1,
        firstName: 'Karim',
        lastName: 'Elsayed',
        email: 'karim@skillfuze.com',
        username: 'user-1',
        avatarURL: '',
        bio: '',
      });
    });
  });

  describe('validateUser', () => {
    const payload = {
      email: 'karim@skillfuze.com',
      password: '123456789',
    };

    it('should call hashingService.matchingPassword', async () => {
      await authService.validateUser('duplicate@gmail.com', payload.password);
      expect(matchingPasswordSpy).toBeCalled();
    });

    it('should return user on valid email', async () => {
      const res = await authService.validateUser('duplicate@gmail.com', payload.password);
      expect(res).toBeInstanceOf(User);
    });
    it('should return null on invalid email', async () => {
      const res = await authService.validateUser(payload.email, payload.password);
      expect(res).toBeNull();
    });
    it('should call userService.findByEmail', async () => {
      await authService.validateUser(payload.email, payload.password);
      expect(findByEmailSpy).toBeCalled();
    });
  });

  describe('googleAuth', () => {
    const code = 'AUTHORIZATION_CODE';
    const idToken = 'GOOGLE_JWT';
    const googleIdTokenPayload = {
      sub: 'USER_SUB',
      given_name: 'First',
      family_name: 'Last',
      email: 'testuser@gmail.com',
      picture: 'picture-url',
    };
    let userRepoFindOneSpy: jest.SpyInstance;
    let userSaveSpy: jest.SpyInstance;

    beforeAll(() => {
      (authService as any).googleOAuthClient.getToken = jest.fn(() => {
        return { tokens: { id_token: idToken } };
      });

      const newUser = new User();
      newUser.oAuthId = googleIdTokenPayload.sub;
      newUser.firstName = googleIdTokenPayload.given_name;

      userSaveSpy = jest.spyOn(userRepository, 'save').mockReturnValue(Promise.resolve(newUser));

      userRepoFindOneSpy = jest.spyOn(userRepository, 'findOne');
      jest.spyOn(authService, 'generateToken').mockImplementation((user: User) => {
        if (user.oAuthId === googleIdTokenPayload.sub && user.firstName === googleIdTokenPayload.given_name) {
          return 'JWT_TOKEN';
        }

        return undefined;
      });

      jest.spyOn(jwtService, 'decode').mockReturnValue(googleIdTokenPayload);
    });

    describe('on valid authorization code', () => {
      let result: LoginResponseDTO;

      beforeAll(async () => {
        result = await authService.googleAuth(code);
      });
      it('should return a correct JWT Token', async () => {
        expect(result.token).toBe('JWT_TOKEN');
      });

      it('should call googleOAuthClient.getToken once with code', async () => {
        expect((authService as any).googleOAuthClient.getToken).toBeCalledTimes(1);
        expect((authService as any).googleOAuthClient.getToken).toBeCalledWith(code);
      });

      it('should decode the id_token successfully', () => {
        expect(jwtService.decode).toBeCalledTimes(1);
        expect(jwtService.decode).toBeCalledWith(idToken);
      });

      it('should call userRepository.findOne to be called once with oAuthId', async () => {
        expect(userRepoFindOneSpy).toBeCalledTimes(1);
        expect(userRepoFindOneSpy).toBeCalledWith({ oAuthId: googleIdTokenPayload.sub });
      });

      afterAll(() => {
        userSaveSpy.mockClear();
      });
    });

    describe('on non-existing user', () => {
      let userCreateSpy: jest.SpyInstance;

      beforeAll(async () => {
        userCreateSpy = jest.spyOn(userRepository, 'create');
        userRepoFindOneSpy.mockReturnValue(undefined);
        await authService.googleAuth(code);
      });

      it('should call userRepository.create', () => {
        const { sub, given_name, family_name, picture, email } = googleIdTokenPayload;
        expect(userCreateSpy).toBeCalledTimes(1);
        expect(userCreateSpy).toBeCalledWith({
          oAuthId: sub,
          firstName: given_name,
          lastName: family_name,
          avatarURL: picture,
          email,
        });
      });

      it('should call userRepository.save', () => {
        expect(userSaveSpy).toBeCalledTimes(1);
      });

      afterAll(() => {
        userSaveSpy.mockClear();
        userCreateSpy.mockClear();
      });
    });

    describe('on pre-existing user', () => {
      let userCreateSpy: jest.SpyInstance;

      beforeAll(async () => {
        userCreateSpy = jest.spyOn(userRepository, 'create');
        userRepoFindOneSpy.mockReturnValue(new User());
        await authService.googleAuth(code);
      });

      it('should not call userRepository.create', () => {
        expect(userCreateSpy).toBeCalledTimes(0);
      });

      it('should not call userRepository.save', () => {
        expect(userSaveSpy).toBeCalledTimes(0);
      });

      afterAll(() => {
        userSaveSpy.mockClear();
        userCreateSpy.mockClear();
      });
    });
  });
});
