import { Controller, Post, Body } from '@nestjs/common';
import { InvalidEmailOrPasswordException } from '../../common/exceptions/invalid-email-or-password-exception';
import { EmailAlreadyExistsException } from '../../common/exceptions/email-already-exists.exception';
import { User } from '../users/user.entity';
import { UserRegisterDTO, UserLoginDTO } from '../users/dtos';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
  public constructor(private userService: UserService, private authService: AuthService) {}

  @Post('/register')
  public async register(@Body() userRegisterDTO: UserRegisterDTO): Promise<User> {
    const user = await this.userService.findByEmail(userRegisterDTO.email);
    if (user) {
      throw new EmailAlreadyExistsException();
    }

    const createdUser = await this.userService.register(userRegisterDTO);
    delete createdUser.password;

    return createdUser;
  }

  @Post('login')
  public async login(@Body() userLoginDTO: UserLoginDTO): Promise<object> {
    const user = await this.userService.findByEmail(userLoginDTO.email);
    if (!user || userLoginDTO.password !== user.password) {
      throw new InvalidEmailOrPasswordException();
    }
    const token = await this.authService.generateToken(user);
    return { token };
  }
}
