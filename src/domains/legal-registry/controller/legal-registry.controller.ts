import { Controller, Get, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../../auth/decorator/auth.decorator';
import { LegalRegistryDocument } from '../schema/legal-registry.schema';
import { LegalRegistryService } from '../legal-registry.service';
import { ObjectId } from 'mongoose';
import { Role } from '../../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller('legalregistry')
@ApiTags('Legal Registry', 'Legal')
export class LegalRegistryController {
  public constructor(public legalRegServices: LegalRegistryService) {}

  @Get(':_id')
  public async fetchLegalRegistry(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<LegalRegistryDocument> {
    return await this.legalRegServices.fetchLegalRegistry(region, _id);
  }
}
