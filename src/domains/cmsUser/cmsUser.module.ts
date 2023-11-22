import { CmsUser, cmsUserSchema } from './schema/cmsUser.schema';
import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CmsUserController } from './cmsUser.controller';
import { CmsUserRepository } from './repository/cmsUser.repository';
import { CmsUserService } from './cmsUser.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from '../recipe/recipe.module';

@Global()
@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: CmsUser.name, schema: cmsUserSchema }]),
    RecipeModule,
  ],
  controllers: [CmsUserController],
  providers: [CmsUserService, CmsUserRepository],
  exports: [CmsUserRepository, MongooseModule],
})
export class CmsUserModule {}
