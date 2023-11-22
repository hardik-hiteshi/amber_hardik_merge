/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdvertisementDocument } from './schemas/advertisement.schema';
import { AdvertisementRepository } from './repository/advertisement.repository';
import { CategoryRepository } from '../category/repository/category.repository';
import { CreateAdvertisementDTO } from './dto/createadvertisement.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateAdvertisementDTO } from './dto/updateadvertisement.dto';

@Injectable()
export class AdvertisementService {
  public constructor(
    public adRepo: AdvertisementRepository,
    public categoryRepo: CategoryRepository,
  ) {}

  public async createAdvertisement(
    region: string,
    body: CreateAdvertisementDTO,
  ): Promise<object> {
    body.niceName = Date.now().toString();
    body.date = new Date();

    const existingAdvertisement = await this.adRepo.findOne(
      region,
      body.niceName,
    );
    if (existingAdvertisement) {
      throw new BadRequestException('Advertisement already exists.');
    }
    const newAdvertisement = await this.adRepo.createAdvertisement(
      region,
      body,
    );

    const response = {
      niceName: newAdvertisement.niceName,
    };

    return response;
  }

  public async fetchAdvertisement(
    region: string,
    niceName: string,
  ): Promise<AdvertisementDocument> {
    const advertisement = await this.adRepo.fetchAdvertisement(
      region,
      niceName,
    );
    if (advertisement) {
      return advertisement;
    }
    throw new NotFoundException('Advertisement does not exist.');
  }

  public async updateAdvertisement(
    region: string,
    niceName: string,
    body: UpdateAdvertisementDTO,
  ): Promise<object> {
    const existingAdvertisement = await this.adRepo.findOne(region, niceName);
    if (!existingAdvertisement) {
      throw new BadRequestException('Advertisement does not exists.');
    }

    body.date = body.date === undefined ? new Date() : body.date;

    if (
      body.category != undefined &&
      body.category != existingAdvertisement.category
    ) {
      const categoryExists = await this.categoryRepo.getCategoryById(
        region,
        body.category,
      );

      if (!categoryExists) {
        throw new NotFoundException(`Category not found.`);
      }
      const updatedAdvertisement = await this.adRepo.updateAdvertisement(
        region,
        niceName,
        body,
      );

      if (!updatedAdvertisement) {
        throw new NotFoundException('Advertisement to update not found.');
      }
      const response = {
        niceName: updatedAdvertisement.niceName,
      };

      return response;
    }
  }

  public async deleteAdvertisement(
    region: string,
    niceName: string,
  ): Promise<object> {
    const deletedAdvertisement = await this.adRepo.deleteAdvertisement(
      region,
      niceName,
    );
    if (!deletedAdvertisement) {
      throw new NotFoundException('No Advertisement found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAdvertisements(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const advertisementList = await this.adRepo.fetchAdvertisements(
      region,
      pageNumber,
      pageSize,
      search,
    );
    const count = await this.adRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: advertisementList,
    };

    // throw new NotFoundException('No Advertisements found.');
  }

  public async fetchRandomAdvertisement(
    region: string,
    category: string,
  ): Promise<AdvertisementDocument> {
    const niceName = category;
    const cat = await this.categoryRepo.fetchCategory(region, niceName);
    const where = {};
    where['category'] = cat._id;
    where['region'] = region;

    if (!cat) {
      throw new NotFoundException(`Category ${category} not found.`);
    }
    const count = await this.adRepo.countDocs(where);
    const skipped = Math.floor(Math.random() * count) + 0;
    const optionalParam = { skip: skipped };
    const ad = await this.adRepo.fetchbyCatAdvertisement(where, optionalParam);
    if (!ad) {
      throw new NotFoundException(
        `Advertisement with ${category} in ${region} not found`,
      );
    }
    const wUpdate = {};
    wUpdate['_id'] = ad._id;
    wUpdate['region'] = region;
    const add = await this.adRepo.incrementView(wUpdate);
    // const copy = JSON.parse(JSON.stringify(add));

    return add;
  }

  public async addClick(
    region: string,
    niceName: string,
  ): Promise<AdvertisementDocument> {
    const date = parseInt(niceName);

    if (isNaN(date) || date < 0) {
      throw new BadRequestException('Invalid niceName');
    } else {
      const where = {};
      where['niceName'] = date.toString();
      where['region'] = region;

      const incrementedClick = await this.adRepo.incrementclick(where);
      if (!incrementedClick) {
        throw new NotFoundException();
      }

      return incrementedClick;
    }
  }

  public async getbyQuery(
    region: string,
    body: PaginationDTO,
  ): Promise<number | AdvertisementDocument[]> {
    const query = body;
    query['region'] = region;

    query.profile;
    let skipItems = 0;
    let limitItems = 20;
    let orderBy;

    if (query.order) {
      orderBy = query.order;
    }

    if (query.skip) {
      skipItems = parseInt(query.skip);
    }

    if (query.limit) {
      limitItems = parseInt(query.limit);
    }

    this.handleSort(query['sortBy'], query['orderBy']);
    // const sortedBy = this.handleSort(query['sortBy'], query['orderBy']);
    const options = {};
    options['limit'] = limitItems;
    options['skip'] = skipItems;
    // if (!common.isEmpty(sortedBy)) {
    //   options['sort'] = sortedBy;
    // }

    // common.searchAndPaginate(
    //   req,
    //   Advertisement,
    //   query,
    //   { _id: 0, __v: 0 },
    //   options,
    // );

    return 34;
  }

  public async handleSort(sortBy: string, orderBy: string): Promise<object> {
    const sortedBy = {};
    switch (sortBy) {
      case 'views':
      case 'clicks':
      case 'recent':
        sortedBy['sortBy'] = orderBy === 'ascendant' ? 1 : -1;
        break;
      case 'niceName':
        sortedBy['sortBy'] = orderBy === 'descendant' ? -1 : 1;
        break;
    }

    return sortedBy;
  }
}
