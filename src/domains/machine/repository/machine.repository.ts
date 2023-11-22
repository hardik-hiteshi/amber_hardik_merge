import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMachineDto, UpdateMachineDto } from '../dtos';
import { Machine, MachineDocument } from '../schema/machine.schema';
import { IItemsToInsert } from '../interface/createManyMachine.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class MachineRepository {
  public constructor(
    @InjectModel(Machine.name) private machineModel: Model<Machine>,
  ) {}

  public async createOne(
    body: CreateMachineDto,
    region: string,
  ): Promise<MachineDocument> {
    return await this.machineModel.create({ ...body, region });
  }

  public async findOne(
    query: RecursivePartial<Machine> | object,
  ): Promise<MachineDocument> {
    return await this.machineModel.findOne(query);
  }

  public async findAll(
    query: RecursivePartial<Machine> | object,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<MachineDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.machineModel.find(query).skip(skipAmount).limit(pageSize);
  }

  public async deleteOne(
    query: RecursivePartial<Machine> | object,
  ): Promise<MachineDocument> {
    return await this.machineModel.findOneAndDelete(query);
  }

  public async findOneAndUpdate(
    query: RecursivePartial<Machine> | object,
    body: UpdateMachineDto,
  ): Promise<MachineDocument> {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('request body can not be empty');

    return await this.machineModel.findOneAndUpdate(query, body, {
      new: true,
    });
  }

  public async createMany(body: IItemsToInsert[]): Promise<MachineDocument[]> {
    const machine = (await this.machineModel.insertMany(
      body,
    )) as MachineDocument[];

    return machine;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.machineModel.countDocuments(obj);

    return docCount;
  }
}
