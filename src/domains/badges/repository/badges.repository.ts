/* eslint-disable @typescript-eslint/naming-convention */
import { Badges, BadgesDocument } from '../schema/badges.schema';
import { BadgeQueryInterface } from './badges.query.interface';
import { CreateBadgesDTO } from '../dto/createdto/createbadge.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBadgesDTO } from '../dto/updatedto/updatebadge.dto';

@Injectable()
export class BadgesRespository {
  public constructor(
    @InjectModel(Badges.name) public badgesModel: Model<BadgesDocument>,
  ) {}

  public async findOne(region: string, niceName: string): Promise<unknown> {
    const badge = await this.badgesModel.findOne({
      region,
      niceName,
    });

    return badge;
  }

  public async createBadge(
    region: string,
    body: CreateBadgesDTO,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesModel.create({ ...body, region });

    return badge;
  }

  public async fetchBadge(
    region: string,
    niceName: string,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesModel.findOne({
      region,
      niceName,
    });

    return badge;
  }

  public async updateBadge(
    region: string,
    niceName: string,
    body: UpdateBadgesDTO,
  ): Promise<BadgesDocument> {
    const updatedBadge = await this.badgesModel.findOneAndUpdate(
      { region, niceName },
      body,
      { new: true },
    );

    return updatedBadge;
  }

  public async deleteBadge(
    region: string,
    niceName: string,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesModel.findOneAndDelete({ region, niceName });

    return badge;
  }

  public async fetchBadges(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<BadgesDocument[]> {
    const query: BadgeQueryInterface = {};
    const parsedIndex = Number(search);
    const indexFilter = !isNaN(parsedIndex) ? { index: parsedIndex } : {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { niceName: { $regex: search, $options: 'i' } },
        indexFilter,
        { range: { $regex: search.toString(), $options: 'i' } },
        { description: { $regex: search.toString(), $options: 'i' } },
        { prize_txt: { $regex: search.toString(), $options: 'i' } },
        { prize: { $regex: search.toString(), $options: 'i' } },
        { terms: { $regex: search.toString(), $options: 'i' } },
        //will work on this later.
        // { 'translations._id': { $regex: search.toString(), $options: 'i' } },
        // { 'preserve._id': { $regex: search.toString(), $options: 'i' } },
        // {
        //   'translations.to': {
        //     $elemMatch: {
        //       $or: [
        //         { region: { $regex: search.toString(), $options: 'i' } },
        //         { niceName: { $regex: search.toString(), $options: 'i' } },
        //       ],
        //     },
        //   },
        // },
      ];
    }

    const projection = { _id: 0, __v: 0 };
    const options = { sort: { index: 1 } };

    const badges = await this.badgesModel
      .find(
        {
          $and: [query, { region }],
        },
        projection,
        options,
      )
      .skip(skipAmount)
      .limit(pageSize);

    // if (badges.length > 0) {
    return badges;
    // }
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.badgesModel.countDocuments(obj);

    return docCount;
  }

  public async fetchBadgesEnum(region: string): Promise<Array<string>> {
    const badges = await this.badgesModel.distinct('niceName', { region });

    return badges;
  }
}
