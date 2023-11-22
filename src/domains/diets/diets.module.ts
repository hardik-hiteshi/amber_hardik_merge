import { Diet, dietSchema } from './schema/diets.schema';
import { DietsController } from './diets.controller';
import { DietsRepository } from './repository/diets.repository';
import { DietsService } from './diets.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Diet.name, schema: dietSchema }]),
  ],
  controllers: [DietsController],
  providers: [DietsService, DietsRepository],
})
export class DietsModule {}
