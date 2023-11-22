import {
  AffiliateConfig,
  affiliateConfigSchema,
} from './schema/affiliateConfig.schema';
import { AffiliateConfigController } from './affiliateConfig.controller';
import { AffiliateConfigRepository } from './repository/affiliateConfig.repository';
import { AffiliateConfigService } from './affiliateConfig.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AffiliateConfig.name, schema: affiliateConfigSchema },
    ]),
  ],
  controllers: [AffiliateConfigController],
  providers: [AffiliateConfigService, AffiliateConfigRepository],
})
export class AffiliateConfigModule {}
