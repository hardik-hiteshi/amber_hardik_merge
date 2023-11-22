import {
  NutritionalDisclaimer,
  nutritionalDisclaimerSchema,
} from './schema/nutritionalDisclaimer.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionalDisclaimerController } from './nutritional-disclaimer.controller';
import { NutritionalDisclaimerRepository } from './repository/nutritionalDisclaimer.repository';
import { NutritionalDisclaimerService } from './nutritional-disclaimer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NutritionalDisclaimer.name, schema: nutritionalDisclaimerSchema },
    ]),
  ],
  controllers: [NutritionalDisclaimerController],
  providers: [NutritionalDisclaimerService, NutritionalDisclaimerRepository],
})
export class NutritionalDisclaimerModule {}
