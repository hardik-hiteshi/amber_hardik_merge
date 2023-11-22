import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManyNewsLetterDto, CreateNewsLetterDto } from './dtos';
import { INewsLetter } from './interface/newsLetter.interface';
import { NewsLetterDto } from './dtos/createManyNewsLetter/subDto/createNewsLetter.dto';
import { NewsLetterMailDocument } from './schema/news.letter-mail.schema';
import { NewsLetterMailRepository } from './repository/news-letter-mail.repository';
import { ObjectId } from 'mongoose';
@Injectable()
export class NewsLetterMailService {
  public constructor(private newsLetterRepo: NewsLetterMailRepository) {}

  public async createOne(
    body: CreateNewsLetterDto,
    region: string,
  ): Promise<object> {
    const newsLetter = await this.newsLetterRepo.findOne({
      emailAddress: body.emailAddress,
    });

    if (newsLetter) throw new BadRequestException('news-letter already exist');

    const data: INewsLetter = {
      ...body,
      region,
    };

    const newNewsLetter = await this.newsLetterRepo.createOne(data);

    const response = {
      _id: newNewsLetter._id,
    };

    return response;
  }

  public async findOne(
    _id: ObjectId,
    region: string,
  ): Promise<NewsLetterMailDocument> {
    const newsLetter = await this.newsLetterRepo.findOne({ _id, region });
    if (!newsLetter) throw new NotFoundException('news-letter not found');

    return newsLetter;
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<object> {
    const newsLetterList = await this.newsLetterRepo.findAll(
      region,
      pageNumber,
      pageSize,
    );

    const count = await this.newsLetterRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: newsLetterList,
    };
  }

  public async createMany(
    body: CreateManyNewsLetterDto,
    region: string,
  ): Promise<NewsLetterMailDocument[]> {
    let existingItemSerial: string[];
    let itemsToInsert: NewsLetterDto[];
    const data = body.data.map((i) => i.emailAddress);
    const existingItems = await this.newsLetterRepo.findAllByQuery({
      emailAddress: { $in: data },
    });

    if (existingItems.length > 0) {
      existingItemSerial = existingItems.map(
        (item: CreateNewsLetterDto) => item.emailAddress,
      );

      itemsToInsert = body.data.filter(
        (item) => !existingItemSerial.includes(item.emailAddress),
      );
    } else {
      itemsToInsert = body.data;
    }

    if (itemsToInsert.length === 0) {
      throw new BadRequestException('All items already exist');
    }
    const itemsWithUniqueId: INewsLetter[] = itemsToInsert.map((i) => ({
      ...i,
      region,
    }));

    return await this.newsLetterRepo.createMany(itemsWithUniqueId);
  }
}
