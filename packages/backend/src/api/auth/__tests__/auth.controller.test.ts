import { Test, TestingModule } from '@nestjs/testing';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import { AuthController } from '../auth.controller';
import { User } from '../../users/user.entity';
import { UserService } from '../../users/user.service';

jest.mock('../../users/user.service');

describe('Auth Controller', () => {
  let controller: AuthController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
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
});
