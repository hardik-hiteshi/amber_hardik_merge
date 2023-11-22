import { Alias, AliasDocument } from '../schema/alias.schema';
import { CreateAliasDto, UpdateAliasDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AliasRepository {
  public constructor(
    @InjectModel(Alias.name) private aliasModel: Model<Alias>,
  ) {}

  public async findOne(niceName: string): Promise<AliasDocument> {
    return await this.aliasModel.findOne({ niceName });
  }

  public async findAll(
    pageNumber: number,
    pageSize: number,
  ): Promise<AliasDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.aliasModel.find().skip(skipAmount).limit(pageSize);
  }

  public async deleteOne(niceName: string): Promise<AliasDocument> {
    return this.aliasModel.findOneAndDelete({ niceName });
  }

  public async createOne(body: CreateAliasDto): Promise<AliasDocument> {
    return await this.aliasModel.create(body);
  }

  public async updateOne(
    niceName: string,
    body: UpdateAliasDto,
  ): Promise<AliasDocument> {
    return await this.aliasModel.findOneAndUpdate({ niceName }, body, {
      new: true,
    });
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.aliasModel.countDocuments(obj);

    return docCount;
  }
}
