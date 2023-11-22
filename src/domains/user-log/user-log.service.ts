/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserLogDTO } from './dtos/createUserlog.dto';
import moment from 'moment';
import { RecipeRepository } from '../recipe/repository/recipe.repository';
import { UserDocument } from '../user/schema/user.schema';
import { UserLogDocument } from './schema/user-log.schema';
import { UserLogRepository } from './repository/UserLog.repository';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class UserLogService {
  public exists = 'UserLog Already exists';
  public notfound = 'UserLog not found';
  public constructor(
    public ulRepo: UserLogRepository,
    public userRepo: UserRepository,
    public recipeRepo: RecipeRepository,
  ) {}

  public async createIncomingUserLog(
    user: UserDocument,
    agent: string,
    region: string,
    ip?: string,
    redirect?: string,
    forwarded?: string,
    date?: Date,
    rate?: number,
    commentId?: string,
    legalType?: string,
    loginLog?: object,
  ): Promise<object> {
    const incomingLogObj = {};
    incomingLogObj['user'] = 'anonymous';
    if (user) {
      incomingLogObj['user'] = user._id;
    }
    if (ip) {
      incomingLogObj['ip'] = ip;
    }
    if (redirect) {
      incomingLogObj['ip'] = redirect;
    }
    if (forwarded) {
      incomingLogObj['ip'] = forwarded;
    }
    if (ip) {
      incomingLogObj['ip'] = ip;
    }
    if (user.role == 'machine') {
      incomingLogObj['machine'] = user.role;
    }
    if (!date) {
      incomingLogObj['date'] = new Date();
    }
    if (rate) {
      incomingLogObj['rate'] = rate;
    }
    if (commentId) {
      incomingLogObj['commentId'] = commentId;
    }
    if (legalType) {
      incomingLogObj['legalType'] = legalType;
    }
    if (loginLog['type']) {
      incomingLogObj['type'] = loginLog['type'];
    }
    incomingLogObj['date'] = new Date(loginLog['date']);
    incomingLogObj['region'] = region.toUpperCase();
    incomingLogObj['agent'] = agent;
    incomingLogObj['machine'] = undefined;
    if (incomingLogObj[loginLog['type']] == 'recipe/cooked') {
      let flag = false;
      const recipe = await this.ulRepo.checkRepeatedRecipeCooked(
        incomingLogObj,
      );
      let seconds = 0;
      if (recipe) {
        seconds = recipe.groups
          ? recipe.groups.reduce(
            (acum, group) =>
              group.steps
                ? acum +
                    group.steps.reduce(
                      (stepAcum, step) => stepAcum + step.cookTime,
                      0,
                    )
                : acum,
            0,
          )
          : 0;
        const minimumTime = seconds
          ? parseInt(String(seconds + seconds / 2))
          : 5400;
        const mom = moment(incomingLogObj['date']).subtract(
          minimumTime,
          'seconds',
        );
        incomingLogObj['date'] = { $gte: mom.toDate() };
        const query = { $gte: mom.toDate() };
        const log = await this.ulRepo.findquery(query);
        flag = log ? true : false;
        if (!flag) {
          const newUserLog = await this.ulRepo.createnewlog(incomingLogObj);

          return newUserLog;
        }
      }
    } else {
      const newUserLog = await this.ulRepo.createnewlog(incomingLogObj);

      return newUserLog;
    }

    return incomingLogObj;
  }

  public async createUserLog(
    region: string,
    body: CreateUserLogDTO,
  ): Promise<object> {
    const userLog = await this.ulRepo.findOne(region, body);
    if (!userLog) {
      const userLog = await this.ulRepo.create(region, body);
      const response = {
        _id: userLog._id,
      };

      return response;
    }
    throw new BadRequestException(this.exists);
  }

  public async fetchUserLog(
    region: string,
    niceName: string,
  ): Promise<UserLogDocument> {
    const userLog = await this.ulRepo.fetch(region, niceName);
    if (!userLog) {
      throw new BadRequestException(this.notfound);
    }

    return userLog;
  }

  public async fetchAllUserLog(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const userLogList = await this.ulRepo.fetchAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.ulRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: userLogList,
    };
  }

  // public async updateUserLog(
  //   region: string,
  //   niceName: string,
  // ): Promise<object> {
  //   const updatedData = await this.ulRepo.updateUserLog(region, niceName);
  //   if (!updatedData) {
  //     throw new NotFoundException(this.notfound);
  //   }

  //   const response = {
  //     _id: updatedData._id,
  //   };

  //   return response;
  // }
  public async updateUserLog(
    query: object,
    incomingUserLog: object,
  ): Promise<void> {
    await this.ulRepo.updateOne(query, incomingUserLog);
  }
  public async deleteUserLog(
    region: string,
    niceName: string,
  ): Promise<object> {
    const deletedUserLog = await this.ulRepo.deleteUserLog(region, niceName);
    if (!deletedUserLog) {
      throw new NotFoundException(this.notfound);
    }

    return { message: 'Deleted Success' };
  }

  public async incrementDoneCount(
    incomingLogObj: Partial<UserLogDocument>,
  ): Promise<void> {
    const region = incomingLogObj.region;
    const niceName = incomingLogObj.user;
    const recipeNiceName = incomingLogObj.niceName;

    let query = {
      region,
      niceName,
      done: { $elemMatch: { niceName: recipeNiceName } },
    };
    const user = await this.userRepo.findOne(query);
    const recipe = await this.recipeRepo.fetchOne(region, recipeNiceName);
    if (recipe) {
      if (user) {
        const d = user.done.find(
          (element) => element.niceName == recipeNiceName,
        );
        const cookedCount = d.cooked + 1;
        query = {
          region,
          niceName,
          done: { $elemMatch: { niceName: recipeNiceName } },
        };
        const body = {
          'done.$.lastTime': Date.now(),
          'done.$.cooked': cookedCount,
        };
        await this.ulRepo.findUserandUpdate(query, body);
      } else {
        const query = { region, niceName };
        const body = {
          'done.$.niceName': recipeNiceName,
          'done.$.firstTime': Date.now(),
          'done.$.lastTime': Date.now(),
          'done.$.cooked': 1,
        };
        await this.ulRepo.findUserandUpdate(query, body);
      }
    } else {
      throw new NotFoundException('Recipe not found');
    }
  }
}
