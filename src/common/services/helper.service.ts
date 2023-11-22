/* eslint-disable @typescript-eslint/naming-convention */
import { HydratedDocument } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/domains/user/schema/user.schema';
import { UserRepository } from 'src/domains/user/repository/user.repository';

@Injectable()
export class HelperService {
  public constructor(private userRepo: UserRepository) {}

  public updateNestedFields<T>(
    obj: HydratedDocument<T>,
    updateData: object,
  ): void {
    for (const key in updateData) {
      if (obj[key] && typeof obj[key] === 'object') {
        this.updateNestedFields(obj[key], updateData[key]);
      } else {
        obj[key] = updateData[key];
      }
    }
  }

  public isEmpty(obj): boolean {
    if (obj == null || obj === undefined) return true;

    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  public async getRecipePipelineQuery(
    region: string,
    user: UserDocument | null,
    categories: string[],
    compatibility: string,
  ): Promise<object[]> {
    const aggregateQuery = [
      {
        $match: {
          'status.idParent': '',
          $or: [{ 'grants.search': 'public' }],
        },
      },
      {
        $project: {
          catLength: { $size: '$categories' },
          title: 1,
          niceName: 1,
          'user.niceName': 1,
          'status.verified': 1,
          'categories.niceName': 1,
        },
      },
      {
        $unwind: '$categories',
      },
      {
        $project: {
          title: 1,
          niceName: 1,
          categoryNiceName: '$categories.niceName',
          userNiceName: '$user.niceName',
          verified: '$status.verified',
          catLength: 1,
        },
      },
      {
        $group: {
          _id: '$categoryNiceName',
          count: { $sum: 1 },
          repeated: { $sum: { $divide: [1, '$catLength'] } },
        },
      },
      {
        $project: {
          repeated: 1,
          count: 1,
          favoritesCount: 1,
          favoritesRepeated: 1,
          mineCount: 1,
          mineRepeated: 1,
          checkedCount: 1,
          checkedRepeated: 1,
          toDoCount: 1,
          toDoRepeated: 1,
          doneCount: 1,
          doneRepeated: 1,
        },
      },
    ];

    if (!this.isEmpty(region)) {
      aggregateQuery[0]['$match']['region'] = region;
    }

    if (!this.isEmpty(categories)) {
      aggregateQuery[0]['$match']['categoryNiceName'] = {
        $in: categories,
      };
    }

    if (!this.isEmpty(compatibility)) {
      aggregateQuery[0]['$match']['compatibility.current'] = compatibility;
    } else {
      aggregateQuery[0]['$match']['grants.search'] = 'main';
    }

    aggregateQuery[4]['$group']['checkedCount'] = {
      $sum: {
        $cond: [{ $eq: ['$verified', true] }, 1, 0],
      },
    };

    aggregateQuery[4]['$group']['checkedRepeated'] = {
      $sum: {
        $cond: [
          { $eq: ['$verified', true] },
          { $divide: [1, '$catLength'] },
          0,
        ],
      },
    };

    if (user && user.niceName) {
      aggregateQuery[0]['$match']['$or'].push({
        'grants.search': 'user/' + user.niceName,
      });

      aggregateQuery[4]['$group']['mineCount'] = {
        $sum: {
          $cond: [{ $eq: ['$userNiceName', user.niceName] }, 1, 0],
        },
      };

      aggregateQuery[4]['$group']['mineRepeated'] = {
        $sum: {
          $cond: [
            { $eq: ['$userNiceName', user.niceName] },
            { $divide: [1, '$catLength'] },
            0,
          ],
        },
      };

      const userQuery = {
        niceName: user.niceName,
        region: aggregateQuery[0]['$match']['region'],
      };

      const userRes = await this.userRepo.findOneUser(userQuery, {
        favorites: 1,
        todo: 1,
        done: 1,
      });

      if (userRes) {
        const counts = [
          { key: 'favorites', array: userRes.favorites || null },
          { key: 'toDo', array: userRes.todo || null },
          {
            key: 'done',
            array: userRes.done ? userRes.done.map((ur) => ur.niceName) : null,
          },
        ].reduce((acum, userCounts) => {
          if (userCounts.array) {
            acum[userCounts.key + 'Count'] = {
              $sum: {
                $cond: [
                  {
                    $anyElementTrue: {
                      $map: {
                        input: userCounts.array,
                        as: 'recipeNiceName',
                        in: { $eq: ['$$recipeNiceName', '$niceName'] },
                      },
                    },
                  },
                  1,
                  0,
                ],
              },
            };

            acum[userCounts.key + 'Repeated'] = {
              $sum: {
                $cond: [
                  {
                    $anyElementTrue: {
                      $map: {
                        input: userCounts.array,
                        as: 'recipeNiceName',
                        in: { $eq: ['$$recipeNiceName', '$niceName'] },
                      },
                    },
                  },
                  { $divide: [1, '$catLength'] },
                  0,
                ],
              },
            };
          }

          return acum;
        }, {});

        Object.keys(counts).forEach((key) => {
          aggregateQuery[4]['$group'][key] = counts[key];
        });
      }

      return await Promise.resolve(aggregateQuery);
    }

    return Promise.resolve(aggregateQuery);
  }
}
