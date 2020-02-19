import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

jest.mock('../user.repository');

describe('User Service', () => {
  let service: UserService;

  beforeAll(() => {
    const repository = new UserRepository();
    service = new UserService(repository);
  });

  describe('register', () => {
    it('should register the user successfully', async () => {
      const payload = {
        firstName: 'Khaled',
        lastName: 'Mohamed',
        email: 'khaled@skillfuze.com',
        password: '123456789',
        confirmPassword: '123456789',
      };
      const user = await service.register(payload);
      expect(user).toBeInstanceOf(User);
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
