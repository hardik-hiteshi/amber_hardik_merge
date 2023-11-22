import {
  AffiliateProduct,
  AffiliateProductDocument,
} from '../schema/affiliateProducts.schema';
import { Model, ObjectId } from 'mongoose';
import { AffiliateProductQueryInterface } from './affiliateProducts.query.interface';
import { CreateAffiliateProductDTO } from '../dto/createDto/createAffiliateProducts.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateAffiliateProductDTO } from '../dto/updateDto/updateAffiliateProducts.dto';

@Injectable()
export class AffiliateProductRepository {
  public constructor(
    @InjectModel(AffiliateProduct.name)
    public affiliateProductModel: Model<AffiliateProductDocument>,
  ) {}

  public async createAffiliateProduct(
    body: CreateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    const affiliateProduct = await this.affiliateProductModel.create({
      ...body,
    });

    const affiliateProductData = await this.affiliateProductModel
      .findOne({ _id: affiliateProduct._id })
      .populate('affiliateProduct', 'niceName');

    return affiliateProductData;
  }

  public async fetchOne(_id: ObjectId): Promise<AffiliateProductDocument> {
    const affiliateProduct = await this.affiliateProductModel
      .findOne({ _id })
      .populate('affiliateProduct', 'niceName');

    return affiliateProduct;
  }

  public async updateAffiliateProduct(
    _id: ObjectId,
    body: UpdateAffiliateProductDTO,
  ): Promise<AffiliateProductDocument> {
    const updatedAffiliateProduct = await this.affiliateProductModel
      .findOneAndUpdate({ _id }, body, { new: true })
      .populate('affiliateProduct', 'niceName');

    return updatedAffiliateProduct;
  }

  public async deleteAffiliateProduct(
    _id: ObjectId,
  ): Promise<AffiliateProductDocument> {
    const deletedAffiliateProduct =
      await this.affiliateProductModel.findOneAndDelete({ _id });

    return deletedAffiliateProduct;
  }

  public async fetchAffiliateProducts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AffiliateProductDocument[]> {
    const query: AffiliateProductQueryInterface = {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [{ _id: { $regex: search.toString(), $options: 'i' } }];
    }

    const affiliateProducts = await this.affiliateProductModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate('affiliateProduct', 'niceName');

    return affiliateProducts;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.affiliateProductModel.countDocuments(obj);

    return docCount;
  }

  // public async findOne(
  //   body: CreateAffiliateProductDTO,
  // ): Promise<AffiliateProductDocument> {
  //   const existingAffiliateProduct = await this.affiliateProductModel.findOne({
  //     _id: body._id,
  //   });

  //   return existingAffiliateProduct;
  // }
}
