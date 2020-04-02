import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '../services/hashing.service';
import { AuthService } from '../services/auth.service';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import { AuthController } from '../auth.controller';
import { User } from '../../users/user.entity';
import { UserService } from '../../users/user.service';

jest.mock('../../users/user.service');
jest.mock('@nestjs/jwt');

describe('Auth Controller', () => {
  let controller: AuthController;
  let userService: UserService;
  let authService: AuthService;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [UserService, AuthService, JwtService, HashingService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    hashingService = module.get<HashingService>(HashingService);
  });

  describe('register', () => {
    let registerSpy: jest.SpyInstance;
    let findByEmailSpy: jest.SpyInstance;
    let hashPassword: jest.SpyInstance;
    const payload = {
      firstName: 'Khaled',
      lastName: 'Mohamed',
      email: 'khaled@skillfuze.com',
      password: '123456789',
      confirmPassword: '123456789',
    };

    beforeEach(() => {
      registerSpy = jest.spyOn(userService, 'register');
      findByEmailSpy = jest.spyOn(userService, 'findByEmail');
      hashPassword = jest.spyOn(hashingService, 'hashPassword');

      findByEmailSpy.mockImplementation((email: string) => {
        if (email === 'duplicate@gmail.com') {
          return new User();
        }
        return undefined;
      });
    });

    it('should call userService.register', async () => {
      await controller.register(payload);
      expect(registerSpy).toBeCalled();
    });

    it('should call userService.findByEmail', async () => {
      await controller.register(payload);
      expect(findByEmailSpy).toBeCalled();
    });

    it('should call hashingService.hashPassword', async () => {
      await controller.register(payload);
      expect(hashPassword).toBeCalled();
    });

    it('should register the user successfully', async () => {
      const user = await controller.register(payload);
      expect(user).toBeInstanceOf(User);
    });

    it('should remove password, confirmPassword fields and add id field', async () => {
      const user = await controller.register(payload);

      expect(user).toHaveProperty('id');
      expect(user).not.toHaveProperty('password');
      expect(user).not.toHaveProperty('confirmPassword');
    });

    it('should throw EmailAlreadyExistsException on duplicate email', async () => {
      await expect(controller.register({ ...payload, email: 'duplicate@gmail.com' })).rejects.toThrow(
        EmailAlreadyExistsException,
      );
    });
  });

  describe('login', () => {
    let generateTokenSpy: jest.SpyInstance;
    let findByEmailSpy: jest.SpyInstance;

    const payload = {
      username: 'duplicate@gmail.com',
      password: '123456789',
    };

    beforeEach(() => {
      generateTokenSpy = jest.spyOn(authService, 'generateToken');
      findByEmailSpy = jest.spyOn(userService, 'findByEmail');

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

      generateTokenSpy.mockImplementation((p: object) => {
        if (p) return 'token';
        return undefined;
      });
    });

    it('should call authService.generateToken', async () => {
      const res = await controller.login({ user: payload });
      expect(generateTokenSpy).toBeCalled();
      expect(res).toMatchObject({ token: 'token' });
    });
  });
});
