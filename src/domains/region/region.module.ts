import { Region, regionSchema } from './schema/region.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionController } from './region.controller';
import { RegionRepository } from './repository/region.repository';
import { RegionService } from './region.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Region.name, schema: regionSchema }]),
  ],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository],
})
export class RegionModule {}
