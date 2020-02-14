import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

jest.mock('../user.repository');

describe('User Repository', () => {
  describe('User Registration', () => {
    it('should register the user successfully', async () => {
      const service = new UserService(new UserRepository());

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
});
