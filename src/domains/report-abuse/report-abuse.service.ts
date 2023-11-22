/* eslint-disable @typescript-eslint/naming-convention */
import { CreateReportDto, UpdateReportDto } from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManyReportsDto } from './dtos/createManyReports/createManyReports.dto';
import { ReportAbuseDocument } from './schema/report-abuse.schema';
import { ReportAbuseRepository } from './repository/report-abuse.repository';

@Injectable()
export class ReportAbuseService {
  public reportNotFound = 'report not found';
  public constructor(private reportRepo: ReportAbuseRepository) {}

  public async createOne(
    body: CreateReportDto,
    region: string,
  ): Promise<object> {
    const newData = await this.reportRepo.createOne(body, region);
    const response = {
      reported_user_niceName: newData.reported_user_niceName,
    };

    return response;
  }

  public async updateOne(
    region: string,
    reported_user_niceName: string,
    body: UpdateReportDto,
  ): Promise<object> {
    const report = await this.reportRepo.updateOne(
      region,
      reported_user_niceName,
      body,
    );

    if (!report) throw new NotFoundException(this.reportNotFound);

    const response = {
      reported_user_niceName: report.reported_user_niceName,
    };

    return response;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const reportList = await this.reportRepo.findAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.reportRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: reportList,
    };
  }

  public async deleteOne(
    region: string,
    reported_user_niceName: string,
  ): Promise<object> {
    const report = await this.reportRepo.deleteOne(
      region,
      reported_user_niceName,
    );
    if (!report) throw new NotFoundException(this.reportNotFound);

    return { message: 'Deleted Success' };
  }

  public async findOne(
    region: string,
    reported_user_niceName: string,
  ): Promise<ReportAbuseDocument> {
    const reports = await this.reportRepo.findOne(
      region,
      reported_user_niceName,
    );
    if (!reports) {
      throw new NotFoundException(this.reportNotFound);
    }

    return reports;
  }

  public async createManyReports(
    region: string,
    body: CreateManyReportsDto,
  ): Promise<ReportAbuseDocument[]> {
    for (let i = 0; i < body.data.length; i++) {
      body.data[i]['region'] = region;
    }

    return await this.reportRepo.createManyReports(body.data);
  }
}
