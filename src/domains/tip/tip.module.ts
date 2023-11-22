import { Tip, tipSchema } from './schema/tip.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipController } from './tip.controller';
import { TipRepository } from './repository/tip.repository';
import { TipService } from './tip.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tip.name, schema: tipSchema }])],
  controllers: [TipController],
  providers: [TipService, TipRepository],
})
export class TipModule {}
