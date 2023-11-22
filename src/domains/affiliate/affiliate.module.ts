import { Affiliate, affiliateSchema } from './schema/affiliate.schema';
import { AffiliateController } from './affiliate.controller';
import { AffiliateRepository } from './repository/affiliate.repository';
import { AffiliateService } from './affiliate.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Affiliate.name, schema: affiliateSchema },
    ]),
  ],
  controllers: [AffiliateController],
  providers: [AffiliateService, AffiliateRepository],
})
export class AffiliateModule {}
