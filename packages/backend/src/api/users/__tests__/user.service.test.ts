import { TestingModule, Test } from '@nestjs/testing';
import { HashingService } from '../../auth/services/hashing.service';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

jest.mock('../user.repository');

describe('User Service', () => {
  let service: UserService;
  let hashingService: HashingService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();
    hashingService = module.get<HashingService>(HashingService);

    service = new UserService(new UserRepository(), hashingService);
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
});
