import { CreateDietDto, UpdateDietDto } from '../dtos';
import { Diet, DietDocument } from '../schema/diets.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DietTo } from '../schema/subSchema/dietTo.subSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class DietsRepository {
  public constructor(@InjectModel(Diet.name) private dietModel: Model<Diet>) {}

  public async createOne(
    body: CreateDietDto,
    region: string,
  ): Promise<DietDocument> {
    return await this.dietModel.create({ ...body, region });
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<DietDocument> {
    return await this.dietModel.findOne({ niceName, region });
  }

  public async findAll(
    query: RecursivePartial<Diet> | object,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<DietDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.dietModel.find(query).skip(skipAmount).limit(pageSize);
  }

  public async updateOne(
    body: UpdateDietDto,
    region: string,
    niceName: string,
  ): Promise<DietDocument> {
    return await this.dietModel.findOneAndUpdate({ niceName, region }, body, {
      new: true,
    });
  }

  public async deleteOne(
    niceName: string,
    region: string,
  ): Promise<DietDocument> {
    return await this.dietModel.findOneAndDelete({ niceName, region });
  }

  public async findTags(
    niceName: string,
    region: string,
  ): Promise<DietDocument['tags']> {
    const data = (
      await this.dietModel.findOne({ niceName, region }).select('tags')
    )?.tags;

    if (!data) throw new NotFoundException('diet not found');

    return data;
  }

  public async findOneTag(
    niceName: string,
    index: number,
    region: string,
  ): Promise<string> {
    const data = (
      await this.dietModel.findOne({ niceName, region }).select('tags')
    )?.tags[index];

    if (!data) throw new NotFoundException('diet not found');

    return data;
  }

  public async findOneTranslation(
    niceName: string,
    index: number,
    region: string,
  ): Promise<DietTo> {
    return (
      await this.dietModel.findOne({ niceName, region }).select('translations')
    ).translations.to[index];
  }

  public async findTranslation(
    niceName: string,
    region: string,
  ): Promise<DietTo[]> {
    return (
      await this.dietModel.findOne({ niceName, region }).select('translations')
    ).translations.to;
  }

  public async findDistinctNiceName(region: string): Promise<string[]> {
    return await this.dietModel.distinct('niceName', { region }).lean();
  }

  public async createManyDiet(body: CreateDietDto[]): Promise<DietDocument[]> {
    return (await this.dietModel.insertMany(body)) as DietDocument[];
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.dietModel.countDocuments(obj);

    return docCount;
  }
}
