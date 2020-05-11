import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IUserLoginDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDTO implements IUserLoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}
