import { CmsUser, CmsUserDocument } from '../schema/cmsUser.schema';
import { CmsUserCreateDto, CmsUserUpdateDto } from '../dto';
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

export class CmsUserRepository {
  public constructor(
    @InjectModel(CmsUser.name) private cmsUserModel: Model<CmsUser>,
  ) {}

  public async findOne(
    query: RecursivePartial<CmsUser> | object,
  ): Promise<CmsUserDocument> {
    return await this.cmsUserModel.findOne(query);
  }

  public async create(
    body: CmsUserCreateDto,
    region: string,
  ): Promise<CmsUserDocument> {
    return await this.cmsUserModel.create({ ...body, region });
  }

  public async findAll(
    query: RecursivePartial<CmsUser> | object,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<CmsUserDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.cmsUserModel
      .find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .lean();
  }

  public async findOneAndUpdate(
    query: RecursivePartial<CmsUser>,
    body: CmsUserUpdateDto | CmsUserDocument,
  ): Promise<Partial<CmsUserDocument>> {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('request body can not be empty');

    return await this.cmsUserModel
      .findOneAndUpdate(query, body, {
        new: true,
      })
      .select('-password');
  }

  public async deleteOne(
    query: RecursivePartial<CmsUser>,
  ): Promise<CmsUserDocument> {
    return await this.cmsUserModel.findOneAndDelete(query);
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.cmsUserModel.countDocuments(obj);

    return docCount;
  }
}
