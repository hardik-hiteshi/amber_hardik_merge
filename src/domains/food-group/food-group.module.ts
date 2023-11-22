import { FoodGroup, foodGroupSchema } from './schema/food-group.schema';
import { FoodGroupController } from './food-group.controller';
import { FoodGroupRepository } from './repository/food-group.repository';
import { FoodGroupService } from './food-group.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodGroup.name, schema: foodGroupSchema },
    ]),
  ],
  controllers: [FoodGroupController],
  providers: [FoodGroupService, FoodGroupRepository],
})
export class FoodGroupModule {}
