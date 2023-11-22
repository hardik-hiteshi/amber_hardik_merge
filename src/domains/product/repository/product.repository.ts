import { CreateProductDto, UpdateProductDto } from '../dtos';
import { Product, ProductDocument } from '../schema/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecursivePartial } from 'src/common/interface';

@Injectable()
export class ProductRepository {
  public constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  public async createOne(body: CreateProductDto): Promise<ProductDocument> {
    return await this.productModel.create(body);
  }

  public async findOneForCreate(
    body: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productModel.findOne({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      $or: [{ niceName: body.niceName }, { 'cms.url.slug': body.cms.url.slug }],
    });
  }

  public async findOne(
    query: RecursivePartial<Product> | object,
  ): Promise<ProductDocument> {
    return await this.productModel.findOne(query).populate('relatedProducts');
  }

  public async findAll(
    pageNumber: number,
    pageSize: number,
  ): Promise<ProductDocument[]> {
    const skipAmount = pageNumber * pageSize;

    return await this.productModel
      .find()
      .populate('relatedProducts')
      .skip(skipAmount)
      .limit(pageSize);
    //will add field below when ProductCategory available
    // .populate('category');
  }

  public async updateOne(
    niceName: string,
    body: UpdateProductDto,
  ): Promise<ProductDocument> {
    return await this.productModel.findOneAndUpdate({ niceName }, body, {
      new: true,
    });
  }

  public async deleteOne(niceName: string): Promise<ProductDocument> {
    return await this.productModel.findOneAndDelete({ niceName });
  }

  public async countDocs(obj: object): Promise<number> {
    const docCount = await this.productModel.countDocuments(obj);

    return docCount;
  }
}
