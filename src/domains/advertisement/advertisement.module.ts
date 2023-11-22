import {
  Advertisement,
  advertisementSchema,
} from './schemas/advertisement.schema';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementRepository } from './repository/advertisement.repository';
import { AdvertisementService } from './advertisement.service';
import { CategoryModule } from '../category/category.module';
import { CommonModule } from 'src/common/common.module';
import { Module } from '@nestjs/common';

// import { CommonService } from 'src/common/services/common.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advertisement.name, schema: advertisementSchema },
    ]),
    CategoryModule,
    CommonModule,
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService, AdvertisementRepository],
})
export class AdvertisementModule {}
