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
import { AffiliateDocument } from './schema/affiliate.schema';
import { AffiliateService } from './affiliate.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateDTO } from './dto/createDto/createAffiliate.dto';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateDTO } from './dto/updateDto/updateAffiliate.dto';
@AUTH(Role.admin)
@Controller()
@ApiTags('Affiliates', 'Shop')
export class AffiliateController {
  public constructor(public affiliateServices: AffiliateService) {}

  @Post('affiliate')
  public async createAffiliate(
    @Body() body: CreateAffiliateDTO,
  ): Promise<object> {
    return await this.affiliateServices.createAffiliate(body);
  }

  @Get('affiliate/:niceName')
  public async fetchAffiliate(
    @Param('niceName') niceName: string,
  ): Promise<AffiliateDocument> {
    return await this.affiliateServices.fetchAffiliate(niceName);
  }

  @Put('affiliate/:niceName')
  public async updateAffiliate(
    @Param('niceName') niceName: string,
    @Body() body: UpdateAffiliateDTO,
  ): Promise<object> {
    return await this.affiliateServices.updateAffiliate(niceName, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('affiliate/:niceName')
  public async deleteAffiliate(
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.affiliateServices.deleteAffiliate(niceName);
  }

  @Get('affiliates')
  public async fetchAffiliates(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.affiliateServices.fetchAffiliates(
      pageNumber,
      pageSize,
      search,
    );
  }
}
