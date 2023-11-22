import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMachineDto,
  CreateManyMachineDto,
  UpdateMachineDto,
} from './dtos';
import { IItemsToInsert } from './interface/createManyMachine.interface';
import { MachineDocument } from './schema/machine.schema';
import { MachineRepository } from './repository/machine.repository';
import { ObjectId } from 'mongoose';
import { SerialDto } from './dtos/createManyMachine/subDto/serial.dto';

@Injectable()
export class MachineService {
  public constructor(private machineRepo: MachineRepository) {}

  public async createOne(
    body: CreateMachineDto,
    region: string,
  ): Promise<object> {
    const machine = await this.machineRepo.findOne({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'serial.counter': body.serial.counter,
    });

    if (machine) {
      throw new BadRequestException('machine serial counter already exist');
    }

    const newMachine = await this.machineRepo.createOne(body, region);
    const response = {
      _id: newMachine._id,
    };

    return response;
  }

  public async findOne(
    _id: ObjectId,
    region: string,
  ): Promise<MachineDocument> {
    const machine = await this.machineRepo.findOne({
      _id,
      region,
    });
    if (!machine) throw new NotFoundException('machine not found');

    return machine;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const machineList = await this.machineRepo.findAll(
      { region },
      pageNumber,
      pageSize,
    );

    const count = await this.machineRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: machineList,
    };
  }

  public async deleteOne(region: string, _id: ObjectId): Promise<object> {
    const machine = await this.machineRepo.deleteOne({
      region,
      _id,
    });
    if (!machine) throw new NotFoundException('machine not found');

    return { message: 'Deleted Success' };
  }

  public async findOneAndUpdate(
    region: string,
    _id: ObjectId,
    body: UpdateMachineDto,
  ): Promise<object> {
    // if (body.serial?.counter) {
    //   const machine = await this.machineRepo.findOne({
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     'serial.counter': body.serial.counter,
    //   });
    //   if (machine)
    //     throw new BadRequestException('serial.counter is already exist');
    // }
    const machine = await this.machineRepo.findOneAndUpdate(
      { region, _id },
      body,
    );

    if (!machine) throw new NotFoundException('machine not found');

    const response = {
      _id: machine._id,
    };

    return response;
  }

  public async createMany(
    body: CreateManyMachineDto,
    region: string,
  ): Promise<MachineDocument[]> {
    const data = body.array.map((i) => i.serial);
    const existingItems = await this.machineRepo.findAll({
      serial: { $in: data },
    });

    const existingItemSerial = existingItems.map((item) => item.serial.counter);

    const items: Partial<SerialDto>[] = body.array.filter(
      (item) => !existingItemSerial.includes(item.serial.counter),
    );

    if (items.length === 0) {
      throw new BadRequestException('All items already exist');
    }
    // for (const obj of itemsToInsert) {
    //   obj.region = region;
    //   obj._id = uuid();
    // }

    const itemsToInsert: IItemsToInsert[] = items.map((item) => ({
      ...item,
      region,
    }));
    const machine = await this.machineRepo.createMany(itemsToInsert);

    return machine;
  }
}
