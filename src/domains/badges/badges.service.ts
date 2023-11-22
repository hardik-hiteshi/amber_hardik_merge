import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BadgesDocument } from './schema/badges.schema';
import { BadgesRespository } from './repository/badges.repository';
import { CreateBadgesDTO } from './dto/createdto/createbadge.dto';
import { UpdateBadgesDTO } from './dto/updatedto/updatebadge.dto';

@Injectable()
export class BadgesService {
  public constructor(public badgesRepo: BadgesRespository) {}

  public async createBadge(
    region: string,
    body: CreateBadgesDTO,
  ): Promise<object> {
    const badgeExists = await this.badgesRepo.findOne(region, body.niceName);
    if (badgeExists) {
      throw new BadRequestException('Badge already exists.');
    }

    const newBadge = await this.badgesRepo.createBadge(region, body);
    const response = {
      niceName: newBadge.niceName,
    };

    return response;
  }

  public async fetchBadge(
    region: string,
    niceName: string,
  ): Promise<BadgesDocument> {
    const badge = await this.badgesRepo.fetchBadge(region, niceName);
    if (!badge) throw new NotFoundException('No badge found');

    return badge;
  }

  public async updateBadge(
    region: string,
    niceName: string,
    body: UpdateBadgesDTO,
  ): Promise<object> {
    const updatedBadge = await this.badgesRepo.updateBadge(
      region,
      niceName,
      body,
    );
    if (!updatedBadge) throw new NotFoundException('No badge found');
    const response = {
      niceName: updatedBadge.niceName,
    };

    return response;
  }

  public async deleteBadge(region: string, niceName: string): Promise<object> {
    const badge = await this.badgesRepo.deleteBadge(region, niceName);

    if (!badge) throw new NotFoundException('Badge not found.');

    return { message: 'Deleted Success' };
  }

  public async fetchBadges(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<BadgesDocument[]> {
    const badgesList = await this.badgesRepo.fetchBadges(
      region,
      pageNumber,
      pageSize,
      search,
    );

    return badgesList;

    // const count = await this.badgesRepo.countDocs({ region });

    // return {
    //   status: {
    //     count,
    //     // eslint-disable-next-line @typescript-eslint/naming-convention
    //     search_count: count,
    //   },
    //   result: badgesList,
    // };
  }

  public async fetchBadgesEnum(region: string): Promise<Array<string>> {
    const badgesList = await this.badgesRepo.fetchBadgesEnum(region);

    return badgesList;
  }
}
