import * as bcrypt from 'bcrypt';
import { HashingService } from '../services/hashing.service';

jest.mock('bcrypt');

describe('HashingService', () => {
  let hashingService: HashingService;
  let genSalt: jest.SpyInstance;
  let hash: jest.SpyInstance;
  let compare: jest.SpyInstance;

  beforeAll(async () => {
    hashingService = new HashingService();
  });

  beforeEach(async () => {
    genSalt = jest.spyOn(bcrypt, 'genSalt');
    hash = jest.spyOn(bcrypt, 'hash');
    compare = jest.spyOn(bcrypt, 'compare');

    genSalt.mockImplementation((payload: object) => {
      return payload;
    });
    hash.mockImplementation(() => {
      return 'hashed';
    });

    compare.mockImplementation((plainPassword: string, password: string) => {
      if (plainPassword === password) {
        return true;
      }
      return false;
    });
  });

  describe('hashPassword', () => {
    it('should generate encrypted password', async () => {
      const res = await hashingService.hashPassword('12345678');
      expect(res).toBe('hashed');
    });
  });

  describe('matchingPassword', () => {
    it('should return true on matched password', async () => {
      const res = await hashingService.matchingPassword('12345', '12345');
      expect(res).toBe(true);
    });

    it('should return false on un-matched password', async () => {
      const res = await hashingService.matchingPassword('1234', '12345');
      expect(res).toBe(false);
    });
  });
});
