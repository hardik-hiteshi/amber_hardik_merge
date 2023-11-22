import { forwardRef, Module } from '@nestjs/common';
import { UserLog, userLogSchema } from './schema/user-log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from '../recipe/recipe.module';
import { UserLogController } from './user-log.controller';
import { UserLogRepository } from './repository/UserLog.repository';
import { UserLogService } from './user-log.service';

@Module({
  imports: [
    forwardRef(() => RecipeModule),
    MongooseModule.forFeature([{ name: UserLog.name, schema: userLogSchema }]),
  ],
  controllers: [UserLogController],
  providers: [UserLogService, UserLogRepository],
  exports: [MongooseModule, UserLogRepository, UserLogService],
})
export class UserLogModule {}
