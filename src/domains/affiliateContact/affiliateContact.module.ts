import {
  AffiliateContact,
  affiliateContactSchema,
} from './schema/affiliateContact.schema';
import { AffiliateContactController } from './affiliateContact.controller';
import { AffiliateContactRepository } from './repository/affiliateContact.repository';
import { AffiliateContactService } from './affiliateContact.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AffiliateContact.name, schema: affiliateContactSchema },
    ]),
  ],
  controllers: [AffiliateContactController],
  providers: [AffiliateContactService, AffiliateContactRepository],
})
export class AffiliateContactModule {}
