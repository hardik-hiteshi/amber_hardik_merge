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
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateDiscountDTO } from './dto/createDto/discount.create.dto';
import { DiscountDocument } from './schema/discount.schema';
import { DiscountService } from './discount.service';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';
import { UpdateDiscountDTO } from './dto/updateDto/discount.update.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Shop', 'Discounts')
export class DiscountController {
  public constructor(public discountServices: DiscountService) {}

  @Post('Discount')
  public async createDiscount(
    @Body() body: CreateDiscountDTO,
  ): Promise<object> {
    return await this.discountServices.createDiscount(body);
  }

  @Get('Discount/:_id')
  public async fetchDiscount(
    @Param('_id') _id: ObjectId,
  ): Promise<DiscountDocument> {
    return await this.discountServices.fetchDiscount(_id);
  }

  @Put('Discount/:_id')
  public async updateDiscount(
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateDiscountDTO,
  ): Promise<object> {
    return await this.discountServices.updateDiscount(_id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('Discount/:_id')
  public async deleteDiscount(@Param('_id') _id: ObjectId): Promise<void> {
    await this.discountServices.deleteDiscount(_id);
  }

  @Get('Discounts')
  public async fetchDiscounts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.discountServices.fetchDiscounts(
      pageNumber,
      pageSize,
      search,
    );
  }
}
