import {
  CreateMachineLogDto,
  CreateManyMachineLogDTO,
  UpdateMachineLogDto,
} from '../dtos';
import { MachineLog, MachineLogDocument } from '../schema/machine-log.schema';
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MachineLogRepository {
  public constructor(
    @InjectModel(MachineLog.name) private machineLogModel: Model<MachineLog>,
  ) {}

  public async createOne(
    region: string,
    body: CreateMachineLogDto,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.create({ ...body, region });
  }

  public async findOne(
    _id: ObjectId,
    region: string,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.findOne({
      _id,
      region,
    });
  }

  public async findAll(
    region: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<MachineLogDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.machineLogModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize)
      .lean();
  }

  public async deleteOne(
    region: string,
    _id: ObjectId,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.findOneAndDelete({
      _id,
      region,
    });
  }

  public async updateOne(
    region: string,
    _id: ObjectId,
    body: UpdateMachineLogDto,
  ): Promise<MachineLogDocument> {
    return await this.machineLogModel.findOneAndUpdate(
      {
        region,
        _id,
      },
      body,
      { new: true },
    );
  }

  public async createManyMachineLogs(
    body: CreateManyMachineLogDTO,
  ): Promise<MachineLogDocument[]> {
    return (await this.machineLogModel.insertMany(
      body.data,
    )) as MachineLogDocument[];
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.machineLogModel.countDocuments(obj);

    return docCount;
  }
}
