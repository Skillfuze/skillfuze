import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokenPayload } from '@skillfuze/types';
import { HashingService } from './hashing.service';
import { User } from '../../users/user.entity';
import { UserService } from '../../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly hashing: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await this.hashing.matchingPassword(password, user.password))) {
      return user;
    }
    return null;
  }

  public generateToken(user: User): string {
    const payload: UserTokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
      username: user.username,
      avatarURL: user.avatarURL,
      bio: user.bio,
    };
    return this.jwtService.sign(payload);
  }
}
