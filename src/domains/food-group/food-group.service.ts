import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateFoodGroupDto,
  CreateManyFoodGroupDto,
  UpdateFoodGroupDto,
} from './dtos';
import { FoodGroupDocument } from './schema/food-group.schema';
import { FoodGroupRepository } from './repository/food-group.repository';

@Injectable()
export class FoodGroupService {
  public foodGroupAlreadyExist = 'food group already exist';
  public foodGroupNotFound = 'food group not found';
  public constructor(private foodGroupRepo: FoodGroupRepository) {}

  public async createOne(
    body: CreateFoodGroupDto,
    region: string,
  ): Promise<object> {
    const foodGroup = await this.foodGroupRepo.findOne(region, body.niceName);
    if (foodGroup) {
      throw new BadRequestException(this.foodGroupAlreadyExist);
    }

    const newFoodGroup = await this.foodGroupRepo.createOne(body, region);

    const response = {
      niceName: newFoodGroup.niceName,
    };

    return response;
  }

  public async updateOne(
    body: UpdateFoodGroupDto,
    region: string,
    niceName: string,
  ): Promise<object> {
    const updatedFoodGroup = await this.foodGroupRepo.updateOne(
      region,
      niceName,
      body,
    );
    if (!updatedFoodGroup) {
      throw new NotFoundException(this.foodGroupNotFound);
    }
    const response = {
      niceName: updatedFoodGroup.niceName,
    };

    return response;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<FoodGroupDocument> {
    const foodGroup = await this.foodGroupRepo.findOne(region, niceName);

    if (!foodGroup) throw new NotFoundException(this.foodGroupNotFound);

    return foodGroup;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const foodGroupList = await this.foodGroupRepo.findAllByRegion(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.foodGroupRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: foodGroupList,
    };
  }

  public async deleteOne(niceName: string, region: string): Promise<object> {
    const foodGroup = await this.foodGroupRepo.deleteOne(region, niceName);

    if (!foodGroup) throw new NotFoundException(this.foodGroupNotFound);

    return { message: 'Deleted Success' };
  }

  public async findDistinctNiceName(region: string): Promise<string[]> {
    const niceName = await this.foodGroupRepo.findDistinctNiceName(region);

    if (!niceName) throw new NotFoundException('not found');

    return niceName;
  }

  public async deleteImage(region: string, niceName: string): Promise<void> {
    const foodGroup = await this.foodGroupRepo.findOne(region, niceName);

    if (!foodGroup) throw new NotFoundException(this.foodGroupNotFound);

    foodGroup.image = [];

    await foodGroup.save();
  }

  public async createMany(
    body: CreateManyFoodGroupDto,
  ): Promise<FoodGroupDocument[]> {
    let existingItemSerial: string[][];
    let itemsToInsert: CreateFoodGroupDto[];
    const data = body.data.map((i) => i.niceName);
    const existingItems = await this.foodGroupRepo.findAll({
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

    return await this.foodGroupRepo.createMany(itemsToInsert);
  }
}
