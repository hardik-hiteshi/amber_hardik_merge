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
import {
  CreateFoodGroupDto,
  CreateManyFoodGroupDto,
  UpdateFoodGroupDto,
} from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { FoodGroupDocument } from './schema/food-group.schema';
import { FoodGroupService } from './food-group.service';
import { Role } from '../auth/roles/permission.roles';

@AUTH(Role.admin)
@Controller()
@ApiTags('Food Groups')
export class FoodGroupController {
  public constructor(private foodGroupService: FoodGroupService) {}

  @Post('foodgroup')
  private async createFoodGroup(
    @Body() body: CreateFoodGroupDto,
    @Headers('region') region: string,
  ): Promise<object> {
    return await this.foodGroupService.createOne(body, region);
  }

  @Put('foodgroup/:nicename')
  private async updateFoodService(
    @Body() body: UpdateFoodGroupDto,
    @Headers('region') region: string,
    @Param('nicename') niceName: string,
  ): Promise<object> {
    return await this.foodGroupService.updateOne(body, region, niceName);
  }

  @Get('foodgroup/enum')
  private async getDistinctNiceName(
    @Headers('region') region: string,
  ): Promise<string[]> {
    return this.foodGroupService.findDistinctNiceName(region);
  }

  @Get('foodgroup/:nicename')
  private async getFoodGroup(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<FoodGroupDocument> {
    return await this.foodGroupService.findOne(niceName, region);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('foodgroup/:nicename')
  private async deleteFoodGroup(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    await this.foodGroupService.deleteOne(niceName, region);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('foodgroup/:nicename/image')
  private async deleteImage(
    @Param('nicename') niceName: string,
    @Headers('region') region: string,
  ): Promise<void> {
    return await this.foodGroupService.deleteImage(region, niceName);
  }

  @Get('foodgroups')
  private async getAllFoodGroup(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.foodGroupService.findAll(region, pageNumber, pageSize);
  }

  @Post('foodgroups')
  private async createManyFoodGroup(
    @Body() body: CreateManyFoodGroupDto,
  ): Promise<FoodGroupDocument[]> {
    return await this.foodGroupService.createMany(body);
  }
}
