import * as fs from 'fs';
import * as path from 'path';

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CommonService } from '../services/common.service';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ShardingInterceptor implements NestInterceptor {
  public constructor(private commonService: CommonService) {}
  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Express.Request>> {
    const req: Request = context.switchToHttp().getRequest();

    const config = (): object => {
      let config = null;
      if (config == null) {
        const localEnv = 'test-85';
        const nodeEnv = process.env.NODE_ENV || localEnv;

        let envPath: string;

        if (nodeEnv === localEnv) {
          envPath = path.join(process.cwd(), '/src/config/env.json');
        } else {
          envPath = path.join(process.cwd(), '/config/env.json');
        }

        const env = JSON.parse(fs.readFileSync(envPath, 'utf8'));
        const result = env[nodeEnv];

        if (result == null) {
          throw new HttpException(
            'Environment configuration not found!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        config = result;
      }

      return config;
    };

    await this.commonService.getRegion(req, config());

    return next.handle();
  }
}
