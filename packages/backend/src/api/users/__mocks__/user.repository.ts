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
}
