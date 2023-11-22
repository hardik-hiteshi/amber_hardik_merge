import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AffiliateProductDocument } from './schema/affiliateProducts.schema';
import { AffiliateProductRepository } from './repository/affiliateProducts.repository';
import { CreateAffiliateProductDTO } from './dto/createDto/createAffiliateProducts.dto';
import { ObjectId } from 'mongoose';
import { UpdateAffiliateProductDTO } from './dto/updateDto/updateAffiliateProducts.dto';

@Injectable()
export class AffiliateProductService {
  public constructor(
    public affiliateProductsRepo: AffiliateProductRepository,
  ) {}

  public async createAffiliateProduct(
    body: CreateAffiliateProductDTO,
  ): Promise<object> {
    const newAffiliateProducts =
      await this.affiliateProductsRepo.createAffiliateProduct(body);

    const response = {
      _id: newAffiliateProducts._id,
    };

    return response;
  }

  public async fetchAffiliateProduct(
    _id: ObjectId,
  ): Promise<AffiliateProductDocument> {
    const affiliateProducts = await this.affiliateProductsRepo.fetchOne(_id);
    if (!affiliateProducts) {
      throw new NotFoundException('Affiliate-product not found.');
    }

    return affiliateProducts;
  }

  public async updateAffiliateProduct(
    _id: ObjectId,
    body: UpdateAffiliateProductDTO,
  ): Promise<object> {
    let updatedAffiliateProduct: AffiliateProductDocument;
    try {
      updatedAffiliateProduct =
        await this.affiliateProductsRepo.updateAffiliateProduct(_id, body);
    } catch (e) {
      if (e.code === 11000 || e.code === 11001) {
        throw new BadRequestException(e.message);
      } else {
        throw e;
      }
    }
    if (!updatedAffiliateProduct) {
      throw new NotFoundException('Affiliate-product Not found.');
    }
    const response = {
      _id: updatedAffiliateProduct._id,
    };

    return response;
  }

  public async deleteAffiliateProduct(_id: ObjectId): Promise<object> {
    const deletedAffiliateProduct =
      await this.affiliateProductsRepo.deleteAffiliateProduct(_id);

    if (!deletedAffiliateProduct) {
      throw new NotFoundException('Affiliate-product Not found.');
    }

    return { message: 'Deleted Success' };
  }

  public async fetchAffiliateProducts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const affiliateProductsList =
      await this.affiliateProductsRepo.fetchAffiliateProducts(
        pageNumber,
        pageSize,
        search,
      );

    const count = await this.affiliateProductsRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: affiliateProductsList,
    };
  }
}
