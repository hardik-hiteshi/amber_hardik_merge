import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
@Injectable()
export class SetRegionInterceptor implements NestInterceptor {
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Express.Request>> {
    const req: Request = context.switchToHttp().getRequest();

    const region = req.headers.host.split('.')[0];
    req.headers.region = region.toUpperCase();

    if (allowedRegion(req.path, 'login', 'region', 'regions')) {
      return next.handle();
    }
    if (!req.headers.region) {
      throw new BadRequestException('region in header cannot be empty');
    }

    return next.handle();
  }
}

function allowedRegion(path: string, ...arr: string[]): boolean {
  return arr.some((a) => path.indexOf(a) !== -1);
}
