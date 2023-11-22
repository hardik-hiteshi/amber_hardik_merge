import { Rank, RankDocument } from '../schema/rank.schema';
import { CreateRankDTO } from '../dto/createDto/createrank.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RankQueryInterface } from './rank.query.interface';
import { UpdateRankDTO } from '../dto/updateDto/updaterank.dto';
@Injectable()
export class RankRepository {
  public constructor(
    @InjectModel(Rank.name) public rankModel: Model<RankDocument>,
  ) {}

  public async findOne(
    region: string,
    body: CreateRankDTO,
  ): Promise<RankDocument> {
    const existingRank = await this.rankModel.findOne({
      region,
      ...body,
    });

    return existingRank;
  }

  public async createRank(
    region: string,
    body: CreateRankDTO,
  ): Promise<RankDocument> {
    const rank = await this.rankModel.create({ ...body, region });

    return rank;
  }

  public async fetchRank(
    region: string,
    niceName: string,
  ): Promise<RankDocument> {
    const rank = await this.rankModel.findOne({
      region,
      niceName,
    });

    return rank;
  }

  public async updateRank(
    region: string,
    niceName: string,
    body: UpdateRankDTO,
  ): Promise<RankDocument> {
    const updatedRank = await this.rankModel.findOneAndUpdate(
      { region, niceName },
      body,
      { new: true },
    );

    return updatedRank;
  }

  public async deleteRank(
    region: string,
    niceName: string,
  ): Promise<RankDocument> {
    const deletedRank = await this.rankModel.findOneAndDelete({
      region,
      niceName,
    });

    return deletedRank;
  }

  public async fetchRanks(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<RankDocument[]> {
    const query: RankQueryInterface = {
      region,
    };
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { name: { $regex: search.toString(), $options: 'i' } },
        { niceName: { $regex: search.toString(), $options: 'i' } },
        { description: { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const ranks = await this.rankModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return ranks;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.rankModel.countDocuments(obj);

    return docCount;
  }
}
