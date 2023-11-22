// import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateDocument } from './schema/affiliate.schema';
import { AffiliateRepository } from './repository/affiliate.repository';
import { CreateAffiliateDTO } from './dto/createDto/createAffiliate.dto';
import { HashPassword } from 'src/common/config/wordPressHasher/hash';
import { UpdateAffiliateDTO } from './dto/updateDto/updateAffiliate.dto';

@Injectable()
export class AffiliateService {
  public constructor(public affiliateRepo: AffiliateRepository) {}

  public async createAffiliate(body: CreateAffiliateDTO): Promise<object> {
    const affiliateExits = await this.affiliateRepo.findOne(body);

    if (affiliateExits) {
      throw new BadRequestException(
        'Affiliate with niceName or email Already exists.',
      );
    }

    body.password = await HashPassword(body.password);
    //body.password = await bcrypt.hash(body.password, 10);
    const affiliate = await this.affiliateRepo.createAffiliate(body);
    const response = {
      niceName: affiliate.niceName,
    };

    return response;
  }

  public async fetchAffiliate(niceName: string): Promise<AffiliateDocument> {
    const affiliate = await this.affiliateRepo.fetchAffiliate(niceName);
    if (!affiliate) {
      throw new NotFoundException('Affiliate not found.');
    }

    return affiliate;
  }

  public async updateAffiliate(
    niceName: string,
    body: UpdateAffiliateDTO,
  ): Promise<object> {
    let updatedAffiliate: AffiliateDocument;
    try {
      updatedAffiliate = await this.affiliateRepo.updateAffiliate(
        niceName,
        body,
      );
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliate) {
      throw new NotFoundException('Affiliate Not found.');
    }

    const response = {
      niceName: updatedAffiliate.niceName,
    };

    return response;
  }

  public async deleteAffiliate(niceName: string): Promise<object> {
    const deletedAffiliate = await this.affiliateRepo.deleteAffiliate(niceName);
    if (!deletedAffiliate) {
      throw new NotFoundException('Affiliate Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliates(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const affiliatesList = await this.affiliateRepo.fetchAffiliates(
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.affiliateRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: affiliatesList,
    };
  }
}
