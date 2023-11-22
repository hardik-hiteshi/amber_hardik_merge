import { LegalTerms, legalTermsSchema } from './schema/legal-terms.schema';
import { LegalHistoryModule } from '../legal-history/legal-history.module';
import { LegalTermsController } from './legal-terms.controller';
import { LegalTermsRepository } from './repository/legal-terms.repository';
import { LegalTermsService } from './legal-terms.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LegalTerms.name,
        schema: legalTermsSchema,
      },
    ]),
    LegalHistoryModule,
  ],
  controllers: [LegalTermsController],
  providers: [LegalTermsService, LegalTermsRepository],
})
export class LegalTermsModule {}
