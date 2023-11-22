import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto, UpdateIngredientDto } from './dtos';
import { IngredientDocument } from './schema/ingredient.schema';
import { IngredientRepository } from './repository/ingredient.repository';

@Injectable()
export class IngredientService {
  public ingredientNotFound = 'ingredient not found';
  public ingredientAlreadyExist = 'ingredient already exist';
  public constructor(private ingredientRepo: IngredientRepository) {}

  public async createOne(
    body: CreateIngredientDto,
    region: string,
  ): Promise<object> {
    const ingredient = await this.ingredientRepo.findOne(body.niceName, region);

    if (ingredient) {
      throw new BadRequestException(this.ingredientAlreadyExist);
    }

    const newIngredient = await this.ingredientRepo.createOne(body, region);

    const response = {
      niceName: newIngredient.niceName,
    };

    return response;
  }

  public async updateOne(
    body: UpdateIngredientDto,
    region: string,
    niceName: string,
  ): Promise<object> {
    const updatedIngredient = await this.ingredientRepo.updateOne(
      body,
      niceName,
      region,
    );

    if (!updatedIngredient) {
      throw new NotFoundException(this.ingredientNotFound);
    }
    const response = {
      niceName: updatedIngredient.niceName,
    };

    return response;
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    const ingredient = await this.ingredientRepo.findOne(niceName, region);

    if (!ingredient) throw new NotFoundException(this.ingredientNotFound);

    return ingredient;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const ingredientList = await this.ingredientRepo.findAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.ingredientRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: ingredientList,
    };
  }

  public async deleteOne(region: string, niceName: string): Promise<object> {
    const ingredient = await this.ingredientRepo.deleteOne(niceName, region);

    if (!ingredient) throw new NotFoundException(this.ingredientNotFound);

    return { message: 'Deleted Success' };
  }
}
