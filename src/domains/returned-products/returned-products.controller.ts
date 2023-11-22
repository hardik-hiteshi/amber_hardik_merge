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
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateReturnedProductsDTO } from './dto/createDto/returned-products.create.dto';
import { ObjectId } from 'mongoose';
import { Response } from 'express';
import { ReturnedProductsDocument } from './schema/returned-products.schema';
import { ReturnedProductsService } from './returned-products.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateReturnedProductsDTO } from './dto/updateDto/returned-products.update.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Shop', 'Returned Products')
export class ReturnedProductsController {
  public constructor(
    public returnedProductsServices: ReturnedProductsService,
  ) {}

  @Post('ReturnedProduct')
  public async createReturnedProducts(
    @Body() body: CreateReturnedProductsDTO,
  ): Promise<object> {
    return await this.returnedProductsServices.createReturnedProduct(body);
  }

  @Get('ReturnedProduct/:_id')
  public async fetchReturnedProduct(
    @Param('_id') _id: ObjectId,
  ): Promise<ReturnedProductsDocument> {
    return await this.returnedProductsServices.fetchReturnedProduct(_id);
  }

  @Put('ReturnedProduct/:_id')
  public async updateReturnedProducts(
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateReturnedProductsDTO,
  ): Promise<object> {
    return await this.returnedProductsServices.updateReturnedProduct(_id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('ReturnedProduct/:_id')
  public async deleteReturnedProducts(
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.returnedProductsServices.deleteReturnedProduct(_id);
  }

  @Get('ReturnedProducts')
  public async fetchReturnedProducts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.returnedProductsServices.fetchReturnedProducts(
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('ReturnedProducts/export/:type')
  private async exportReturnedProducts(
    @Param('type') type: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.returnedProductsServices.exportFile(type);

    res.set({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': `application/${file.type}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Disposition': `attachment; filename=ReturnedProducts.${file.type}`,
    });

    return new StreamableFile(file.data);
  }
}
