import {
  Advertisement,
  AdvertisementDocument,
} from '../schemas/advertisement.schema';
import { AdQueryInterface } from './advertisement.queryinterface';
import { CreateAdvertisementDTO } from '../dto/createadvertisement.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAdvertisementDTO } from '../dto/updateadvertisement.dto';
@Injectable()
export class AdvertisementRepository {
  public constructor(
    @InjectModel(Advertisement.name)
    public advertisementModel: Model<AdvertisementDocument>,
  ) {}

  public async createAdvertisement(
    region: string,
    body: CreateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    const advertisement = await this.advertisementModel.create({
      region,
      ...body,
    });

    return advertisement;
  }

  public async findOne(
    region: string,
    body: string,
  ): Promise<AdvertisementDocument> {
    const existingAdvertisement = await this.advertisementModel.findOne({
      region,
      niceName: body,
    });

    return existingAdvertisement;
  }

  public async fetchAdvertisement(
    region: string,
    niceName: string,
  ): Promise<AdvertisementDocument> {
    const advertisement = await this.advertisementModel.findOne({
      region,
      niceName,
    });
    //.populate('category');

    return advertisement;
  }

  public async updateAdvertisement(
    region: string,
    niceName: string,
    body: UpdateAdvertisementDTO,
  ): Promise<AdvertisementDocument> {
    const updatedAdvertisement = await this.advertisementModel.findOneAndUpdate(
      { region, niceName },
      body,
      { new: true },
    );

    return updatedAdvertisement;
  }

  public async deleteAdvertisement(
    query: object,
  ): Promise<AdvertisementDocument> {
    const deleteAdvertisement = await this.advertisementModel.findOneAndDelete(
      query,
    );

    return deleteAdvertisement;
  }

  public async fetchAdvertisements(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AdvertisementDocument[]> {
    const query: AdQueryInterface = {};
    const parsed = Number(search);
    const viewsFilter = !isNaN(parsed) ? { views: parsed } : {};
    const clicksFilter = !isNaN(parsed) ? { clicks: parsed } : {};
    const dateFilter = Date.parse(search)
      ? { date: new Date(search).toISOString() }
      : {};

    if (search) {
      query.$or = [
        viewsFilter,
        clicksFilter,
        { niceName: { $regex: search.toString(), $options: 'i' } },
        dateFilter,
        //will work on searching advertisement search later
        // { 'category.niceName': { $regex: search.toString(), $options: 'i' } },
        { url: { $regex: search.toString(), $options: 'i' } },
        { urlTitle: { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
      ];
    }
    const skipAmount = pageNumber * pageSize;

    const advertisementList = await this.advertisementModel
      .find({
        $and: [query, { region }],
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('category', 'niceName');

    return advertisementList;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.advertisementModel.countDocuments(obj);

    return docCount;
  }

  public async fetchbyCatAdvertisement(
    where: object,
    optionalParam: object,
  ): Promise<AdvertisementDocument> {
    const adbyCat = await this.advertisementModel.findOne(where, optionalParam);

    return adbyCat;
  }

  public async incrementView(wUpdate: object): Promise<AdvertisementDocument> {
    const add = await this.advertisementModel.findOneAndUpdate(wUpdate, {
      $inc: { views: 1 },
    });

    return add;
  }

  public async incrementclick(where: object): Promise<AdvertisementDocument> {
    const incClick = await this.advertisementModel.findOneAndUpdate(
      where,
      { $inc: { clicks: 1 } },
      { new: true },
    );

    return incClick;
  }
}
