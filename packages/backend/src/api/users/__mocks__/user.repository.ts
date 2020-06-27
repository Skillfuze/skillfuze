import { User } from '../user.entity';

export class UserRepository {
  public create(payload: Partial<User>): User {
    const user = new User();

    user.id = 1;
    user.email = payload.email;
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.password = payload.password;

    return user;
  }

  public findOne(options: any): User {
    if (options.email === 'test@gmail.com' || options.username === 'user-test') {
      return new User();
    }
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public save(): void {}
}
