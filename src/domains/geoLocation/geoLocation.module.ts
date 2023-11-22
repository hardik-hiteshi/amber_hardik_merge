import { GeoLocation, geoLocationSchema } from './schema/geoLocation.schema';
import { GeoLocationController } from './geoLocation.controller';
import { GeoLocationRepository } from './repository/geoLocation.repository';
import { GeoLocationService } from './geoLocation.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GeoLocation.name, schema: geoLocationSchema },
    ]),
  ],
  controllers: [GeoLocationController],
  providers: [GeoLocationService, GeoLocationRepository],
  exports: [GeoLocationService],
})
export class GeoLocationModule {}
