/* eslint-disable @typescript-eslint/explicit-function-return-type */
// custom-exception.filter.ts

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class CustomUnauthorizedExceptionFilter implements ExceptionFilter {
  public catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    response.status(401).json({
      error: exception['response']['message'],
    });
  }
}
