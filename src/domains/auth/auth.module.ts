import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CmsUserModule } from '../cmsUser/cmsUser.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({}),
    forwardRef(() => CmsUserModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
