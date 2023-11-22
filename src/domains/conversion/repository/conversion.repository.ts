import { Conversion, ConversionDocument } from '../schema/conversion.schema';
import { Model, ObjectId } from 'mongoose';
import { ConversionQueryInterface } from './conversion.query.interface';
import { CreateConversionDTO } from '../dto/createDto/create.conversion.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateConversionDTO } from '../dto/updateDto/update.conversion.dto';

@Injectable()
export class ConversionRepository {
  public constructor(
    @InjectModel(Conversion.name)
    public conversionModel: Model<ConversionDocument>,
  ) {}

  public async createConversion(
    body: CreateConversionDTO,
  ): Promise<ConversionDocument> {
    const conversion = await this.conversionModel.create({
      ...body,
    });

    return conversion;
  }

  public async fetchOne(_id: ObjectId): Promise<ConversionDocument> {
    const conversion = await this.conversionModel.findOne({ _id });
    //.populate('conversion', 'niceName');

    return conversion;
  }

  public async updateConversion(
    _id: ObjectId,
    body: UpdateConversionDTO,
  ): Promise<ConversionDocument> {
    const updatedConversion = await this.conversionModel.findOneAndUpdate(
      { _id },
      body,
      { new: true },
    );
    //.populate('conversion', 'niceName');

    return updatedConversion;
  }

  public async deleteConversion(_id: ObjectId): Promise<ConversionDocument> {
    const deletedConversion = await this.conversionModel.findOneAndDelete({
      _id,
    });

    return deletedConversion;
  }

  public async fetchConversions(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<ConversionDocument[]> {
    const query: ConversionQueryInterface = {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [{ _id: { $regex: search.toString(), $options: 'i' } }];
    }

    const conversions = await this.conversionModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);
    //.populate('conversion', 'niceName');

    return conversions;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.conversionModel.countDocuments(obj);

    return docCount;
  }

  // public async findOne(
  //   body: CreateConversionDTO,
  // ): Promise<ConversionDocument> {
  //   const existingConversion = await this.conversionModel.findOne({
  //     _id: body._id,
  //   });

  //   return existingConversion;
  // }
}
