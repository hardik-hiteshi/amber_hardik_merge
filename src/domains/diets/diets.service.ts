import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDietDto, CreateManyDietDto, UpdateDietDto } from './dtos';
import { DietDocument } from './schema/diets.schema';
import { DietsRepository } from './repository/diets.repository';
import { DietTo } from './schema/subSchema/dietTo.subSchema';

@Injectable()
export class DietsService {
  private dietAlreadyExist = 'diet already exist';
  private dietNotFound = 'diet not found';
  private tagsNotFound = 'tags not found';
  private translationNotFound = 'translation not found';
  public constructor(private dietRepo: DietsRepository) {}

  public async createOne(body: CreateDietDto, region: string): Promise<object> {
    const dietExists = await this.dietRepo.findOne(body.niceName, region);

    if (dietExists) {
      throw new BadRequestException(this.dietAlreadyExist);
    }

    const newDiet = await this.dietRepo.createOne(body, region);

    const response = {
      niceName: newDiet.niceName,
    };

    return response;
  }

  public async updateOne(
    region: string,
    niceName: string,
    body: UpdateDietDto,
  ): Promise<object> {
    let diet: DietDocument;
    try {
      diet = await this.dietRepo.updateOne(body, region, niceName);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!diet) throw new NotFoundException(this.dietNotFound);
    const response = {
      niceName: diet.niceName,
    };

    return response;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<DietDocument> {
    const diet = await this.dietRepo.findOne(niceName, region);

    if (!diet) throw new NotFoundException(this.dietNotFound);

    return diet;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const dietList = await this.dietRepo.findAll(
      { region },
      pageNumber,
      pageSize,
    );

    const count = await this.dietRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: dietList,
    };
  }

  public async deleteOne(niceName: string, region: string): Promise<object> {
    const diet = await this.dietRepo.deleteOne(niceName, region);
    if (!diet) throw new NotFoundException(this.dietNotFound);

    return { message: 'Deleted Success' };
  }

  public async findTags(
    niceName: string,
    region: string,
  ): Promise<DietDocument['tags']> {
    const tags = await this.dietRepo.findTags(niceName, region);

    if (tags.length <= 0) throw new NotFoundException(this.tagsNotFound);

    return tags;
  }

  public async findOneTag(
    niceName: string,
    index: number,
    region: string,
  ): Promise<string> {
    const tags = await this.dietRepo.findOneTag(niceName, index, region);
    if (!tags) throw new NotFoundException(this.tagsNotFound);

    return tags;
  }

  public async findOneTranslation(
    niceName: string,
    index: number,
    region: string,
  ): Promise<DietTo> {
    const translation = await this.dietRepo.findOneTranslation(
      niceName,
      index,
      region,
    );

    if (!translation) throw new NotFoundException(this.translationNotFound);

    return translation;
  }

  public async findTranslation(
    niceName: string,
    region: string,
  ): Promise<DietTo[]> {
    const translation = await this.dietRepo.findTranslation(niceName, region);

    if (!translation) throw new NotFoundException(this.translationNotFound);

    return translation;
  }

  public async findDistinctNiceName(region: string): Promise<string[]> {
    const niceName = await this.dietRepo.findDistinctNiceName(region);

    if (!niceName) throw new NotFoundException('not found');

    return niceName;
  }

  public async createManyDiet(
    body: CreateManyDietDto,
  ): Promise<DietDocument[]> {
    const data = body.data.map((i) => i.niceName);
    const existingItems = await this.dietRepo.findAll({
      niceName: { $in: data },
    });

    const existingItemSerial = existingItems.map((item) => [
      item.niceName,
      item.region,
    ]);

    const itemsToInsert = body.data.filter(
      (item) =>
        !existingItemSerial.some(
          (i) => i[0] == item.niceName && i[1] == item.region,
        ),
    );

    if (itemsToInsert.length === 0) {
      throw new BadRequestException('All items already exist');
    }

    return await this.dietRepo.createManyDiet(itemsToInsert);
  }

  public async deleteImage(region: string, niceName: string): Promise<void> {
    const diet = await this.dietRepo.findOne(niceName, region);

    if (!diet) throw new NotFoundException(this.dietNotFound);

    diet.image = [];

    await diet.save();
  }
}
