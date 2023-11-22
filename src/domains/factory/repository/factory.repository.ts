import { Factory, FactoryDocument } from '../schema/factory.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateFactoryDTO } from '../dto/createfactory.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateFactoryDTO } from '../dto/updatefactory.dto';

@Injectable()
export class FactoryRepository {
  public constructor(
    @InjectModel(Factory.name) public factoryModel: Model<Factory>,
  ) {}

  public async findOne(
    region: string,
    body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOne({ ...body, region });

    return factory;
  }

  public async createFactory(
    region: string,
    body: CreateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.create({
      ...body,
      region,
    });

    return factory;
  }

  public async updateFactory(
    region: string,
    _id: ObjectId,
    body: UpdateFactoryDTO,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndUpdate(
      { region, _id },
      body,
      {
        new: true,
      },
    );

    return factory;
  }

  public async deleteFactory(
    region: string,
    _id: ObjectId,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOneAndDelete({
      region,
      _id,
    });

    return factory;
  }

  public async fetchFactory(
    region: string,
    _id: ObjectId,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryModel.findOne({ region, _id });

    return factory;
  }

  public async fetchFactoryMachineType(
    region: string,
    _id: ObjectId,
  ): Promise<Partial<FactoryDocument>> {
    const machineType = await this.factoryModel
      .findOne({ region, _id })
      .select('machineType -_id');

    return machineType;
  }

  public async fetchFactories(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FactoryDocument[]> {
    const skipAmount = pageNumber * pageSize;

    const factories = await this.factoryModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);

    return factories;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.factoryModel.countDocuments(obj);

    return docCount;
  }
}
