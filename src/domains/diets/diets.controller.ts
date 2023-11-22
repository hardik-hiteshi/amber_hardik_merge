import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDietDto, CreateManyDietDto, UpdateDietDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { DietDocument } from './schema/diets.schema';
import { DietsService } from './diets.service';
import { DietTo } from './schema/subSchema/dietTo.subSchema';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Diets')
export class DietsController {
  public constructor(private dietService: DietsService) {}

  @Post('diet')
  private async createDiet(
    @Body() body: CreateDietDto,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.dietService.createOne(body, region);
  }

  @Put('diet/:nicename')
  private async updateDiet(
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
    @Body() body: UpdateDietDto,
  ): Promise<object> {
    return await this.dietService.updateOne(region, niceName, body);
  }

  @Get('diet/enum')
  private async getDistinctNiceName(
    @Headers('region') region: string,
  ): Promise<string[]> {
    return this.dietService.findDistinctNiceName(region);
  }

  @Get('diet/:nicename')
  private async getdiet(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<DietDocument> {
    return await this.dietService.findOne(niceName, region);
  }

  @Get('diets')
  private async findAll(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.dietService.findAll(region, pageNumber, pageSize);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('diet/:nicename')
  private async deleteDiet(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.dietService.deleteOne(niceName, region);
  }

  @Get('diet/:nicename/tags')
  private async getTagsByNiceName(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<DietDocument['tags']> {
    return this.dietService.findTags(niceName, region);
  }

  @Get('diet/:nicename/tags/:index')
  private async getTagsByNiceNameIndex(
    @Param('nicename') niceName: string,
    @Param('index', new ParseIntPipe()) index: number,
    @Headers('region') region: string,
  ): Promise<string> {
    return this.dietService.findOneTag(niceName, index, region);
  }

  @Get('diet/:nicename/translation.to/:index')
  private async getTranslationByniceNameIndex(
    @Param('nicename') niceName: string,
    @Param('index', new ParseIntPipe()) index: number,
    @Headers('region') region: string,
  ): Promise<DietTo> {
    return this.dietService.findOneTranslation(niceName, index, region);
  }

  @Get('diet/:nicename/translation.to')
  private async getTranslationByniceName(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<DietTo[]> {
    return this.dietService.findTranslation(niceName, region);
  }

  @Post('diet/create-many')
  private async createManyDiet(
    @Body() body: CreateManyDietDto,
  ): Promise<DietDocument[]> {
    return this.dietService.createManyDiet(body);
  }

  @Delete('diet/:nicename/image')
  private async deleteImage(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.dietService.deleteImage(region, niceName);
  }
}
