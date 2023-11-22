import { CreatePictosDto, UpdatePictosDto } from '../dtos';
import { Pictos, PictosDocument } from '../schema/pictos.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class PictosRepository {
  public constructor(
    @InjectModel(Pictos.name) private pictosModel: Model<Pictos>,
  ) {}

  public async findOne(
    query: RecursivePartial<Pictos> | object,
  ): Promise<PictosDocument> {
    return await this.pictosModel.findOne(query);
  }

  public async findAll(
    query: RecursivePartial<Pictos> | object,
  ): Promise<PictosDocument[]> {
    return await this.pictosModel.find(query);
  }

  public async findAllByRegion(
    region: string,
    pageNumber,
    pageSize,
  ): Promise<PictosDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.pictosModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);
  }

  public async createOne(
    body: CreatePictosDto,
    region: string,
  ): Promise<PictosDocument> {
    return await this.pictosModel.create({ ...body, region });
  }

  public async updateOne(
    niceName: string,
    body: UpdatePictosDto,
    region: string,
  ): Promise<PictosDocument> {
    return await this.pictosModel.findOneAndUpdate({ niceName, region }, body, {
      new: true,
    });
  }

  public async createMany(data: CreatePictosDto[]): Promise<PictosDocument[]> {
    return await this.pictosModel.insertMany(data);
  }

  public async findDistinctNiceName(region: string): Promise<string[]> {
    return await this.pictosModel.distinct('niceName', { region }).lean();
  }

  public async deleteOne(niceName: string, region: string): Promise<object> {
    return await this.pictosModel.findOneAndDelete({ niceName, region });
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.pictosModel.countDocuments(obj);

    return docCount;
  }
}
