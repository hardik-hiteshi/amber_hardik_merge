import { Model, ObjectId } from 'mongoose';
import { PostTag, PostTagDocument } from '../schema/postTag.schema';
import { CreatePostTagDTO } from '../dto/createDto/createPostTag.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePostTagDTO } from '../dto/updateDto/updatePostTag.dto';

export interface PostTagQueryInterface {
  region: string | undefined;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
@Injectable()
export class PostTagRepository {
  public constructor(
    @InjectModel(PostTag.name) public postTagModel: Model<PostTagDocument>,
  ) {}

  public async findOne(
    region: string,
    body: CreatePostTagDTO,
  ): Promise<PostTagDocument> {
    const existingPostTag = await this.postTagModel.findOne({
      region,
      ...body,
    });

    return existingPostTag;
  }

  public async createPostTag(
    region: string,
    body: CreatePostTagDTO,
  ): Promise<PostTagDocument> {
    const postTag = await this.postTagModel.create({
      ...body,
      region,
    });

    return postTag;
  }

  public async fetchPostTag(
    region: string,
    _id: ObjectId,
  ): Promise<PostTagDocument> {
    const postTag = await this.postTagModel.findOne({
      region,
      _id,
    });

    return postTag;
  }

  public async updatePostTag(
    region: string,
    _id: ObjectId,
    body: UpdatePostTagDTO,
  ): Promise<PostTagDocument> {
    const updatedPostTag = await this.postTagModel.findOneAndUpdate(
      { region, _id },
      body,
      { new: true },
    );

    return updatedPostTag;
  }

  public async deletePostTag(
    region: string,
    _id: ObjectId,
  ): Promise<PostTagDocument> {
    const deletedPostTag = await this.postTagModel.findOneAndDelete({
      region,
      _id,
    });

    return deletedPostTag;
  }

  public async fetchPostTags(
    region: string,
    pageNumber?: number,
    pageSize?: number,
    search?: string,
  ): Promise<PostTagDocument[]> {
    const query: PostTagQueryInterface = {
      region,
    };
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { text: { $regex: search.toString(), $options: 'i' } },
        { description: { $regex: search.toString(), $options: 'i' } },
        /* eslint-disable @typescript-eslint/naming-convention */
        { 'cms.url.slug': { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const postTags = await this.postTagModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return postTags;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.postTagModel.countDocuments(obj);

    return docCount;
  }
}
