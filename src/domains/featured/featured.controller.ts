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
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateFeatureDTO } from './dto/createfeatured.dto';
import { FeaturedDocument } from './schema/featured.schema';
import { FeaturedService } from './featured.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateFeatureDTO } from './dto/updatefeatured.dto';
@AUTH(Role.admin)
@Controller('featured')
@ApiTags('Featured')
export class FeaturedController {
  public constructor(public featuredServices: FeaturedService) {}

  @Post('create')
  public async create(
    @Headers('region') region: string,
    @Body() body: CreateFeatureDTO,
  ): Promise<object> {
    return await this.featuredServices.create(region, body);
  }

  @Get()
  public async fetchFeatured(
    @Headers('region') region: string,
    @Query('type') type: string,
    @Query('search') search?: string,
  ): Promise<FeaturedDocument> {
    return await this.featuredServices.fetchFeatured(region, type, search);
  }

  @Put()
  public async upsertFeatured(
    @Headers('region') region: string,
    @Body() body: UpdateFeatureDTO,
  ): Promise<object> {
    return await this.featuredServices.updateFeatured(region, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':type')
  public async deleteFeatured(
    @Headers('region') region: string,
    @Param('type') type: string,
  ): Promise<void> {
    await this.featuredServices.deleteFeatured(type, region);
  }

  @Get('_featured')
  private async fetchFactories(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
  ): Promise<object> {
    return await this.featuredServices.fetchAll(region, pageNumber, pageSize);
  }
}
