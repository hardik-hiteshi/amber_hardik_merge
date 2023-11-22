import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTipDto, UpdateTipDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { ObjectId } from 'mongoose';
import { Role } from '../auth/roles/permission.roles';
import { TipDocument } from './schema/tip.schema';
import { TipService } from './tip.service';

@AUTH(Role.admin)
@Controller()
@ApiTags('Tips')
export class TipController {
  public constructor(private tipService: TipService) {}

  @Get('tip/random')
  public async getRandomTip(
    @Headers('region') region: string,
  ): Promise<TipDocument> {
    return await this.tipService.findRandomTip(region);
  }

  @Get('tip/:_id')
  public async getTip(
    @Param('_id') _id: ObjectId,
    @Headers('region') region: string,
  ): Promise<TipDocument> {
    return await this.tipService.findOne(_id, region);
  }

  @Post('tip')
  public async createTip(
    @Headers('region') region: string,
    @Body() body: CreateTipDto,
  ): Promise<object> {
    return await this.tipService.createOne(body, region);
  }

  @Put('tip/:_id')
  public async updateTip(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
    @Body() body: UpdateTipDto,
  ): Promise<object> {
    return this.tipService.updateOne(region, _id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('tip/:_id')
  public async deleteTip(
    @Headers('region') region: string,
    @Param('_id') _id: ObjectId,
  ): Promise<void> {
    await this.tipService.deleteOne(region, _id);
  }

  @Get('tips')
  public async getAllTip(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.tipService.findAll(region, pageNumber, pageSize, search);
  }
}
