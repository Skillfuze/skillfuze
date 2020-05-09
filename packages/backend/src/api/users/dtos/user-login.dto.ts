import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IUserLoginDTO } from '@skillfuze/types';

export class UserLoginDTO implements IUserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}
