import {
  CreateMachineLogDto,
  CreateManyMachineLogDTO,
  UpdateMachineLogDto,
} from './dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { json2csv } from 'json-2-csv';
import { MachineLogDocument } from './schema/machine-log.schema';
import { MachineLogRepository } from './repository/machine-log.repository';
import { ObjectId } from 'mongoose';
@Injectable()
export class MachineLogService {
  public machinelogNotfound = 'machine_log not found';
  public constructor(private machineLogRepo: MachineLogRepository) {}

  public async createOne(
    body: CreateMachineLogDto,
    region: string,
  ): Promise<object> {
    const newLog = await this.machineLogRepo.createOne(region, body);
    const response = {
      _id: newLog._id,
    };

    return response;
  }

  public async findOne(
    _id: ObjectId,
    region: string,
  ): Promise<MachineLogDocument> {
    const machineLog = await this.machineLogRepo.findOne(_id, region);

    if (!machineLog) throw new NotFoundException(this.machinelogNotfound);

    return machineLog;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const machineLogList = await this.machineLogRepo.findAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.machineLogRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: machineLogList,
    };
  }

  public async deleteOne(region: string, _id: ObjectId): Promise<object> {
    const machineLog = await this.machineLogRepo.deleteOne(region, _id);

    if (!machineLog) throw new NotFoundException(this.machinelogNotfound);

    return { message: 'Deleted Success' };
  }

  public async updateOne(
    region: string,
    _id: ObjectId,
    body: UpdateMachineLogDto,
  ): Promise<object> {
    const machineLog = await this.machineLogRepo.updateOne(region, _id, body);

    if (!machineLog) throw new NotFoundException(this.machinelogNotfound);

    const response = {
      _id: machineLog._id,
    };

    return response;
  }

  public async createManyMachineLogs(
    body: CreateManyMachineLogDTO,
  ): Promise<MachineLogDocument[]> {
    // for (let i = 0; i < body.data.length; i++) {
    //   // console.log(i)
    //   body.data[i]['_id'] = uuid();
    // }
    const bulkData = await this.machineLogRepo.createManyMachineLogs(body);
    if (bulkData.length <= 0) {
      throw new NotFoundException('Data not inserted.');
    }

    return bulkData;
  }

  public async exportToCSV(region: string): Promise<Buffer> {
    const machineLogs = await this.machineLogRepo.findAll(region);

    if (machineLogs.length <= 0) {
      throw new NotFoundException('machine_models not found');
    }

    const csv = await json2csv(machineLogs, { unwindArrays: true });
    const data = Buffer.from(csv);

    return data;
  }
}
