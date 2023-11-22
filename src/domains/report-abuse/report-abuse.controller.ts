/* eslint-disable @typescript-eslint/naming-convention */
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
import { CreateReportDto, UpdateReportDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateManyReportsDto } from './dtos/createManyReports/createManyReports.dto';
import { ReportAbuseDocument } from './schema/report-abuse.schema';
import { ReportAbuseService } from './report-abuse.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Report Abuse')
export class ReportAbuseController {
  public constructor(private reportService: ReportAbuseService) {}

  @Post('reportAbuse')
  private async createReport(
    @Headers('region') region: string,
    @Body() body: CreateReportDto,
  ): Promise<object> {
    return await this.reportService.createOne(body, region);
  }

  @Get('reportAbuse/:reported_user_niceName')
  private async getOne(
    @Headers('region') region: string,
    @Param('reported_user_niceName') reported_user_niceName: string,
  ): Promise<ReportAbuseDocument> {
    return await this.reportService.findOne(region, reported_user_niceName);
  }

  @Get('reportAbuses')
  private async getAll(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.reportService.findAll(region, pageNumber, pageSize);
  }

  @Put('reportAbuse/:reported_user_niceName')
  private async updateOne(
    @Headers('region') region: string,
    @Param('reported_user_niceName') reported_user_niceName: string,
    @Body() body: UpdateReportDto,
  ): Promise<object> {
    return await this.reportService.updateOne(
      region,
      reported_user_niceName,
      body,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('reportAbuse/:reported_user_niceName')
  private async deleteOne(
    @Headers('region') region: string,
    @Param('reported_user_niceName') reported_user_niceName: string,
  ): Promise<void> {
    await this.reportService.deleteOne(region, reported_user_niceName);
  }

  @Post('reportAbuses')
  private async createManyReports(
    @Headers('region') region: string,
    @Body() body: CreateManyReportsDto,
  ): Promise<ReportAbuseDocument[]> {
    return await this.reportService.createManyReports(region, body);
  }
}
