import { CreateNewsDto, UpdateNewsDto } from '../dtos';
import { News, NewsDocument } from '../schema/news.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/domains/user/schema/user.schema';

@Injectable()
export class NewsRepository {
  public constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  public async createOne(
    body: CreateNewsDto,
    region: string,
  ): Promise<NewsDocument> {
    const niceNameTime = new Date().getTime();

    return await this.newsModel.create({
      ...body,
      region,
      niceName: niceNameTime,
    });
  }

  public async updateOne(
    body: UpdateNewsDto,
    region: string,
    niceName: string,
  ): Promise<NewsDocument> {
    return await this.newsModel.findOneAndUpdate({ region, niceName }, body, {
      new: true,
    });
  }

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<NewsDocument> {
    return await this.newsModel.findOne({ niceName, region });
    //.populate('recipes');
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<NewsDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.newsModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('recipes');
  }

  public async deleteOne(
    region: string,
    niceName: string,
  ): Promise<NewsDocument> {
    return await this.newsModel.findOneAndDelete({ niceName, region });
  }

  public async findNewsByDateRange(
    region: string,
    date: Date,
    user: UserDocument,
    profile: string,
  ): Promise<NewsDocument[]> {
    return await this.newsModel.find(
      {
        region,
        enabled: true,
        scheduleStart: {
          $lte: date,
          $gte: user.profile.lastViewNews || new Date('2022-09-15'),
        },
        scheduleEnd: { $gte: date },
        ['media.' + profile]: true,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { _id: 0, __v: 0 },
      { sort: { date: -1 } },
    );
  }

  public async findLastNews(
    region: string,
    profile: string,
    last: number,
  ): Promise<NewsDocument> {
    return await this.newsModel.findOne(
      { region, ['media.' + profile]: true },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { _id: 0, __v: 0 },
      { limit: last, sort: { date: -1 } },
    );
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.newsModel.countDocuments(obj);

    return docCount;
  }
}
