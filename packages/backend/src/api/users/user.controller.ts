import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly userService: UserService) {}

  @Get('/:username/profile')
  @ApiNotFoundResponse()
  public async getProfile(@Param('username') username: string): Promise<User> {
    return this.userService.getProfileInfo(username);
  }
}
