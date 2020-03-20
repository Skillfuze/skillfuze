import { Controller, Post, Body, HttpCode, UseGuards, Request } from '@nestjs/common';
import { EmailAlreadyExistsException } from '../../common/exceptions/email-already-exists.exception';
import { User } from '../users/user.entity';
import { UserRegisterDTO } from '../users/dtos';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  public async login(@Request() req): Promise<object> {
    return { token: this.authService.generateToken(req.user) };
  }
}
