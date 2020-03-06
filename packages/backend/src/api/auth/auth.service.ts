import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  public generateToken(user: User): string {
    const payload = { firstName: user.firstName, lastName: user.lastName, email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
