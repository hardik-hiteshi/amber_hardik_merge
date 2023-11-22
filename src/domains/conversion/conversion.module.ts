import { Conversion, conversionSchema } from './schema/conversion.schema';
import { ConversionController } from './conversion.controller';
import { ConversionRepository } from './repository/conversion.repository';
import { ConversionService } from './conversion.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversion.name, schema: conversionSchema },
    ]),
  ],
  controllers: [ConversionController],
  providers: [ConversionService, ConversionRepository],
})
export class ConversionModule {}
