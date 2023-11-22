import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CustomBadRequestInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<object> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          const customErr = error.getResponse();

          return throwError(
            new HttpException(
              { error: customErr['message'] },
              error.getStatus(),
            ),
          );
        }

        return throwError(error);
      }),
    );
  }
}
