/* eslint-disable @typescript-eslint/naming-convention */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateConfigDocument } from './schema/affiliateConfig.schema';
import { AffiliateConfigRepository } from './repository/affiliateConfig.repository';
import { CreateAffiliateConfigDTO } from './dto/createDto/createAffiliateConfig.dto';
import { UpdateAffiliateConfigDTO } from './dto/updateDto/updateAffiliateConfig.dto';

@Injectable()
export class AffiliateConfigService {
  public constructor(public affiliateConfigRepo: AffiliateConfigRepository) {}

  public async createAffiliateConfig(
    body: CreateAffiliateConfigDTO,
  ): Promise<object> {
    const affiliateConfig = await this.affiliateConfigRepo.findOne(body);

    if (!affiliateConfig) {
      if (body.cookie_name) {
        body.cookie_name = body.cookie_name
          .toUpperCase()
          .replace(/\s/g, '')
          .trim();
      }
      const affiliateConfig =
        await this.affiliateConfigRepo.createAffiliateConfig(body);

      const response = {
        cookie_name: affiliateConfig.cookie_name,
      };

      return response;
    }

    throw new BadRequestException(
      'AffiliateConfig with cookie_name Already exists.',
    );
  }

  public async fetchAffiliateConfig(
    cookie_name: string,
  ): Promise<AffiliateConfigDocument> {
    const affiliateConfig = await this.affiliateConfigRepo.fetchOne(
      cookie_name,
    );
    if (!affiliateConfig) {
      throw new NotFoundException('Affiliate-Config not found.');
    }

    return affiliateConfig;
  }

  public async updateAffiliateConfig(
    cookie_name: string,
    body: UpdateAffiliateConfigDTO,
  ): Promise<object> {
    let updatedAffiliateConfig: AffiliateConfigDocument;
    try {
      updatedAffiliateConfig =
        await this.affiliateConfigRepo.updateAffiliateConfig(cookie_name, body);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliateConfig) {
      throw new NotFoundException('Affiliate-Config Not found.');
    }

    const response = {
      cookie_name: updatedAffiliateConfig.cookie_name,
    };

    return response;
  }

  public async deleteAffiliateConfig(cookie_name: string): Promise<object> {
    const deletedAffiliateConfig =
      await this.affiliateConfigRepo.deleteAffiliateConfig(cookie_name);

    if (!deletedAffiliateConfig) {
      throw new NotFoundException('Affiliate-Config Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliateConfigs(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const affiliateConfigsList =
      await this.affiliateConfigRepo.fetchAffiliateConfigs(
        pageNumber,
        pageSize,
        search,
      );

    const count = await this.affiliateConfigRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: affiliateConfigsList,
    };
  }
}
