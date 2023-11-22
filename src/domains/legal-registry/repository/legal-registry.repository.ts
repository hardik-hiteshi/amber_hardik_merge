import {
  LegalRegistry,
  LegalRegistryDocument,
} from '../schema/legal-registry.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateLegalRegistryDTO } from '../dto/createLegalRegistry.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LegalRegistryRepository {
  public constructor(
    @InjectModel(LegalRegistry.name)
    public legalRegistryModel: Model<LegalRegistry>,
  ) {}

  public async findOne(
    region: string,
    body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    const legalRegDoc = await this.legalRegistryModel.findOne({
      region,
      ...body,
    });

    return legalRegDoc;
  }

  public async create(
    region: string,
    body: CreateLegalRegistryDTO,
  ): Promise<LegalRegistryDocument> {
    const createdLegalRegDoc = await this.legalRegistryModel.create({
      region,
      ...body,
    });

    return createdLegalRegDoc;
  }

  public async fetchOne(
    region: string,
    _id: ObjectId,
  ): Promise<LegalRegistryDocument> {
    const legalRegDoc = await this.legalRegistryModel.findOne({
      region,
      _id,
    });

    return legalRegDoc;
  }

  public async fetchAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<LegalRegistryDocument[]> {
    const skipAmount = pageNumber * pageSize;
    const legalRegDoc = await this.legalRegistryModel
      .find({
        region,
      })
      .skip(skipAmount)
      .limit(pageSize);

    return legalRegDoc;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.legalRegistryModel.countDocuments(obj);

    return docCount;
  }
}
