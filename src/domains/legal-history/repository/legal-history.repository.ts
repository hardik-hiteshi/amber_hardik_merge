import {
  LegalHistory,
  LegalHistoryDocument,
} from '../schema/legal-history.schema';
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LegalHistoryRepository {
  public constructor(
    @InjectModel(LegalHistory.name) public lhModel: Model<LegalHistory>,
  ) {}

  public async fetchAllLH(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<Partial<LegalHistoryDocument>[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.lhModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize)
      .select('region version _id');
  }

  public async fetchLH(
    region: string,
    _id: ObjectId,
  ): Promise<LegalHistoryDocument> {
    const legalHistory = await this.lhModel.findOne({ region, _id });

    return legalHistory;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.lhModel.countDocuments(obj);

    return docCount;
  }
}
