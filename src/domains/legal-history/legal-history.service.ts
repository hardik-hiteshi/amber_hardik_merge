import { Injectable, NotFoundException } from '@nestjs/common';
import { LegalHistoryDocument } from './schema/legal-history.schema';
import { LegalHistoryRepository } from './repository/legal-history.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class LegalHistoryService {
  public notfound = 'Legal History not found';
  public constructor(public lhRepo: LegalHistoryRepository) {}

  public async fetchAllLH(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const legalHistoryList = await this.lhRepo.fetchAllLH(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.lhRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: legalHistoryList,
    };
  }

  public async fetchLH(
    region: string,
    _id: ObjectId,
  ): Promise<LegalHistoryDocument> {
    const legalHistory = await this.lhRepo.fetchLH(region, _id);
    if (!legalHistory) {
      throw new NotFoundException(this.notfound);
    }

    return legalHistory;
  }
}
