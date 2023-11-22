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
import { ConversionDocument } from './schema/conversion.schema';
import { ConversionService } from './conversion.service';
import { CreateConversionDTO } from './dto/createDto/create.conversion.dto';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';
import { UpdateConversionDTO } from './dto/updateDto/update.conversion.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Shop', 'Conversions')
export class ConversionController {
  public constructor(public conversionServices: ConversionService) {}

  @Post('conversion')
  public async createConversion(
    @Body() body: CreateConversionDTO,
  ): Promise<object> {
    return await this.conversionServices.createConversion(body);
  }

  @Get('conversion/:_id')
  public async fetchConversion(
    @Param('_id') _id: ObjectId,
  ): Promise<ConversionDocument> {
    return await this.conversionServices.fetchConversion(_id);
  }

  @Put('conversion/:_id')
  public async updateConversion(
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateConversionDTO,
  ): Promise<object> {
    return await this.conversionServices.updateConversion(_id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('conversion/:_id')
  public async deleteConversion(@Param('_id') _id: ObjectId): Promise<void> {
    await this.conversionServices.deleteConversion(_id);
  }

  @Get('conversions')
  public async fetchConversions(
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.conversionServices.fetchConversions(
      pageNumber,
      pageSize,
      search,
    );
  }
}
