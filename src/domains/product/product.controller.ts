import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ProductDocument } from './schema/product.schema';
import { ProductService } from './product.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Shop', 'Products')
export class ProductController {
  public constructor(private productService: ProductService) {}

  @Post('Product')
  private async createProduct(@Body() body: CreateProductDto): Promise<object> {
    return await this.productService.createOne(body);
  }

  @Get('Product/:niceName')
  private async getProduct(
    @Param('niceName') niceName: string,
  ): Promise<ProductDocument> {
    return await this.productService.findOne(niceName);
  }

  @Put('Product/:niceName')
  private async updateProduct(
    @Param('niceName') niceName: string,
    @Body() body: UpdateProductDto,
  ): Promise<object> {
    return await this.productService.updateOne(niceName, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('Product/:niceName')
  private async deleteProduct(
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.productService.deleteOne(niceName);
  }

  @Get('Products')
  private async getAllProducts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.productService.findAll(pageNumber, pageSize);
  }
}
