import { User, UserDocument } from '../schema/user.schema';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

export class UserRepository {
  public constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async findOne(
    query: RecursivePartial<User> | object,
    profileFilter?: Array<string> | object,
  ): Promise<UserDocument> {
    return await this.userModel.findOne(query, profileFilter);
  }

  public async create(
    body: UserCreateDto,
    region: string,
  ): Promise<UserDocument> {
    return await this.userModel.create({ ...body, region });
  }

  public async findAllWithProjection(
    query: RecursivePartial<User> | object,
    projection: Array<string> | object,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<UserDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.userModel
      .find(query, projection)
      .skip(skipAmount)
      .limit(pageSize)
      .lean();
  }

  public async findOneAndUpdate(
    query: RecursivePartial<User>,
    body: UserUpdateDto | UserDocument,
  ): Promise<Partial<UserDocument>> {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('request body can not be empty');

    return await this.userModel
      .findOneAndUpdate(query, body, {
        new: true,
      })
      .select('-password');
  }

  public async deleteOne(query: RecursivePartial<User>): Promise<UserDocument> {
    return await this.userModel.findOneAndDelete(query);
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.userModel.countDocuments(obj);

    return docCount;
  }

  public async findOneUser(
    query: RecursivePartial<User> | object,
    projection: object,
  ): Promise<UserDocument> {
    return await this.userModel.findOne(query, projection);
  }

  public async findAll(
    query: RecursivePartial<User> | object,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<UserDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.userModel
      .find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .lean();
  }
}
