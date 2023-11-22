/* eslint-disable @typescript-eslint/naming-convention */
import {
  AffiliateConfig,
  AffiliateConfigDocument,
} from '../schema/affiliateConfig.schema';
import { AffiliateConfigQueryInterface } from './affiliateConfig.query.interface';
import { CreateAffiliateConfigDTO } from '../dto/createDto/createAffiliateConfig.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAffiliateConfigDTO } from '../dto/updateDto/updateAffiliateConfig.dto';

@Injectable()
export class AffiliateConfigRepository {
  public constructor(
    @InjectModel(AffiliateConfig.name)
    public affiliateConfigModel: Model<AffiliateConfigDocument>,
  ) {}

  public async findOne(
    body: CreateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    const existingAffiliateConfig = await this.affiliateConfigModel.findOne({
      cookie_name: body.cookie_name,
    });

    return existingAffiliateConfig;
  }

  public async createAffiliateConfig(
    body: CreateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    const affiliateConfig = await this.affiliateConfigModel.create({ ...body });

    return affiliateConfig;
  }

  public async fetchOne(cookie_name: string): Promise<AffiliateConfigDocument> {
    const affiliateConfig = await this.affiliateConfigModel.findOne({
      cookie_name,
    });

    return affiliateConfig;
  }

  public async updateAffiliateConfig(
    cookie_name: string,
    body: UpdateAffiliateConfigDTO,
  ): Promise<AffiliateConfigDocument> {
    const updatedAffiliateConfig =
      await this.affiliateConfigModel.findOneAndUpdate({ cookie_name }, body, {
        new: true,
      });

    return updatedAffiliateConfig;
  }

  public async deleteAffiliateConfig(
    cookie_name: string,
  ): Promise<AffiliateConfigDocument> {
    const deletedAffiliateConfig =
      await this.affiliateConfigModel.findOneAndDelete({
        cookie_name,
      });

    return deletedAffiliateConfig;
  }

  public async fetchAffiliateConfigs(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AffiliateConfigDocument[]> {
    const query: AffiliateConfigQueryInterface = {};
    if (search) {
      query.$or = [
        { cookie_name: { $regex: search.toString(), $options: 'i' } },
      ];
    }
    const skipAmount = pageNumber * pageSize;

    const affiliateConfigs = await this.affiliateConfigModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return affiliateConfigs;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.affiliateConfigModel.countDocuments(obj);

    return docCount;
  }
}
