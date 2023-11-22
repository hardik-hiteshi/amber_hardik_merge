import { Model, ObjectId } from 'mongoose';
import {
  PostCategory,
  PostCategoryDocument,
} from '../schema/post-category.schema';
import { CreatePostCategoryDTO } from '../dto/createDto/post-category.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostCategoryQueryInterface } from './postCategory.query.interface';
import { UpdatePostCategoryDTO } from '../dto/updateDto/post-category.update.dto';

@Injectable()
export class PostCategoryRepository {
  public constructor(
    @InjectModel(PostCategory.name)
    public postCategoryModel: Model<PostCategoryDocument>,
  ) {}

  public async findOne(
    region: string,
    body: CreatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const existingPostCategory = await this.postCategoryModel.findOne({
      region,
      ...body,
    });

    return existingPostCategory;
  }

  public async createPostCategory(
    region: string,
    body: CreatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const postCategory = await this.postCategoryModel.create({
      ...body,
      region,
    });

    return postCategory;
  }

  public async fetchPostCategory(
    region: string,
    _id: ObjectId,
  ): Promise<PostCategoryDocument> {
    const postCategory = await this.postCategoryModel.findOne({
      region,
      _id,
    });

    return postCategory;
  }

  public async updatePostCategory(
    region: string,
    _id: ObjectId,
    body: UpdatePostCategoryDTO,
  ): Promise<PostCategoryDocument> {
    const updatedPostCategory = await this.postCategoryModel.findOneAndUpdate(
      { region, _id },
      body,
      { new: true },
    );

    return updatedPostCategory;
  }

  public async deletePostCategory(
    region: string,
    _id: ObjectId,
  ): Promise<PostCategoryDocument> {
    const deletedPostCategory = await this.postCategoryModel.findOneAndDelete(
      { region, _id },
      { new: true },
    );

    return deletedPostCategory;
  }

  public async fetchPostCategories(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<PostCategoryDocument[]> {
    const query: PostCategoryQueryInterface = {
      region,
    };
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { name: { $regex: search.toString(), $options: 'i' } },
        { niceName: { $regex: search.toString(), $options: 'i' } },
        { description: { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
        //will work on this later.
        // {
        //   'translations.from.region': {
        //     $regex: search.toString(),
        //     $options: 'i',
        //   },
        // },
        // {
        //   'translations.from.niceName': {
        //     $regex: search.toString(),
        //     $options: 'i',
        //   },
        // },
      ];
    }

    const postCategorys = await this.postCategoryModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return postCategorys;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.postCategoryModel.countDocuments(obj);

    return docCount;
  }
}
