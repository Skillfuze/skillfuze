import { UserRegisterDTO } from '../dtos';
import { User } from '../user.entity';

export class UserService {
  public async register(payload: UserRegisterDTO): Promise<User> {
    const user: User = new User();
    user.id = 1;
    user.email = payload.email;
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.password = payload.password;

    return Promise.resolve(user);
  }

  public findByEmail(): Promise<User> {
    return undefined;
  }

  public findByUsername(): Promise<User> {
    return undefined;
  }

  public getProfileInfo(): Promise<User> {
    return undefined;
  }
}
