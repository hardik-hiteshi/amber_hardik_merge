import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFactoryDTO } from './dto/createfactory.dto';
// import { CreateManyFactoriesDTO } from './dto/createManyFactories.dto';
import { FactoryDocument } from './schema/factory.schema';
import { FactoryRepository } from './repository/factory.repository';
import { ObjectId } from 'mongoose';
import { UpdateFactoryDTO } from './dto/updatefactory.dto';

@Injectable()
export class FactoryService {
  public constructor(public factoryRepo: FactoryRepository) {}

  public async createFactory(
    region: string,
    body: CreateFactoryDTO,
  ): Promise<object> {
    const factoryExists = await this.factoryRepo.findOne(region, body);
    if (factoryExists) {
      throw new BadRequestException('Factory already exists.');
    }

    const newFactory = await this.factoryRepo.createFactory(region, body);
    const response = {
      _id: newFactory._id,
    };

    return response;
  }

  public async updateFactory(
    region: string,
    _id: ObjectId,
    body: UpdateFactoryDTO,
  ): Promise<object> {
    const factory = await this.factoryRepo.updateFactory(region, _id, body);
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    const response = {
      _id: factory._id,
    };

    return response;
  }

  public async deleteFactory(region: string, _id: ObjectId): Promise<object> {
    const factory = await this.factoryRepo.deleteFactory(region, _id);
    if (!factory) {
      throw new NotFoundException('Factory Does not exist.');
    }

    return { message: 'Deleted Success' };
  }

  public async findFactory(
    region: string,
    _id: ObjectId,
  ): Promise<FactoryDocument> {
    const factory = await this.factoryRepo.fetchFactory(region, _id);
    if (!factory) {
      throw new NotFoundException('Factory not found.');
    }

    return factory;
  }

  public async fetchFactoryMachineType(
    region: string,
    _id: ObjectId,
  ): Promise<Partial<FactoryDocument>> {
    const machineType = await this.factoryRepo.fetchFactoryMachineType(
      region,
      _id,
    );
    if (!machineType) {
      throw new NotFoundException('Machine type not found.');
    }

    return machineType;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const factorylist = await this.factoryRepo.fetchFactories(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.factoryRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: factorylist,
    };
  }

  // public async createManyFactories(
  //   region: string,
  //   body: CreateManyFactoriesDTO,
  // ): Promise<FactoryDocument[]> {
  //   // return await this.factoryRepo.createManyFactories(region, body);
  //   const filterData = [];
  //   const data = body.data;
  //   console.log(data);
  //   // const data = body.data.map((i) => if(!i._id){filterData.push(i.uniqeId));
  //   // const existingItems = await this.factoryRepo.findAll({
  //   //   uniqeId: { $in: data },
  //   // });

  //   // const existingItemSerial = existingItems.map((item) => [
  //   //   item.niceName,
  //   //   item.region,
  //   // ]);

  //   // const itemsToInsert = body.data.filter(
  //   //   (item) =>
  //   //     !existingItemSerial.some(
  //   //       (i) => i[0] == item.niceName && i[1] == item.region,
  //   //     ),
  //   // );

  //   // if (itemsToInsert.length === 0) {
  //   //   throw new BadRequestException('All items already exist');
  //   // }

  //   // return await this.dietRepo.createManyDiet(itemsToInsert);
  //   return [];
  // }
}
