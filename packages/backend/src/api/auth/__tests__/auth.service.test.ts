import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/user.entity';

import { UserRepository } from '../../users/user.repository';
import { UserService } from '../../users/user.service';
import { AuthService } from '../auth.service';

jest.mock('@nestjs/jwt');

describe('Auth Service', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let findByEmailSpy: jest.SpyInstance;
  let signSpy: jest.SpyInstance;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService],
    }).compile();
    jwtService = module.get<JwtService>(JwtService);
    userService = new UserService(new UserRepository());
    authService = new AuthService(userService, jwtService);
  });

  beforeEach(async () => {
    signSpy = jest.spyOn(jwtService, 'sign');
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

    signSpy.mockImplementation((payload: object) => {
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
    };
    it('should generate token successfully', async () => {
      const res = authService.generateToken(user);
      expect(res).toMatchObject({ id: 1, firstName: 'Karim', lastName: 'Elsayed', email: 'karim@skillfuze.com' });
    });
    it('should call jwt.sign', async () => {
      await authService.generateToken(user);
      expect(signSpy).toBeCalled();
      expect(signSpy).toBeCalledWith({ id: 1, firstName: 'Karim', lastName: 'Elsayed', email: 'karim@skillfuze.com' });
    });
  });

  describe('validateUser', () => {
    const payload = {
      email: 'karim@skillfuze.com',
      password: '123456789',
    };
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
});
