import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends HttpException {
  constructor(message?: string | object | any, error = 'Bad Request') {
    super(
      {
        message: message || 'Invalid Email or Password.',
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
