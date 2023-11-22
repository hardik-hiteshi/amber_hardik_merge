import { UserLog, userLogSchema } from './schema/user-log.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from '../recipe/recipe.module';
import { UserLogController } from './user-log.controller';
import { UserLogRepository } from './repository/UserLog.repository';
import { UserLogService } from './user-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserLog.name, schema: userLogSchema }]),
    RecipeModule,
  ],
  controllers: [UserLogController],
  providers: [UserLogService, UserLogRepository],
  exports: [MongooseModule, UserLogService, UserLogRepository],
})
export class UserLogModule {}
