import { CreateTipDto, UpdateTipDto } from '../dtos';
import { Model, ObjectId } from 'mongoose';
import { Tip, TipDocument } from '../schema/tip.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TipRepository {
  public constructor(@InjectModel(Tip.name) private tipModel: Model<Tip>) {}

  public async findOne(_id: ObjectId, region: string): Promise<TipDocument> {
    return await this.tipModel.findOne({ _id, region });
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<TipDocument[]> {
    const query = {
      region,
      ...(search
        ? { $or: [{ text: { $regex: search.toString(), $options: 'i' } }] }
        : {}),
    };
    const skipAmount = pageNumber * pageSize;

    return await this.tipModel.find(query).skip(skipAmount).limit(pageSize);
  }

  public async deleteOne(region: string, _id: ObjectId): Promise<TipDocument> {
    return await this.tipModel.findOneAndDelete({ _id, region });
  }

  public async updateOne(
    region: string,
    _id: ObjectId,
    body: UpdateTipDto,
  ): Promise<TipDocument> {
    return await this.tipModel.findOneAndUpdate({ _id, region }, body, {
      new: true,
    });
  }

  public async createOne(
    body: CreateTipDto,
    region: string,
  ): Promise<TipDocument> {
    return await this.tipModel.create({ ...body, region });
  }

  public async getTipCount(region: string): Promise<number> {
    return await this.tipModel.count({ region }).lean().exec();
  }

  public async findRandomTip(
    region: string,
    max: number,
  ): Promise<TipDocument> {
    const data = await this.tipModel
      .findOne({ region }, { _id: 0, text: 1 })
      .skip(Math.floor(Math.random() * (max - 1)))
      .exec();

    return data;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.tipModel.countDocuments(obj);

    return docCount;
  }
}
