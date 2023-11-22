/* eslint-disable @typescript-eslint/naming-convention */
import { CreateReportDto, UpdateReportDto } from '../dtos';
import {
  ReportAbuse,
  ReportAbuseDocument,
} from '../schema/report-abuse.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReportAbuseRepository {
  public constructor(
    @InjectModel(ReportAbuse.name) private reportModel: Model<ReportAbuse>,
  ) {}

  public async findOne(
    region: string,
    reported_user_niceName: string,
  ): Promise<ReportAbuseDocument> {
    return await this.reportModel.findOne({ region, reported_user_niceName });
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ReportAbuseDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.reportModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);
  }

  public async createOne(
    body: CreateReportDto,
    region: string,
  ): Promise<ReportAbuseDocument> {
    return await this.reportModel.create({ ...body, region });
  }

  public async deleteOne(
    region: string,
    reported_user_niceName: string,
  ): Promise<ReportAbuseDocument> {
    return await this.reportModel.findOneAndDelete({
      region,
      reported_user_niceName,
    });
  }

  public async updateOne(
    region: string,
    reported_user_niceName: string,
    body: UpdateReportDto,
  ): Promise<ReportAbuseDocument> {
    return await this.reportModel.findOneAndUpdate(
      { region, reported_user_niceName },
      body,
      { new: true },
    );
  }

  public async createManyReports(
    body: CreateReportDto[],
  ): Promise<ReportAbuseDocument[]> {
    return (await this.reportModel.insertMany(body)) as ReportAbuseDocument[];
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.reportModel.countDocuments(obj);

    return docCount;
  }
}
