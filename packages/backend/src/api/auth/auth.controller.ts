import { Controller, Post, Body } from '@nestjs/common';
import { EmailAlreadyExistsException } from '../../common/exceptions/email-already-exists.exception';
import { User } from '../users/user.entity';
import { UserRegisterDTO } from '../users/dtos';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
  public constructor(private userService: UserService) {}

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
}
