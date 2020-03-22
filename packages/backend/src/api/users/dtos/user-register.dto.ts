import { IsEmail, IsNotEmpty, ValidateIf, MinLength } from 'class-validator';

export class UserRegisterDTO {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @IsNotEmpty()
  @ValidateIf(/* istanbul ignore next */ payload => payload.password === payload.confirmPassword)
  public confirmPassword: string;
}
