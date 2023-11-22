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
import { AffiliateProductDocument } from './schema/affiliateProducts.schema';
import { AffiliateProductService } from './affiliateProducts.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAffiliateProductDTO } from './dto/createDto/createAffiliateProducts.dto';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';
import { UpdateAffiliateProductDTO } from './dto/updateDto/updateAffiliateProducts.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Affiliates', 'Shop')
export class AffiliateProductController {
  public constructor(
    public affiliateProductServices: AffiliateProductService,
  ) {}

  @Post('affiliateproduct')
  public async createAffiliateProduct(
    @Body() body: CreateAffiliateProductDTO,
  ): Promise<object> {
    return await this.affiliateProductServices.createAffiliateProduct(body);
  }

  @Get('affiliateproduct/:_id')
  public async fetchAffiliateProduct(
    @Param('_id') _id: ObjectId,
  ): Promise<AffiliateProductDocument> {
    return await this.affiliateProductServices.fetchAffiliateProduct(_id);
  }

  @Put('affiliateproduct/:_id')
  public async updateAffiliateProduct(
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateAffiliateProductDTO,
  ): Promise<object> {
    return await this.affiliateProductServices.updateAffiliateProduct(
      _id,
      body,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('affiliateproduct/:_id')
  public async deleteAffiliateProduct(
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.affiliateProductServices.deleteAffiliateProduct(_id);
  }

  @Get('affiliateproducts')
  public async fetchAffiliateProducts(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.affiliateProductServices.fetchAffiliateProducts(
      pageNumber,
      pageSize,
      search,
    );
  }
}
