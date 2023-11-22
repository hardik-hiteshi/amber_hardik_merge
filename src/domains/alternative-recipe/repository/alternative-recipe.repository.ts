/* eslint-disable @typescript-eslint/naming-convention */
import {
  AlternativeRecipe,
  AlternativeRecipeDocument,
} from '../schema/alternativeRecipe.schema';
import { CreateAlternativeRecipeDTO } from '../dto/create alternative-recipe/createalternative-recipe.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryInterface } from './interface/alternative-recipe.query.interface';
import { UpdateAlternativeRecipeDTO } from '../dto/update alternative-recipe/updatealternative-recipe.dto';

@Injectable()
export class AlternativeRecipeRepository {
  public constructor(
    @InjectModel(AlternativeRecipe.name)
    public alternativeRecipeModel: Model<AlternativeRecipe>,
  ) {}

  public async findOne(
    region: string,
    body: CreateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    const alternativeRecipe = await this.alternativeRecipeModel.findOne({
      niceName: body.niceName,
      region,
    });

    return alternativeRecipe;
  }

  public async create(
    region: string,
    body: CreateAlternativeRecipeDTO,
  ): Promise<AlternativeRecipeDocument> {
    const alternativerecipe = await this.alternativeRecipeModel.create({
      ...body,
      region,
    });

    return alternativerecipe;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
    search: string,
  ): Promise<Array<AlternativeRecipeDocument>> {
    const query: QueryInterface = {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { niceName: { $regex: search, $options: 'i' } },
        { 'categories.name': { $in: [search] } },
        { 'categories.niceName': { $in: [search] } },
        // { rate: { $regex: search, $options: "i" } },
        { course: { $in: [search] } },
        { 'user.displayName': { $regex: search, $options: 'i' } },
        { 'user.niceName': { $regex: search, $options: 'i' } },
        { 'user.rank': { $regex: search, $options: 'i' } },
        { 'user.role': { $regex: search, $options: 'i' } },
        { 'user.web': { $regex: search, $options: 'i' } },
        { 'user.webName': { $regex: search, $options: 'i' } },
        { 'user.instagram': { $regex: search, $options: 'i' } },
        { 'user.twitter': { $regex: search, $options: 'i' } },
        //{ "info.creationDate": { $regex: search, $options: "i" } },
        //creationDate { "info.modificationDate": { $regex: search, $options: "i" } },
        { 'info.creationSource': { $regex: search, $options: 'i' } },
        { 'info.modificationSource': { $regex: search, $options: 'i' } },
        //{ totalTime: { $regex: search, $options: "i" } },
        // { cookTime: { $regex: search, $options: "i" } },
        //{ difficulty: { $regex: search, $options: "i" } },
        //{ price: { $regex: search, $options: "i" } },
        { 'status.exportable': { $regex: search, $options: 'i' } },
        { 'status.verified': { $regex: search, $options: 'i' } },
        { 'status.idParent': { $regex: search, $options: 'i' } },
        { 'status.nutritional': { $regex: search, $options: 'i' } },
        { foodGroups: { $in: [search] } },
        { videos: { $in: [search] } },
        { tags: { $in: [search] } },
        // { "social.favorite": { $regex: search, $options: "i" } },
        // { "social.facebook": { $regex: search, $options: "i" } },
        // { "social.comments": { $regex: search, $options: "i" } },
        // { "social.ratings": { $regex: search, $options: "i" } },
        { 'source.url': { $regex: search, $options: 'i' } },
        { 'source.name': { $regex: search, $options: 'i' } },
        { 'grants.view': { $regex: search, $options: 'i' } },
        { 'grants.search': { $regex: search, $options: 'i' } },
        { rations: { $in: [search] } },
        { advice: { $regex: search, $options: 'i' } },
        { 'seo.title': { $regex: search, $options: 'i' } },
        { 'seo.description': { $regex: search, $options: 'i' } },
        { 'seo.canonical': { $regex: search, $options: 'i' } },
        //{ "seo.autopublishDate": { $regex: search, $options: "i" } },
        // { "seo.index": { $regex: search, $options: "i" } },
        // { "seo.follow": { $regex: search, $options: "i" } },
        { 'seo.extra.title': { $regex: search, $options: 'i' } },
        { 'seo.extra.text': { $regex: search, $options: 'i' } },
        { 'seo.keywords': { $regex: search, $options: 'i' } },
        //{ nutritionalForRation: { $regex: search, $options: "i" } },
      ];
    }
    const alternativeRecipesList = await this.alternativeRecipeModel
      .find({
        $and: [query, { region }],
      })
      .skip(skipAmount)
      .limit(pageSize);
    if (alternativeRecipesList.length > 0) {
      return alternativeRecipesList;
    }

    return [];
  }

  public async fetchOne(
    region: string,
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    const altrecipe = await this.alternativeRecipeModel.findOne({
      niceName,
      region,
    });

    return altrecipe;
  }

  public async updateone(
    region: string,
    body: UpdateAlternativeRecipeDTO,
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    const updatedaltRecipe = await this.alternativeRecipeModel.findOneAndUpdate(
      { region, niceName },
      { $set: body },
      { new: true },
    );

    return updatedaltRecipe;
  }

  public async deleteRecipe(
    region: string,
    niceName: string,
  ): Promise<AlternativeRecipeDocument> {
    const deletedaltRecipe = await this.alternativeRecipeModel.findOneAndDelete(
      { $and: [{ niceName }, { region }] },
    );

    return deletedaltRecipe;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.alternativeRecipeModel.countDocuments(obj);

    return docCount;
  }
}
