import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostCategoryDTO } from './dto/createDto/post-category.create.dto';
import { ObjectId } from 'mongoose';
import { PostCategoryDocument } from './schema/post-category.schema';
import { PostCategoryRepository } from './repository//post-category.repository';
import { UpdatePostCategoryDTO } from './dto/updateDto/post-category.update.dto';

@Injectable()
export class PostCategoryService {
  public constructor(public postCategoryRepo: PostCategoryRepository) {}

  public async createPostCategory(
    region: string,
    body: CreatePostCategoryDTO,
  ): Promise<object> {
    const postCategoryExists = await this.postCategoryRepo.findOne(
      region,
      body,
    );
    if (postCategoryExists) {
      throw new BadRequestException('PostCategory Already exists.');
    }

    const postCategory = await this.postCategoryRepo.createPostCategory(
      region,
      body,
    );
    const response = {
      _id: postCategory._id,
    };

    return response;
  }

  public async fetchPostCategory(
    region: string,
    _id: ObjectId,
  ): Promise<PostCategoryDocument> {
    const postCategory = await this.postCategoryRepo.fetchPostCategory(
      region,
      _id,
    );
    if (!postCategory) {
      throw new NotFoundException('PostCategory not found.');
    }

    return postCategory;
  }

  public async updatePostCategory(
    region: string,
    _id: ObjectId,
    body: UpdatePostCategoryDTO,
  ): Promise<object> {
    const updatedPostCategory = await this.postCategoryRepo.updatePostCategory(
      region,
      _id,
      body,
    );
    if (!updatedPostCategory) {
      throw new NotFoundException('PostCategory Not found.');
    }

    const response = {
      _id: updatedPostCategory._id,
    };

    return response;
  }

  public async deletePostCategory(
    region: string,
    _id: ObjectId,
  ): Promise<object> {
    const deletedPostCategory = await this.postCategoryRepo.deletePostCategory(
      region,
      _id,
    );
    if (!deletedPostCategory) {
      throw new NotFoundException('PostCategory Not found.');
    }

    return { message: 'Delete Sucess' };
  }

  public async fetchPostCategories(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const postCategorysList = await this.postCategoryRepo.fetchPostCategories(
      region,
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.postCategoryRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: postCategorysList,
    };
  }
}
