import {
  Recipe,
  RecipeDocument,
} from 'src/domains/recipe/schema/recipe.schema';
import { User, UserDocument } from 'src/domains/user/schema/user.schema';
import { UserLog, UserLogDocument } from '../schema/user-log.schema';
import { CreateUserLogDTO } from '../dtos/createUserlog.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserLogRepository {
  public constructor(
    @InjectModel(UserLog.name) public ulModel: Model<UserLog>,
    @InjectModel(Recipe.name) public recipeModel: Model<Recipe>,
    @InjectModel(User.name) public userModel: Model<User>,
  ) {}

  public async createnewlog(
    incomingLogObj: Partial<UserLogDocument>,
  ): Promise<UserLogDocument> {
    const userlog = await this.ulModel.create(incomingLogObj);

    return userlog;
  }
  public async checkRepeatedRecipeCooked(
    incomingLogObj: Partial<UserLogDocument>,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeModel.findOne({
      region: incomingLogObj.region,
      niceName: incomingLogObj.niceName,
    });

    return recipe;
  }
  public async findquery(query: unknown): Promise<UserLogDocument> {
    const userlog = await this.ulModel.findOne(query);

    return userlog;
  }

  public async findOne(
    region: string,
    body: CreateUserLogDTO,
  ): Promise<UserLogDocument> {
    const existingUserLog = await this.ulModel.findOne({ region, ...body });

    return existingUserLog;
  }

  public async create(
    region: string,
    body: CreateUserLogDTO,
  ): Promise<UserLogDocument> {
    const newUserLog = await this.ulModel.create({ region, body });

    return newUserLog;
  }

  public async fetch(
    region: string,
    niceName: string,
  ): Promise<UserLogDocument> {
    const userLog = await this.ulModel.findOne({ region, niceName });

    return userLog;
  }

  public async fetchAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<UserLogDocument[]> {
    const skipAmount = pageNumber * pageSize;

    const userLogList = await this.ulModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);

    return userLogList;
  }
  // //not clear if user logs are updated or not.
  //   public async updateUserLog(
  //     region: string,
  //     niceName: string,
  //   ): Promise<UserLogDocument> {
  //     return await this.ulModel.updateUserLog(region, niceName);
  //   }

  public async deleteUserLog(
    region: string,
    niceName: string,
  ): Promise<UserLogDocument> {
    const deletedUserLog = await this.ulModel.findOneAndDelete({
      region,
      niceName,
    });

    return deletedUserLog;
  }

  public async findUserandUpdate(
    query: object,
    body: object,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(query, { $set: body });

    return user;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.ulModel.countDocuments(obj);

    return docCount;
  }
}
