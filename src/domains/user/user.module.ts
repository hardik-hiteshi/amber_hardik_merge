import { forwardRef, Global, Module } from '@nestjs/common';
import { User, userSchema } from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { FeaturedModule } from '../featured/featured.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from '../recipe/recipe.module';
import { UserController } from './user.controller';
import { UserLogModule } from '../user-log/user-log.module';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    FeaturedModule,
    RecipeModule,
    UserLogModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, MongooseModule],
})
export class UserModule {}
