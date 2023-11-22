/* eslint-disable @typescript-eslint/naming-convention */
import {
  Body,
  Controller,
  // Delete,
  Get,
  Headers,
  //HttpCode,
  //HttpStatus,
  Param,
  Post,
  // Put,
  // Query,
} from '@nestjs/common';
// import { AUTH } from '../auth/decorator/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateGeoLocationDTO } from './dto/createDto/createGeoLocation.dto';
import { GeoLocationDocument } from './schema/geoLocation.schema';
import { GeoLocationService } from './geoLocation.service';

// import { Role } from '../auth/roles/permission.roles';
// import { UpdateGeoLocationDTO } from './dto/updateDto/updateGeoLocation.dto';

//@AUTH(Role.admin)
@Controller()
@ApiTags('Geo IP Location')
export class GeoLocationController {
  public constructor(public geoLocationServices: GeoLocationService) {}

  @Post('geoLocation')
  public async createGeoLocation(
    @Headers('region') region: string,
    @Body() body: CreateGeoLocationDTO,
  ): Promise<GeoLocationDocument> {
    return await this.geoLocationServices.createGeoLocation(region, body);
  }

  @Get('geoLocation/:network_start_ip/:network_last_ip')
  public async fetchGeoLocation(
    @Headers('region') region: string,
    @Param('network_start_ip') network_start_ip: number,
    @Param('network_last_ip') network_last_ip: number,
  ): Promise<GeoLocationDocument> {
    return await this.geoLocationServices.fetchGeoLocation(
      region,
      network_start_ip,
      network_last_ip,
    );
  }

  // @Put('geoLocation/:niceName')
  // public async updateGeoLocation(
  //   @Headers('region') region: string,
  //   @Param('niceName') niceName: string,
  //   @Body() body: UpdateGeoLocationDTO,
  // ): Promise<GeoLocationDocument> {
  //   return await this.geoLocationServices.updateGeoLocation(
  //     region,
  //     niceName,
  //     body,
  //   );
  // }

  //@HttpCode(HttpStatus.NO_CONTENT)
  // @Delete('geoLocation/:niceName')
  // public async deleteGeoLocation(
  //   @Headers('region') region: string,
  //   @Param('niceName') niceName: string,
  // ): Promise<void> {
  //   await this.geoLocationServices.deleteGeoLocation(region, niceName);
  // }

  // @Get('geoLocations')
  // public async fetchGeoLocations(
  //   @Headers('region') region: string,
  //   @Query('skip') pageNumber: number,
  //   @Query('limit') pageSize: number,
  //   @Query('search') search?: string,
  // ): Promise<object> {
  //   return await this.geoLocationServices.fetchGeoLocations(
  //     region,
  //     pageNumber,
  //     pageSize,
  //     search,
  //   );
  // }
}
