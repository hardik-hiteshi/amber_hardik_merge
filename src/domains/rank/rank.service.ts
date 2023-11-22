import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRankDTO } from './dto/createDto/createrank.dto';
import { RankDocument } from './schema/rank.schema';
import { RankRepository } from './repository/rank.repository';
import { UpdateRankDTO } from './dto/updateDto/updaterank.dto';

@Injectable()
export class RankService {
  public constructor(public rankRepo: RankRepository) {}

  public async createRank(
    region: string,
    body: CreateRankDTO,
  ): Promise<object> {
    const rankExists = await this.rankRepo.findOne(region, body);
    if (rankExists) {
      throw new BadRequestException('Rank Already exists.');
    }
    const newRank = await this.rankRepo.createRank(region, body);
    const response = {
      niceName: newRank.niceName,
    };

    return response;
  }

  public async fetchRank(
    region: string,
    niceName: string,
  ): Promise<RankDocument> {
    const rank = await this.rankRepo.fetchRank(region, niceName);
    if (!rank) {
      throw new NotFoundException('Rank not found.');
    }

    return rank;
  }

  public async updateRank(
    region: string,
    niceName: string,
    body: UpdateRankDTO,
  ): Promise<object> {
    const updatedRank = await this.rankRepo.updateRank(region, niceName, body);
    if (!updatedRank) {
      throw new NotFoundException('Rank Not found.');
    }

    const response = {
      niceName: updatedRank.niceName,
    };

    return response;
  }

  public async deleteRank(region: string, niceName: string): Promise<object> {
    const deletedRank = await this.rankRepo.deleteRank(region, niceName);
    if (!deletedRank) {
      throw new NotFoundException('Rank Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchRanks(
    region: string,
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const ranksList = await this.rankRepo.fetchRanks(
      region,
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.rankRepo.countDocs({ region });

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: ranksList,
    };
  }
}
