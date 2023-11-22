/* eslint-disable @typescript-eslint/naming-convention */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AffiliateConfigDocument } from './schema/affiliateConfig.schema';
import { AffiliateConfigService } from './affiliateConfig.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateConfigDTO } from './dto/createDto/createAffiliateConfig.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateConfigDTO } from './dto/updateDto/updateAffiliateConfig.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Affiliates', 'Shop')
export class AffiliateConfigController {
  public constructor(public affiliateConfigServices: AffiliateConfigService) {}

  @Post('config')
  public async createAffiliateConfig(
    @Body() body: CreateAffiliateConfigDTO,
  ): Promise<object> {
    return await this.affiliateConfigServices.createAffiliateConfig(body);
  }

  @Get('config/:cookie_name')
  public async fetchAffiliateConfig(
    @Param('cookie_name') cookie_name: string,
  ): Promise<AffiliateConfigDocument> {
    return await this.affiliateConfigServices.fetchAffiliateConfig(cookie_name);
  }

  @Put('config/:cookie_name')
  public async updateAffiliateConfig(
    @Param('cookie_name') cookie_name: string,
    @Body() body: UpdateAffiliateConfigDTO,
  ): Promise<object> {
    return await this.affiliateConfigServices.updateAffiliateConfig(
      cookie_name,
      body,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('config/:cookie_name')
  public async deleteAffiliateConfig(
    @Param('cookie_name') cookie_name: string,
  ): Promise<void> {
    await this.affiliateConfigServices.deleteAffiliateConfig(cookie_name);
  }

  @Get('configs')
  public async fetchAffiliateConfigs(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.affiliateConfigServices.fetchAffiliateConfigs(
      pageNumber,
      pageSize,
      search,
    );
  }
}
