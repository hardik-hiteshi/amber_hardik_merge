import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Response } from 'express';
// export interface Response<T> {
//   data: T;
// }

@Injectable()
export class ResponseStructureInterceptor implements NestInterceptor {
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<object>> {
    const response: Response = await context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (response.getHeaders()['content-disposition']) {
          return data;
        }

        return data
          ? { status: response.statusCode, msg: 'success', data }
          : { status: response.statusCode, msg: 'success' };
      }),
    );
  }
}
