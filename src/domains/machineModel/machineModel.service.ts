import * as JSZip from 'jszip';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMachineModelDto,
  CreateManyMachineModelDto,
  UpdateMachineModelDto,
} from './dtos';
import { json2csv } from 'json-2-csv';
import { MachineModelDocument } from './schema/machineModel.schema';
import { MachineModelRepository } from './repository/machineModel.repository';
@Injectable()
export class MachineModelService {
  public constructor(private machineModelRepo: MachineModelRepository) {}

  public async findAll(pageNumber: number, pageSize: number): Promise<object> {
    const machineModelList = await this.machineModelRepo.findAll(
      {},
      pageNumber,
      pageSize,
    );

    const count = await this.machineModelRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: machineModelList,
    };
  }

  public async findOne(code: string): Promise<MachineModelDocument> {
    const machineModel = await this.machineModelRepo.findOne({
      code,
    });

    if (!machineModel) throw new NotFoundException('machine_model not found');

    return machineModel;
  }

  public async createOne(body: CreateMachineModelDto): Promise<object> {
    const machineModel = await this.machineModelRepo.findOne({
      code: body.code,
    });

    if (machineModel) {
      throw new BadRequestException('machine_model already exist');
    }

    const data: CreateMachineModelDto = {
      ...body,
    };

    const newMachineModel = await this.machineModelRepo.createOne(data);
    const response = {
      code: newMachineModel.code,
    };

    return response;
  }

  public async deleteOne(code: string): Promise<object> {
    const machineModel = await this.machineModelRepo.deleteOne(code);
    if (!machineModel) throw new NotFoundException('machine_model not found');

    return { message: 'Deleted Success' };
  }

  public async createMany(body: CreateManyMachineModelDto): Promise<void> {
    const data = body.array.map((i) => i.code);
    const existingItems = await this.machineModelRepo.findAll({
      code: { $in: data },
    });

    const existingItemSerial = existingItems.map((item) => item.code);

    const filteredItems = body.array.filter(
      (item) => !existingItemSerial.includes(item.code),
    );

    if (filteredItems.length === 0) {
      throw new BadRequestException('All items already exist');
    }

    const itemsToInsert = filteredItems.map((item) => ({
      ...item,
    }));

    await this.machineModelRepo.createMany(itemsToInsert);
  }

  public async findOneAndUpdate(
    code: string,
    body: UpdateMachineModelDto,
  ): Promise<object> {
    // if (body.code) {
    //   const machineModel = await this.machineModelRepo.findOne({
    //     code,
    //   });
    //   if (machineModel)
    //     throw new BadRequestException('code in given field is alaeady exist');
    // }
    const machineModel = await this.machineModelRepo.findOneAndUpdate(
      { code },
      body,
    );

    if (!machineModel) throw new NotFoundException('machine_model not found');

    const response = {
      code: machineModel.code,
    };

    return response;
  }

  public async exportFile(
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const machineModels = await this.machineModelRepo.findAll({});

    if (machineModels.length <= 0)
      throw new NotFoundException('machine_models not found');

    if (type === 'csv') {
      const csv = await json2csv(machineModels);
      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(machineModels);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      const xlsxData = xlsx.write(wb, {
        bookType: 'xlsx',
        type: 'buffer',
      }) as Buffer;

      return { data: xlsxData, type };
    } else if (type === 'jsonzip') {
      const jsonFiles: Buffer[] = [];
      const zip = new JSZip();
      const zipFolder = zip.folder('json_data');
      for (const entry of machineModels) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(machineModels));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
