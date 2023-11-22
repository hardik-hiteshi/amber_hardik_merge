import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { LegalHistoryDocument } from './schema/legal-history.schema';
import { LegalHistoryService } from './legal-history.service';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Legal', 'Legal History')
export class LegalHistoryController {
  public constructor(public lhServices: LegalHistoryService) {}

  @Get('legalhistory/:_id')
  public async fetchLH(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<LegalHistoryDocument> {
    return await this.lhServices.fetchLH(region, _id);
  }

  @Get('legalhistorys')
  public async fetchAllLH(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.lhServices.fetchAllLH(region, pageNumber, pageSize);
  }
}
