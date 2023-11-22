import { CreateIngredientDto, UpdateIngredientDto } from '../dtos';
import { Ingredient, IngredientDocument } from '../schema/ingredient.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class IngredientRepository {
  public constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  public async createOne(
    body: CreateIngredientDto,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.create({ ...body, region });
  }

  public async updateOne(
    body: UpdateIngredientDto,
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.findOneAndUpdate(
      { niceName, region },
      body,
      { new: true },
    );
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.findOne({
      niceName,
      region,
    });
    //.populate('foodGroup');
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<IngredientDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.ingredientModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('foodGroup');
  }

  public async deleteOne(
    niceName: string,
    region: string,
  ): Promise<IngredientDocument> {
    return await this.ingredientModel.findOneAndDelete({ niceName, region });
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.ingredientModel.countDocuments(obj);

    return docCount;
  }
}
