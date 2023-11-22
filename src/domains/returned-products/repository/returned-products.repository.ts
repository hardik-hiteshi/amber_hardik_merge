/* eslint-disable @typescript-eslint/naming-convention */
import { Model, ObjectId } from 'mongoose';
import {
  ReturnedProducts,
  ReturnedProductsDocument,
} from '../schema/returned-products.schema';
import { CreateReturnedProductsDTO } from '../dto/createDto/returned-products.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecursivePartial } from 'src/common/interface';
import { ReturnedProductsQueryInterface } from './returned-products.query.interface';
import { UpdateReturnedProductsDTO } from '../dto/updateDto/returned-products.update.dto';

@Injectable()
export class ReturnedProductsRepository {
  public constructor(
    @InjectModel(ReturnedProducts.name)
    public returnedProductsModel: Model<ReturnedProductsDocument>,
  ) {}

  public async createReturnedProduct(
    body: CreateReturnedProductsDTO,
  ): Promise<ReturnedProductsDocument> {
    const returnedProducts = await this.returnedProductsModel.create({
      ...body,
    });

    return returnedProducts;
  }

  public async fetchReturnedProduct(
    _id: ObjectId,
  ): Promise<ReturnedProductsDocument> {
    const returnedProducts = await this.returnedProductsModel.findOne({
      _id,
    });

    return returnedProducts;
  }

  public async updateReturnedProduct(
    _id: ObjectId,
    body: UpdateReturnedProductsDTO,
  ): Promise<ReturnedProductsDocument> {
    const updatedReturnedProducts =
      await this.returnedProductsModel.findOneAndUpdate({ _id }, body, {
        new: true,
      });

    return updatedReturnedProducts;
  }

  public async deleteReturnedProduct(
    _id: ObjectId,
  ): Promise<ReturnedProductsDocument> {
    const deletedReturnedProducts =
      await this.returnedProductsModel.findOneAndDelete({ _id });

    return deletedReturnedProducts;
  }

  public async fetchReturnedProducts(
    pageNumber: number,
    pageSize: number,
    search?: string,
  ): Promise<ReturnedProductsDocument[]> {
    const query: ReturnedProductsQueryInterface = {};
    const skipAmount = pageNumber * pageSize;
    if (search) {
      query.$or = [
        { id: { $regex: search.toString(), $options: 'i' } },
        { state: { $regex: search.toString(), $options: 'i' } },
        { 'customerValue.email': { $regex: search.toString(), $options: 'i' } },
        { 'customerValue.name': { $regex: search.toString(), $options: 'i' } },
        {
          'customerValue.lastName': {
            $regex: search.toString(),
            $options: 'i',
          },
        },
        { date: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const returnedProducts = await this.returnedProductsModel
      .find({
        $and: [query],
      })
      .skip(skipAmount)
      .limit(pageSize);

    return returnedProducts;
  }

  public async findAll(
    query: RecursivePartial<ReturnedProducts> | object,
  ): Promise<ReturnedProductsDocument[]> {
    return await this.returnedProductsModel.find(query).lean();
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.returnedProductsModel.countDocuments(obj);

    return docCount;
  }
}
