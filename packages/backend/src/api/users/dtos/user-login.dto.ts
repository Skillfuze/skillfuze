import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}
