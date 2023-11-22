import { Contact, ContactDocument } from '../schema/contact.schema';
import { CreateContactDto, UpdateContactDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContactRepository {
  public constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  public async findOne(
    niceName: string,
    region: string,
  ): Promise<ContactDocument> {
    return await this.contactModel.findOne({
      niceName,
      region,
    });
  }

  public async findAll(
    region: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ContactDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.contactModel
      .find({ region })
      .skip(skipAmount)
      .limit(pageSize);
  }

  public async createOne(
    region: string,
    body: CreateContactDto,
  ): Promise<ContactDocument> {
    return await this.contactModel.create({ ...body, region });
  }

  public async updateOne(
    niceName: string,
    region: string,
    body: UpdateContactDto,
  ): Promise<ContactDocument> {
    return await this.contactModel.findOneAndUpdate(
      { region, niceName },
      body,
      { new: true },
    );
  }

  public async deleteOne(
    niceName: string,
    region: string,
  ): Promise<ContactDocument> {
    return await this.contactModel.findOneAndDelete({ niceName, region });
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.contactModel.countDocuments(obj);

    return docCount;
  }
}
