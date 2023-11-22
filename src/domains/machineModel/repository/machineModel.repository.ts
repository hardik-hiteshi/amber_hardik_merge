import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MachineModel,
  MachineModelDocument,
} from '../schema/machineModel.schema';
import { CreateMachineModelDto } from '../dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class MachineModelRepository {
  public constructor(
    @InjectModel(MachineModel.name) private machineModel: Model<MachineModel>,
  ) {}

  public async findAll(
    query: RecursivePartial<MachineModel> | object,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<MachineModelDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.machineModel
      .find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .lean();
  }

  public async findOne(
    query: RecursivePartial<MachineModel>,
  ): Promise<MachineModelDocument> {
    return await this.machineModel.findOne(query);
  }

  public async createOne(
    body: CreateMachineModelDto,
  ): Promise<MachineModelDocument> {
    return await this.machineModel.create(body);
  }

  public async findOneAndUpdate(
    query: RecursivePartial<MachineModel> | object,
    body: RecursivePartial<MachineModel>,
  ): Promise<MachineModelDocument> {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('request body can not be empty');

    return await this.machineModel.findOneAndUpdate(query, body, { new: true });
  }

  public async createMany(
    body: Array<CreateMachineModelDto>,
  ): Promise<MachineModelDocument[]> {
    const machineModel = (await this.machineModel.insertMany(
      body,
    )) as MachineModelDocument[];

    return machineModel;
  }

  public async deleteOne(code: string): Promise<MachineModelDocument> {
    return await this.machineModel.findOneAndDelete({ code });
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.machineModel.countDocuments(obj);

    return docCount;
  }
}
