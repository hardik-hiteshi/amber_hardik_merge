import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEbookDTO } from './dtos/createEbook/createEbook.dto';
import { CreateEbookMultiDTO } from './dtos/createManyEbook/createEbook.dto';
import { CreateManyEbookDto } from './dtos/createManyEbook/createManyEbook.dto';
import { EbookDocument } from './schema/ebook.schema';
import { EbookRepository } from './repository/ebook.repository';
import { RecipeDocument } from '../recipe/schema/recipe.schema';
import { RecipeRepository } from '../recipe/repository/recipe.repository';
import { UpdateEbookDTO } from './dtos/updateEbook/updateEbook.dto';

@Injectable()
export class EbookService {
  public ebookNotFound = 'Ebook not found';
  public recipeNotFound = 'This ebook doesnt have any recipe';
  public ebookAlreadyExist = 'Ebook already exist';
  public constructor(
    private ebookRepo: EbookRepository,
    private recipeRepo: RecipeRepository,
  ) {}

  public async createOne(
    region: string,
    body: CreateEbookDTO,
  ): Promise<object> {
    const ebook = await this.ebookRepo.findOne(body.niceName, region);

    if (ebook) {
      throw new BadRequestException(this.ebookAlreadyExist);
    }

    const newEbook = await this.ebookRepo.createOne(region, body);

    const response = {
      niceName: newEbook.niceName,
    };

    return response;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<EbookDocument> {
    const ebook = await this.ebookRepo.findOne(niceName, region);
    if (!ebook) throw new NotFoundException(this.ebookNotFound);

    return ebook;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const ebooksList = await this.ebookRepo.findAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.ebookRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: ebooksList,
    };
  }

  public async updateOne(
    region: string,
    niceName: string,
    body: UpdateEbookDTO,
  ): Promise<object> {
    const ebook = await this.ebookRepo.updateOne(niceName, region, body);
    if (!ebook) throw new NotFoundException(this.ebookNotFound);
    const response = {
      niceName: ebook.niceName,
    };

    return response;
  }

  public async deleteOne(niceName: string, region: string): Promise<object> {
    const ebook = await this.ebookRepo.deleteOne(niceName, region);
    if (!ebook) throw new NotFoundException(this.ebookNotFound);

    return { message: 'Deleted Success' };
  }

  public async findEbookRecipes(
    niceName: string,
    region: string,
    skip: number,
  ): Promise<RecipeDocument[]> {
    const query = { region, niceName };

    const ebook = await this.ebookRepo.findOneByQuery(query);

    if (!ebook) throw new NotFoundException(this.ebookNotFound);

    if (ebook['recipes'].length > 0) {
      const recipeNiceName = ebook['recipes'].map(
        (item: { niceName: string }) => item.niceName,
      );

      const skips = skip != null ? skip || 0 : 0;
      const recipes = await this.recipeRepo.fetchAllByQuery(
        region,
        skips,
        recipeNiceName,
      );

      if (!recipes) {
        throw new NotFoundException(this.ebookNotFound);
      } else {
        return recipes;
      }
    } else {
      throw new NotFoundException(this.recipeNotFound);
    }
  }

  public async upsertEbookRecipe(
    region: string,
    niceName: string,
    body: UpdateEbookDTO,
  ): Promise<EbookDocument> {
    const query = { region, niceName };
    const data = { $set: { recipes: body.recipes } };
    const result = await this.ebookRepo.updateEbook(query, data);
    if (result) {
      return result;
    }
    const reqBody: UpdateEbookDTO & { region: string } = { ...body, region };

    const ebook = await this.ebookRepo.createOne(region, reqBody);

    return ebook;
  }

  public async createMany(
    body: CreateManyEbookDto,
    region: string,
  ): Promise<EbookDocument[]> {
    let existingItemSerial: string[][];
    let itemsToInsert: CreateEbookMultiDTO[];
    const data = body.data.map((i) => i.niceName);
    const existingItems = await this.ebookRepo.findDuplicate(region, data);

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

    return await this.ebookRepo.createMany(itemsToInsert);
  }
}
