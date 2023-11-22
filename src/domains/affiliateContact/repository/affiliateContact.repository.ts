/* eslint-disable @typescript-eslint/naming-convention */
import {
  AffiliateContact,
  AffiliateContactDocument,
} from '../schema/affiliateContact.schema';
import { Model, ObjectId } from 'mongoose';
import { AffiliateContactQueryInterface } from './affiliateContact.query.interface';
import { CreateAffiliateContactDTO } from '../dto/createDto/createAffiliateContact.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateAffiliateContactDTO } from '../dto/updateDto/updateAffiliateContact.dto';

@Injectable()
export class AffiliateContactRepository {
  public constructor(
    @InjectModel(AffiliateContact.name)
    public affiliateContactModel: Model<AffiliateContactDocument>,
  ) {}

  public async createAffiliateContact(
    body: CreateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    const affiliateContact = await this.affiliateContactModel.create({
      ...body,
    });

    return affiliateContact;
  }

  public async fetchOne(_id: ObjectId): Promise<AffiliateContactDocument> {
    const affiliateContact = await this.affiliateContactModel.findOne({
      _id,
    });

    return affiliateContact;
  }

  public async updateAffiliateContact(
    _id: ObjectId,
    body: UpdateAffiliateContactDTO,
  ): Promise<AffiliateContactDocument> {
    const updatedAffiliateContact =
      await this.affiliateContactModel.findOneAndUpdate({ _id }, body, {
        new: true,
      });

    return updatedAffiliateContact;
  }

  public async deleteAffiliateContact(
    _id: ObjectId,
  ): Promise<AffiliateContactDocument> {
    const deletedAffiliateContact =
      await this.affiliateContactModel.findOneAndDelete({ _id });

    return deletedAffiliateContact;
  }

  public async fetchAffiliateContacts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<AffiliateContactDocument[]> {
    const query: AffiliateContactQueryInterface = {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { email: { $regex: search.toString(), $options: 'i' } },
        { topic: { $regex: search.toString(), $options: 'i' } },
        { name: { $regex: search.toString(), $options: 'i' } },
        { last_name: { $regex: search.toString(), $options: 'i' } },
        { city: { $regex: search.toString(), $options: 'i' } },
        { province: { $regex: search.toString(), $options: 'i' } },
        { fiscal_address: { $regex: search.toString(), $options: 'i' } },
        { cp: { $regex: search.toString(), $options: 'i' } },
        { webSite: { $regex: search.toString(), $options: 'i' } },
        { phone: { $regex: search.toString(), $options: 'i' } },
        { message: { $regex: search.toString(), $options: 'i' } },
        { company_name: { $regex: search.toString(), $options: 'i' } },
        { cif: { $regex: search.toString(), $options: 'i' } },
        { instagram: { $regex: search.toString(), $options: 'i' } },
        { facebook: { $regex: search.toString(), $options: 'i' } },
        { twitter: { $regex: search.toString(), $options: 'i' } },
        { youtube: { $regex: search.toString(), $options: 'i' } },
        { status: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const affiliateContacts = await this.affiliateContactModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return affiliateContacts;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.affiliateContactModel.countDocuments(obj);

    return docCount;
  }

  // public async findOne(
  //   body: CreateAffiliateContactDTO,
  // ): Promise<AffiliateContactDocument> {
  //   const existingAffiliateContact = await this.affiliateContactModel.findOne({
  //     _id: body._id,
  //   });

  //   return existingAffiliateContact;
  // }
}
