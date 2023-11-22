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
import { CreateManyPictostDto, CreatePictosDto, UpdatePictosDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { PictosDocument } from './schema/pictos.schema';
import { PictosService } from './pictos.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Pictos')
export class PictosController {
  public constructor(private pictosService: PictosService) {}

  @Post('picto')
  private async createPictos(
    @Headers('region') region: string,
    @Body() body: CreatePictosDto,
  ): Promise<object> {
    return await this.pictosService.createOne(body, region);
  }

  @Post('pictos')
  private async createManyPictos(
    @Body() body: CreateManyPictostDto,
  ): Promise<PictosDocument[]> {
    return await this.pictosService.createMany(body);
  }

  @Put('picto/:nicename')
  private async updatePictos(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
    @Body() body: UpdatePictosDto,
  ): Promise<object> {
    return await this.pictosService.updateOne(niceName, body, region);
  }

  @Get('picto/enum')
  private async getDistinctNiceName(
    @Headers('region') region: string,
  ): Promise<string[]> {
    return this.pictosService.findDistinctNiceName(region);
  }

  @Get('picto/:nicename')
  private async getOne(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
  ): Promise<PictosDocument> {
    return await this.pictosService.findOne(niceName, region);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('picto/:nicename')
  private async deleteOne(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.pictosService.deleteOne(region, niceName);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('picto/:nicename/image')
  private async deleteImage(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.pictosService.deleteImage(region, niceName);
  }

  @Get('pictos')
  private async getAll(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.pictosService.findAll(region, pageNumber, pageSize);
  }
}
