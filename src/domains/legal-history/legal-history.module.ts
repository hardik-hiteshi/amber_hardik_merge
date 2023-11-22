import {
  LegalHistory,
  legalhistorySchema,
} from './schema/legal-history.schema';
import { LegalHistoryController } from './legal-history.controller';
import { LegalHistoryRepository } from './repository/legal-history.repository';
import { LegalHistoryService } from './legal-history.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LegalHistory.name, schema: legalhistorySchema },
    ]),
  ],
  controllers: [LegalHistoryController],
  providers: [LegalHistoryService, LegalHistoryRepository],
  exports: [MongooseModule],
})
export class LegalHistoryModule {}
