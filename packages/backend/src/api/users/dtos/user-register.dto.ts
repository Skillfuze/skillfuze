import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ValidateIf } from '../../../utils/validation/ValidateIf';

export class UserRegisterDTO {
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

<<<<<<< HEAD
  @IsNotEmpty()
  @ValidateIf(/* istanbul ignore next */ payload => payload.password === payload.confirmPassword)
=======
  @ValidateIf(
    payload => {
      return payload.confirmPassword === payload.password;
    },
    { message: 'Passwords do not match' },
  )
  @IsNotEmpty({ message: 'Confirm password should not be empty' })
>>>>>>> 7b0ac2b39076ba80362ca2641ecf6f82ce89e621
  public confirmPassword: string;
}
