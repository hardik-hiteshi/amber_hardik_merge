import { CreateTipDto, UpdateTipDto } from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { TipDocument } from './schema/tip.schema';
import { TipRepository } from './repository/tip.repository';

@Injectable()
export class TipService {
  public constructor(private tipRepo: TipRepository) {}

  public async findOne(_id: ObjectId, region: string): Promise<TipDocument> {
    const tip = await this.tipRepo.findOne(_id, region);
    if (!tip) throw new NotFoundException('tip not found');

    return tip;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?,
  ): Promise<object> {
    const tipList = await this.tipRepo.findAll(
      region,
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.tipRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: tipList,
    };
  }

  public async createOne(body: CreateTipDto, region: string): Promise<object> {
    const newTip = await this.tipRepo.createOne(body, region);
    const response = {
      _id: newTip._id,
    };

    return response;
  }

  public async deleteOne(region: string, _id: ObjectId): Promise<object> {
    const tip = await this.tipRepo.deleteOne(region, _id);
    if (!tip) throw new NotFoundException('tip not found');

    return { message: 'Deleted Success' };
  }

  public async updateOne(
    region: string,
    _id: ObjectId,
    body: UpdateTipDto,
  ): Promise<object> {
    const tip = await this.tipRepo.updateOne(region, _id, body);
    if (!tip) throw new NotFoundException('tip not found');

    const response = {
      _id: tip._id,
    };

    return response;
  }

  public async findRandomTip(region: string): Promise<TipDocument> {
    const max = await this.tipRepo.getTipCount(region);

    if (!max) throw new NotFoundException('tip not found');

    const tip = await this.tipRepo.findRandomTip(region, max);

    if (!tip) throw new NotFoundException('tip not found');

    return tip;
  }
}
