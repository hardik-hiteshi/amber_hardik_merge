import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDTO } from './dto/createDto/discount.create.dto';
import { DiscountDocument } from './schema/discount.schema';
import { DiscountRepository } from './repository/discount.repository';
import { ObjectId } from 'mongoose';
import { UpdateDiscountDTO } from './dto/updateDto/discount.update.dto';

@Injectable()
export class DiscountService {
  public constructor(public discountRepo: DiscountRepository) {}

  public async createDiscount(body: CreateDiscountDTO): Promise<object> {
    const newDiscount = await this.discountRepo.createDiscount(body);
    const response = {
      _id: newDiscount._id,
    };

    return response;
  }

  public async fetchDiscount(_id: ObjectId): Promise<DiscountDocument> {
    const discount = await this.discountRepo.fetchDiscount(_id);
    if (!discount) {
      throw new NotFoundException('Discount not found.');
    }

    return discount;
  }

  public async updateDiscount(
    _id: ObjectId,
    body: UpdateDiscountDTO,
  ): Promise<object> {
    const updatedDiscount = await this.discountRepo.updateDiscount(_id, body);
    if (!updatedDiscount) {
      throw new NotFoundException('Discount Not found.');
    }

    const response = {
      _id: updatedDiscount._id,
    };

    return response;
  }

  public async deleteDiscount(_id: ObjectId): Promise<object> {
    const deletedDiscount = await this.discountRepo.deleteDiscount(_id);
    if (!deletedDiscount) {
      throw new NotFoundException('Discount Not found.');
    }

    return { message: 'Delete Sucess' };
  }

  public async fetchDiscounts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<object> {
    const discountList = await this.discountRepo.fetchDiscounts(
      pageNumber,
      pageSize,
      search,
    );

    const count = await this.discountRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: discountList,
    };
  }
}
