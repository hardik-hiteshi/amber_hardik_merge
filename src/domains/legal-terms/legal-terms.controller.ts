import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateLegalTermsDTO } from './dto/createLegal-terms/legal-terms.create.dto';
import { LegalTermsDocument } from './schema/legal-terms.schema';
import { LegalTermsService } from './legal-terms.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateLegalTermsDTO } from './dto/updateLegal-terms/legal-terms.update.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Legal Terms', 'Legal')
export class LegalTermsController {
  public constructor(public legaltermsServices: LegalTermsService) {}

  @Post('legalterms')
  public async createLegalTerm(
    @Headers('region') region: string,
    @Body() body: CreateLegalTermsDTO,
  ): Promise<object> {
    return await this.legaltermsServices.createLegalTerm(region, body);
  }

  @Get('legalterms/:region')
  public async fetchLegalTerm(
    @Param('region') region: string,
    // @Headers('region') region: string,
  ): Promise<LegalTermsDocument> {
    return await this.legaltermsServices.fetchLegalTerm(region);
  }

  @Put('legalterms/:region')
  public async updateLegalTerm(
    @Param('region') region: string,
    // @Headers('region') region: string,
    @Body() body: UpdateLegalTermsDTO,
  ): Promise<object> {
    return await this.legaltermsServices.updateLegalTerm(region, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('legalterms/:region')
  public async deleteLegalTerm(
    @Param('region') region: string,
    // @Headers('region') region: string,
  ): Promise<void> {
    await this.legaltermsServices.deleteLegalTerm(region);
  }

  @Get('legaltermss')
  public async fetchLegalTerms(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.legaltermsServices.fetchLegalTerms(
      region,
      pageNumber,
      pageSize,
    );
  }
}
