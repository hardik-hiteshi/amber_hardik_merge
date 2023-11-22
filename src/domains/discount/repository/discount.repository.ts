import { Discount, DiscountDocument } from '../schema/discount.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateDiscountDTO } from '../dto/createDto/discount.create.dto';
import { DiscountQueryInterface } from './discount.query.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDiscountDTO } from '../dto/updateDto/discount.update.dto';

@Injectable()
export class DiscountRepository {
  public constructor(
    @InjectModel(Discount.name)
    public discountModel: Model<DiscountDocument>,
  ) {}

  public async createDiscount(
    body: CreateDiscountDTO,
  ): Promise<DiscountDocument> {
    const discount = await this.discountModel.create({
      ...body,
    });

    return discount;
  }

  public async fetchDiscount(_id: ObjectId): Promise<DiscountDocument> {
    const discount = await this.discountModel.findOne({ _id });

    return discount;
  }

  public async updateDiscount(
    _id: ObjectId,
    body: UpdateDiscountDTO,
  ): Promise<DiscountDocument> {
    const updatedDiscount = await this.discountModel.findOneAndUpdate(
      { _id },
      body,
      { new: true },
    );

    return updatedDiscount;
  }

  public async deleteDiscount(_id: ObjectId): Promise<DiscountDocument> {
    const deletedDiscount = await this.discountModel.findOneAndDelete({
      _id,
    });

    return deletedDiscount;
  }

  public async fetchDiscounts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<DiscountDocument[]> {
    const query: DiscountQueryInterface = {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { type: { $regex: search.toString(), $options: 'i' } },
        { codes: { $regex: search.toString(), $options: 'i' } },
        { message: { $regex: search.toString(), $options: 'i' } },
        { detail: { $regex: search.toString(), $options: 'i' } },
        { desc: { $regex: search.toString(), $options: 'i' } },
        { creator: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const discounts = await this.discountModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return discounts;
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.discountModel.countDocuments(obj);

    return docCount;
  }
}
