import { Controller, Post, Body, HttpCode, UseGuards, Request } from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { EmailAlreadyExistsException } from '../../common/exceptions/email-already-exists.exception';

import { UserRegisterDTO, UserLoginDTO } from '../users/dtos';
import { AuthService } from './services/auth.service';
import { UserService } from '../users/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponseDTO } from './dtos/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(private userService: UserService, private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ type: User, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'User already exists' })
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
  @ApiBody({ type: UserLoginDTO })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  public async login(@Request() req): Promise<LoginResponseDTO> {
    return { token: this.authService.generateToken(req.user) };
  }

  @Post('/google')
  @HttpCode(200)
  public async googleAuth(@Body() payload: { code: string }): Promise<LoginResponseDTO> {
    return this.authService.googleAuth(payload.code);
  }
}
