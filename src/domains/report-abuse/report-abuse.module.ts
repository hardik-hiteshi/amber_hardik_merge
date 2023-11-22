import { ReportAbuse, reportAbuseSchema } from './schema/report-abuse.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportAbuseController } from './report-abuse.controller';
import { ReportAbuseRepository } from './repository/report-abuse.repository';
import { ReportAbuseService } from './report-abuse.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportAbuse.name, schema: reportAbuseSchema },
    ]),
  ],
  controllers: [ReportAbuseController],
  providers: [ReportAbuseService, ReportAbuseRepository],
})
export class ReportAbuseModule {}
