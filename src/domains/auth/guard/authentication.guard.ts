import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Request } from 'express';
import { User } from 'src/domains/user/schema/user.schema';
// import { IUser } from 'src/user/schema/user.interface';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  public constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('invalid token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        //secret: this.configService.get<string>('JWT_SECRET'),
        secret: 'prod_secret',
      });

      //Set region to header from base url
      const baseUrlregion = request.headers.host.split('.')[0].toUpperCase();
      request.headers.region = baseUrlregion;

      const user = await this.userModel
        .findOne({
          niceName: payload.niceName,
          region: baseUrlregion,
        })
        .select('-password');

      if (!user) {
        throw new UnauthorizedException('user not exist');
      }

      // 💡 We're assigning the user to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message || 'invalid token');
      } else {
        throw new UnauthorizedException('invalid token');
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
