/* eslint-disable @typescript-eslint/naming-convention */
import { Affiliate, AffiliateDocument } from '../schema/affiliate.schema';
import { AffiliateQueryInterface } from './affiliate.query.interface';
import { CreateAffiliateDTO } from '../dto/createDto/createAffiliate.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAffiliateDTO } from '../dto/updateDto/updateAffiliate.dto';

@Injectable()
export class AffiliateRepository {
  public constructor(
    @InjectModel(Affiliate.name)
    public affiliateModel: Model<AffiliateDocument>,
  ) {}

  public async findOne(body: CreateAffiliateDTO): Promise<AffiliateDocument> {
    const existingAffiliate = await this.affiliateModel.findOne({
      $or: [{ niceName: body.niceName }, { email: body.email }],
    });

    return existingAffiliate;
  }

  public async createAffiliate(
    body: CreateAffiliateDTO,
  ): Promise<AffiliateDocument> {
    const affiliate = await this.affiliateModel.create({ ...body });

    return affiliate;
  }

  public async fetchAffiliate(niceName: string): Promise<AffiliateDocument> {
    const affiliate = await this.affiliateModel.findOne({
      niceName,
    });

    return affiliate;
  }

  public async updateAffiliate(
    niceName: string,
    body: UpdateAffiliateDTO,
  ): Promise<AffiliateDocument> {
    const updatedAffiliate = await this.affiliateModel.findOneAndUpdate(
      { niceName },
      body,
      { new: true },
    );

    return updatedAffiliate;
  }

  public async deleteAffiliate(niceName: string): Promise<AffiliateDocument> {
    const deletedAffiliate = await this.affiliateModel.findOneAndDelete({
      niceName,
    });

    return deletedAffiliate;
  }

  public async fetchAffiliates(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AffiliateDocument[]> {
    const query: AffiliateQueryInterface = {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { niceName: { $regex: search.toString(), $options: 'i' } },
        { password: { $regex: search.toString(), $options: 'i' } },
        { name: { $regex: search.toString(), $options: 'i' } },
        { lastName: { $regex: search.toString(), $options: 'i' } },
        { email: { $regex: search.toString(), $options: 'i' } },
        { city: { $regex: search.toString(), $options: 'i' } },
        { province: { $regex: search.toString(), $options: 'i' } },
        { fiscal_address: { $regex: search.toString(), $options: 'i' } },
        { cp: { $regex: search.toString(), $options: 'i' } },
        { phone: { $regex: search.toString(), $options: 'i' } },
        { message: { $regex: search.toString(), $options: 'i' } },
        { company_name: { $regex: search.toString(), $options: 'i' } },
        { cif: { $regex: search.toString(), $options: 'i' } },
        { instagram: { $regex: search.toString(), $options: 'i' } },
        { facebook: { $regex: search.toString(), $options: 'i' } },
        { twitter: { $regex: search.toString(), $options: 'i' } },
        { youtube: { $regex: search.toString(), $options: 'i' } },
        /* eslint-disable @typescript-eslint/naming-convention */
        { 'bank_data.send_data': { $regex: search.toString(), $options: 'i' } },
        { state: { $regex: search.toString(), $options: 'i' } },
        { conversionTax: { $regex: search.toString(), $options: 'i' } },
        { 'legalTerms.agree': { $regex: search.toString(), $options: 'i' } },
        {
          'legalTerms.dateAgreement': {
            $regex: search.toString(),
            $options: 'i',
          },
        },
        { pixel: { $regex: search.toString(), $options: 'i' } },
        { voucherCode: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const affiliates = await this.affiliateModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return affiliates;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.affiliateModel.countDocuments(obj);

    return docCount;
  }
}
