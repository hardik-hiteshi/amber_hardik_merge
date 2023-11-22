import {
  AffiliateProduct,
  affiliateProductSchema,
} from './schema/affiliateProducts.schema';
import { AffiliateProductController } from './affiliateProducts.controller';
import { AffiliateProductRepository } from './repository/affiliateProducts.repository';
import { AffiliateProductService } from './affiliateProducts.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AffiliateProduct.name, schema: affiliateProductSchema },
    ]),
  ],
  controllers: [AffiliateProductController],
  providers: [AffiliateProductService, AffiliateProductRepository],
})
export class AffiliateProductModule {}
