import { TestingModule, Test } from '@nestjs/testing';
import { InvalidEmailOrPasswordException } from '../../../common/exceptions/invalid-email-or-password-exception';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/user.entity';
import { LocalStrategy } from '../strategies/local.strategy';

jest.mock('../services/auth.service');

describe('JwtStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    localStrategy = new LocalStrategy(authService);
  });

  describe('validate', () => {
    let validateUserSpy: jest.SpyInstance;

    const payload = {
      email: 'duplicate@gmail.com',
      password: '123456789',
    };

    beforeEach(() => {
      validateUserSpy = jest.spyOn(authService, 'validateUser');

      validateUserSpy.mockImplementation((email: string, password: string) => {
        if (email === 'duplicate@gmail.com' && password === '123456789') {
          return new User();
        }
        return undefined;
      });
    });
    it('should return user if data is valid', async () => {
      const res = await localStrategy.validate(payload.email, payload.password);
      expect(res).toBeInstanceOf(User);
    });

    it('should throw InvalidEmailOrPasswordException when user is undefined', async () => {
      await expect(localStrategy.validate('not.duplicate@gmail.com', payload.password)).rejects.toThrow(
        InvalidEmailOrPasswordException,
      );
    });
  });
});
