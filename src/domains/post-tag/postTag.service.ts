import * as JSZip from 'jszip';
import * as xlsx from 'xlsx';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostTagDTO } from './dto/createDto/createPostTag.dto';
import { json2csv } from 'json-2-csv';
import { ObjectId } from 'mongoose';
import { PostTagDocument } from './schema/postTag.schema';
import { PostTagRepository } from './repository/postTag.repository';
import { UpdatePostTagDTO } from './dto/updateDto/updatePostTag.dto';

@Injectable()
export class PostTagService {
  public constructor(public postTagRepo: PostTagRepository) {}

  public async createPostTag(
    region: string,
    body: CreatePostTagDTO,
  ): Promise<object> {
    const postTagExists = await this.postTagRepo.findOne(region, body);
    if (postTagExists) {
      throw new BadRequestException('PostTag Already exists.');
    }

    const postTag = await this.postTagRepo.createPostTag(region, body);
    const response = {
      _id: postTag._id,
    };

    return response;
  }

  public async fetchPostTag(
    region: string,
    _id: ObjectId,
  ): Promise<PostTagDocument> {
    const postTag = await this.postTagRepo.fetchPostTag(region, _id);
    if (!postTag) {
      throw new NotFoundException('PostTag not found.');
    }

    return postTag;
  }

  public async updatePostTag(
    region: string,
    _id: ObjectId,
    body: UpdatePostTagDTO,
  ): Promise<object> {
    let updatedPostTag: PostTagDocument;

    try {
      updatedPostTag = await this.postTagRepo.updatePostTag(region, _id, body);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }

    if (!updatedPostTag) {
      throw new NotFoundException('PostTag Not found.');
    }
    const response = {
      _id: updatedPostTag._id,
    };

    return response;
  }

  public async deletePostTag(region: string, _id: ObjectId): Promise<object> {
    const deletedPostTag = await this.postTagRepo.deletePostTag(region, _id);
    if (!deletedPostTag) {
      throw new NotFoundException('PostTag Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchPostTags(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const postTagsList = await this.postTagRepo.fetchPostTags(
      region,
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.postTagRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: postTagsList,
    };
  }

  public async exportFile(
    region: string,
    type: string,
  ): Promise<{ data: Buffer; type: string }> {
    type = type.toLocaleLowerCase();
    const postTags = await this.postTagRepo.fetchPostTags(region);

    if (postTags.length <= 0) {
      throw new NotFoundException('Post-tags not found');
    }

    if (type == 'csv') {
      const csv = await json2csv(postTags);

      const data = Buffer.from(csv);

      return { data, type };
    } else if (type === 'xlsx') {
      const ws = xlsx.utils.json_to_sheet(postTags);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      const xlsxData = xlsx.write(wb, {
        bookType: 'xlsx',
        type: 'buffer',
      }) as Buffer;

      return { data: xlsxData, type };
    } else if (type === 'jsonzip') {
      const jsonFiles: Buffer[] = [];
      const zip = new JSZip();
      const zipFolder = zip.folder('json_data');
      for (const entry of postTags) {
        const jsonData = JSON.stringify(entry, null, 2);
        jsonFiles.push(Buffer.from(jsonData));
      }

      for (let i = 0; i < jsonFiles.length; i++) {
        zipFolder.file(`data_${i}.json`, jsonFiles[i]);
      }

      const data = await zip.generateAsync({ type: 'nodebuffer' });

      return { data, type: 'zip' };
    } else if (type === 'json') {
      const data = Buffer.from(JSON.stringify(postTags));

      return { data, type };
    }
    throw new BadRequestException('invalid data type');
  }
}
