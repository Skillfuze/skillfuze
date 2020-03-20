import { JwtStrategy } from '../strategies/jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeAll(async () => {
    jwtStrategy = new JwtStrategy();
  });

  describe('validate', () => {
    it('should return payload', async () => {
      const res = await jwtStrategy.validate('payload');
      expect(res).toMatch('payload');
    });
  });
});
