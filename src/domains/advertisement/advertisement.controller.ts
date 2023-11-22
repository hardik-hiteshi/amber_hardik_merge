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
import { AdvertisementDocument } from './schemas/advertisement.schema';
import { AdvertisementService } from './advertisement.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateAdvertisementDTO } from './dto/createadvertisement.dto';
import { Role } from 'src/domains/auth/roles/permission.roles';
import { UpdateAdvertisementDTO } from './dto/updateadvertisement.dto';

@AUTH(Role.admin)
@Controller()
@ApiTags('Advertisement')
export class AdvertisementController {
  public constructor(public adverstimentServices: AdvertisementService) {}

  @Get('advertisement/:niceName')
  public async fetchAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.fetchAdvertisement(region, niceName);
  }

  @Post('advertisement')
  public async createAdvertisement(
    @Headers('region') region: string,
    @Body() body: CreateAdvertisementDTO,
  ): Promise<object> {
    return await this.adverstimentServices.createAdvertisement(region, body);
  }

  @Put('advertisement/:niceName')
  public async updateAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
    @Body() body: UpdateAdvertisementDTO,
  ): Promise<object> {
    return await this.adverstimentServices.updateAdvertisement(
      region,
      niceName,
      body,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('advertisement/:niceName')
  public async deleteAdvertisement(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<void> {
    await this.adverstimentServices.deleteAdvertisement(region, niceName);
  }

  @Get('advertisements')
  public async fetchAdvertisements(
    @Headers('region') region: string,
    @Query('skip') pageNumber: number,
    @Query('limit') pageSize: number,
    @Query('search') search?: string,
  ): Promise<object> {
    return await this.adverstimentServices.fetchAdvertisements(
      region,
      pageNumber,
      pageSize,
      search,
    );
  }

  @Get('advertisement/cat/:category')
  public async fetchrandomAdvertisement(
    @Headers('region') region: string,
    @Param('category') category: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.fetchRandomAdvertisement(
      region,
      category,
    );
  }

  @Put('advertisement/click/:niceName')
  public async addClick(
    @Headers('region') region: string,
    @Param('niceName') niceName: string,
  ): Promise<AdvertisementDocument> {
    return await this.adverstimentServices.addClick(region, niceName);
  }
}
