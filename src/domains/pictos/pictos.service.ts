import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManyPictostDto, CreatePictosDto, UpdatePictosDto } from './dtos';
import { PictosDocument } from './schema/pictos.schema';
import { PictosRepository } from './repository/pictos.repository';

@Injectable()
export class PictosService {
  public pictosAlreadyExist = 'pictos already exist';

  public pictosNotFound = 'pictos not found';
  public constructor(private pictosRepo: PictosRepository) {}

  public async createOne(
    body: CreatePictosDto,
    region: string,
  ): Promise<object> {
    const pictos = await this.pictosRepo.findOne({
      region,
      niceName: body.niceName,
    });

    if (pictos) throw new BadRequestException(this.pictosAlreadyExist);

    const newData = await this.pictosRepo.createOne(body, region);
    const response = {
      niceName: newData.niceName,
    };

    return response;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<PictosDocument> {
    const pictos = await this.pictosRepo.findOne({
      niceName,
      region,
    });

    if (!pictos) throw new NotFoundException(this.pictosNotFound);

    return pictos;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const pictosList = await this.pictosRepo.findAllByRegion(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.pictosRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: pictosList,
    };
  }

  public async deleteOne(region: string, niceName: string): Promise<object> {
    const pictos = await this.pictosRepo.deleteOne(region, niceName);

    if (!pictos) throw new NotFoundException(this.pictosNotFound);

    return { message: 'Deleted Success' };
  }

  public async updateOne(
    niceName: string,
    body: UpdatePictosDto,
    region: string,
  ): Promise<object> {
    const pictos = await this.pictosRepo.updateOne(niceName, body, region);
    if (!pictos) {
      throw new NotFoundException(this.pictosNotFound);
    }
    const response = {
      niceName: pictos.niceName,
    };

    return response;
  }

  public async createMany(
    body: CreateManyPictostDto,
  ): Promise<PictosDocument[]> {
    let existingItemSerial: string[][];
    let itemsToInsert: CreatePictosDto[];
    const data = body.data.map((i) => i.niceName);
    const existingItems = await this.pictosRepo.findAll({
      niceName: { $in: data },
    });

    if (existingItems.length > 0) {
      existingItemSerial = existingItems.map((item) => [
        item.niceName,
        item.region,
      ]);

      itemsToInsert = body.data.filter(
        (item) =>
          !existingItemSerial.some(
            (i) => i[0] == item.niceName && i[1] == item.region,
          ),
      );
    } else {
      itemsToInsert = body.data;
    }

    if (itemsToInsert.length === 0) {
      throw new BadRequestException('All items already exist');
    }

    return await this.pictosRepo.createMany(itemsToInsert);
  }

  public async deleteImage(region: string, niceName: string): Promise<void> {
    const pictos = await this.pictosRepo.findOne({ region, niceName });

    if (!pictos) throw new NotFoundException(this.pictosNotFound);

    pictos.image = [];

    await pictos.save();
  }

  public async findDistinctNiceName(region: string): Promise<string[]> {
    const niceName = await this.pictosRepo.findDistinctNiceName(region);

    if (!niceName) throw new NotFoundException('not found');

    return niceName;
  }
}
