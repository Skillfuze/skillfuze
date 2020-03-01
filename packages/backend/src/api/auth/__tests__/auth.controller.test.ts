import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { InvalidEmailOrPasswordException } from '../../../common/exceptions/invalid-email-or-password-exception';
import { AuthService } from '../auth.service';

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
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [UserService, AuthService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    let registerSpy: jest.SpyInstance;
    let findByEmailSpy: jest.SpyInstance;
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

    it('should register the user successfully', async () => {
      const user = await controller.register(payload);
      expect(user).toBeInstanceOf(User);
    });

    it('should remove password, emptyPassword fields and add id field', async () => {
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
    let jwtSignSpy: jest.SpyInstance;

    const payload = {
      email: 'duplicate@gmail.com',
      password: '1234567',
    };

    beforeEach(() => {
      generateTokenSpy = jest.spyOn(authService, 'generateToken');
      findByEmailSpy = jest.spyOn(userService, 'findByEmail');
      jwtSignSpy = jest.spyOn(jwtService, 'sign');

      findByEmailSpy.mockImplementation((email: string) => {
        if (email === 'duplicate@gmail.com') {
          return {
            id: 1,
            firstName: 'Khaled',
            lastName: 'Mohamed',
            email: 'khaled@skillfuze.com',
          };
        }
        return undefined;
      });

      jwtSignSpy.mockImplementation((p: object) => {
        if (p) return 'token';
        return undefined;
      });
    });

    it('should call authService.generateToken', async () => {
      await controller.login(payload);
      expect(generateTokenSpy).toBeCalled();
    });

    it('should call userService.findByEmail', async () => {
      await controller.login(payload);
      expect(findByEmailSpy).toBeCalled();
    });

    it('should return token successfully', async () => {
      const token = await controller.login(payload);
      expect(token).toMatch('token');
    });

    it('should throw InvalidEmailOrPasswordException when user is undefined', async () => {
      await expect(controller.login({ ...payload, email: 'not.duplicate@gmail.com' })).rejects.toThrow(
        InvalidEmailOrPasswordException,
      );
    });
  });
});
