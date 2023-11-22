import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ProductDocument } from './schema/product.schema';
import { ProductRepository } from './repository/product.repository';
// import { ObjectExpressionOperator } from 'mongoose';

@Injectable()
export class ProductService {
  public productNotFound = 'product not found';
  public productAlreadyExist = 'product already exist';
  public constructor(private productRepo: ProductRepository) {}

  public async createOne(body: CreateProductDto): Promise<object> {
    const product = await this.productRepo.findOneForCreate(body);
    if (product) {
      throw new BadRequestException(this.productAlreadyExist);
    }

    const newProduct = await this.productRepo.createOne(body);

    const response = {
      niceName: newProduct.niceName,
    };

    return response;
  }

  public async findOne(niceName: string): Promise<ProductDocument> {
    const product = await this.productRepo.findOne({ niceName });
    if (!product) throw new NotFoundException(this.productNotFound);

    return product;
  }

  public async findAll(pageNumber: number, pageSize: number): Promise<object> {
    const productList = await this.productRepo.findAll(pageNumber, pageSize);

    const count = await this.productRepo.countDocs({});

    return {
      status: {
        count,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        search_count: count,
      },
      result: productList,
    };
  }

  public async deleteOne(niceName: string): Promise<object> {
    const product = await this.productRepo.deleteOne(niceName);

    if (!product) throw new NotFoundException(this.productNotFound);

    return { message: 'Deleted Success' };
  }

  public async updateOne(
    niceName: string,
    body: UpdateProductDto,
  ): Promise<object> {
    const updatedProduct = this.productRepo.updateOne(niceName, body);

    if (!updatedProduct) throw new NotFoundException(this.productNotFound);

    const response = {
      niceName: (await updatedProduct).niceName,
    };

    return response;
  }
}
