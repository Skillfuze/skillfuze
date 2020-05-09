import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IUserRegisterDTO } from '@skillfuze/types';
import { ValidateIf } from '../../../utils/validation/ValidateIf';

export class UserRegisterDTO implements IUserRegisterDTO {
  @IsNotEmpty({ message: 'First Name should not be empty' })
  public firstName: string;

  @IsNotEmpty({ message: 'Last Name should not be empty' })
  public lastName: string;

  @IsEmail({}, { message: 'Email should be in a valid format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  public email: string;

  @MinLength(6, { message: 'Password should be at least 6 characters' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  public password: string;

  @ValidateIf(
    /* istanbul ignore next */
    payload => {
      return payload.confirmPassword === payload.password;
    },
    { message: 'Passwords do not match' },
  )
  @IsNotEmpty({ message: 'Confirm password should not be empty' })
  public confirmPassword: string;
}
