import * as csv from 'csvtojson';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CsvToJsonInterceptor implements NestInterceptor {
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Express.Request>> {
    const req = context.switchToHttp().getRequest();
    const value = req.file;
    if (!value)
      throw new BadRequestException('csv file must be present in file field');
    const data = await csv().fromString(value.buffer.toString());
    req.body = null;
    req.body = { array: data };

    return next.handle();
  }
}
