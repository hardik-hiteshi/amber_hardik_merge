import { Model, ObjectId } from 'mongoose';
import { PostPage, PostPageDocument } from '../schema/post-page.schema';
import { CreatePostPageDTO } from '../dto/createDto/post-page.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostPageQueryInterface } from './post-page.query.interface';
import { UpdatePostPageDTO } from '../dto/updateDto/post-page.update.dto';

@Injectable()
export class PostPageRepository {
  public constructor(
    @InjectModel(PostPage.name)
    public postPageModel: Model<PostPageDocument>,
  ) {}

  public async findOne(query: object): Promise<PostPageDocument> {
    const existingPostPage = await this.postPageModel.findOne(query);

    return existingPostPage;
  }

  public async createPostPage(
    region: string,
    body: CreatePostPageDTO,
  ): Promise<PostPageDocument> {
    const postPage = await this.postPageModel.create({
      ...body,
      region,
    });

    return postPage;
  }

  public async fetchPostPage(
    region: string,
    _id: ObjectId,
  ): Promise<PostPageDocument> {
    const postPage = await this.postPageModel.findOne({
      region,
      _id,
    });

    return postPage;
  }

  public async updatePostPage(
    region: string,
    _id: ObjectId,
    body: UpdatePostPageDTO,
  ): Promise<PostPageDocument> {
    const updatedPostPage = await this.postPageModel.findOneAndUpdate(
      { region, _id },
      body,
      { new: true },
    );

    return updatedPostPage;
  }

  public async deletePostPage(
    region: string,
    _id: ObjectId,
  ): Promise<PostPageDocument> {
    const deletedPostPage = await this.postPageModel.findOneAndDelete({
      region,
      _id,
    });

    return deletedPostPage;
  }

  public async fetchPostPages(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<PostPageDocument[]> {
    const query: PostPageQueryInterface = {
      region,
    };
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { title: { $regex: search.toString(), $options: 'i' } },
        { region: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const postPages = await this.postPageModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return postPages;
  }

  public async findAll(region: string): Promise<PostPageDocument[]> {
    const query: PostPageQueryInterface = {
      region,
    };

    const postPages = await this.postPageModel.find({
      $and: [query],
    });

    return postPages;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.postPageModel.countDocuments(obj);

    return docCount;
  }
}
